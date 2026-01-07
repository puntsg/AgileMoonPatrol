import { Rover } from "../entities/Rover.js";
import { CheckpointManager } from "../managers/CheckpointManager.js";
import { ENEMY, LEVEL, SCORE, EXPLOSION, ROVER } from "../core/constants.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { RockSpawner } from "../spawners/RockSpawner.js";
import { config } from "../main.js";
import { EVENTS } from '../core/events.js';
import { HoleSpawner } from "../spawners/HoleSpawner.js";
import { ExplosionSpawner } from "../spawners/ExplosionSpawner.js";

export class MainGame extends Phaser.Scene {
    constructor() {
        super({ key: "MainGame" });
    }

    create() {
        this.createInputs();
        this.createPools();

        this.setScene();
        this.createAnimations();
        this.setCollisions();

        this.lifes = 3;
        this.timeCount = 0;
        this.score = 0;
        this.maxScore = parseInt(localStorage.getItem('maxScore')) || 0;
        this.game.events.on(EVENTS.ON_LAST_CHECKPOINT_REACHED, this.onCompleteGame, this);
    }

    createInputs() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    createAnimations() {
        ENEMY.SPRITES.forEach((obj) => {
            if (!this.anims.exists(`${obj.name}_anim`)) {
                this.anims.create({
                    key: `${obj.name}_anim`,
                    frames: this.anims.generateFrameNumbers(obj.name, { start: 0, end: obj.frames - 1 }),
                    frameRate: 6,
                    repeat: -1
                });
            }
        });

        this.anims.create({
            key: "enemy_bullet_horizontal",
            frames: this.anims.generateFrameNumbers('enemy_bullet', { start: 0, end: 0 })
        });

        this.anims.create({
            key: "enemy_bullet_diagonal",
            frames: this.anims.generateFrameNumbers('enemy_bullet', { start: 1, end: 1 })
        });

        this.anims.create({
            key: "enemy_bullet_vertical",
            frames: this.anims.generateFrameNumbers('enemy_bullet', { start: 2, end: 2 })
        });

        if (!this.anims.exists(EXPLOSION.ANIM)) {
            this.anims.create({
                key: EXPLOSION.ANIM,
                frames: this.anims.generateFrameNumbers(EXPLOSION.SPRITE.name, { start: 0, end: 4 }),
                frameRate: 15,
                repeat: 0,
                hideOnComplete: true
            });
        }
    }

    updateScore(scoreToAdd) {
        this.score += scoreToAdd;
        this.game.events.emit(EVENTS.ADD_SCORE, this.value ?? this.score);
        if (this.score > this.maxScore) {
            this.maxScore = this.score;
            localStorage.setItem('maxScore', this.maxScore);
            this.game.events.emit(EVENTS.SET_MAXSCORE, this.value ?? this.maxScore);
        }
    }

    setCollisions() {
        this.physics.add.collider(this.rover, this.platformGroup);
        this.physics.add.collider(this.rocksGroup, this.platformGroup);

        this.physics.add.overlap(this.enemiesGroup, this.bulletGroup, (_enemy, _bullet) => {
            this.explosionSpawner.spawn(_enemy.body.center.x, _enemy.body.center.y);

            _enemy.disableBody(true, true);
            _bullet.disableBody(true, true);
            this.updateScore(SCORE.ENEMY_KILL);
            this.killSound.play();
        });

        this.physics.add.collider(this.rover, this.enemiesGroup, () => {
            this.QuitLifes();
        });

        this.physics.add.overlap(this.rocksGroup, this.bulletGroup, (_rock, _bullet) => {
            _bullet.disableBody(true, true);
            _rock.damage();
        });

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            this.QuitLifes();
        });

        this.physics.add.collider(this.rover, this.holesGroup, () => {
            this.QuitLifes();
        });

        this.physics.add.collider(this.holesGroup, this.holesGroup, (_hole1, _hole2) => {
            _hole2.disableBody(true, true);
        });

        this.physics.add.overlap(this.platformGroup, this.enemyBulletGroup, (_plat, _bullet) => {
            this.explosionSpawner.spawn(_bullet.body.center.x, _bullet.body.center.y);
            this.killSound.play();
            _bullet.disableBody(true, true);
            if (_bullet.destroyGround) {
                this.holeSpawner.spawnAt(_bullet.x, LEVEL.HOLE.SPAWN.POS_Y);
            }
        });

        this.physics.add.overlap(this.rover, this.enemyBulletGroup, () => {
            this.QuitLifes();
        });

        this.physics.add.overlap(this.bulletGroup, this.enemyBulletGroup, (_bullet, _eBullet) => {
            this.explosionSpawner.spawn(_bullet.body.center.x, _bullet.body.center.y);
            _bullet.disableBody(true, true);
            _eBullet.disableBody(true, true);
        });
        this.physics.add.overlap(this.rocksGroup, this.enemyBulletGroup, (_rock, _eBullet) => {
            this.explosionSpawner.spawn(_eBullet.body.center.x, _eBullet.body.center.y);
            _eBullet.disableBody(true, true);
            _rock.disableBody(true, true);
        });
        this.physics.add.overlap(this.holesGroup, this.rocksGroup, (_hole, _rock) => {
            _rock.disableBody(true, true);
        });
    }

    QuitLifes() {
        this.lifes--;
        this.game.events.emit(EVENTS.UPDATE_LIFES, this.value ?? this.lifes);
        this.killSound.play();
        if (this.lifes > 0) {
            this.clearScene();
        } else {
            this.music.stop();
            this.scene.stop('hud');
            this.scene.start('GameOver', { score: this.score });
        }
    }

    clearScene() {
        this.rocksGroup.clear(true, true);
        this.enemiesGroup.clear(true, true);
        this.holesGroup.clear(true, true);
        this.bulletGroup.clear(true, true);
        this.enemyBulletGroup.clear(true, true);
        this.rover.setPosition(config.width / 2, 325);
    }

    setScene() {
        this.scene.launch('hud');
        this.bg = this.add.tileSprite(
            LEVEL.BACKGROUND.POSITION.X, LEVEL.BACKGROUND.POSITION.Y, 
            LEVEL.BACKGROUND.SIZE.X, LEVEL.BACKGROUND.SIZE.Y, 
            'bg').setOrigin(0).setScale(LEVEL.BACKGROUND.SCALE);
        this.fg = this.add.tileSprite(
            LEVEL.FOREGROUND.POSITION.X, LEVEL.FOREGROUND.POSITION.Y, 
            LEVEL.FOREGROUND.SIZE.X, LEVEL.FOREGROUND.SIZE.Y, 
            'fg').setOrigin(0).setScale(LEVEL.FOREGROUND.SCALE);

        this.plat = this.physics.add.staticImage(
            LEVEL.GROUND.POSITION.X, LEVEL.GROUND.POSITION.Y, 'ground'
        ).setScale(LEVEL.GROUND.SCALE).refreshBody();
        this.platformGroup.add(this.plat);
        this.rover = new Rover(
            this, ROVER.START_POSITION.X, ROVER.START_POSITION.Y, 'rover'
        ).setScale(ROVER.SCALE);

        this.checkpointManager = new CheckpointManager(this, 0, 0);

        this.enemySpawner = new EnemySpawner(this, 0, 0);
        this.holeSpawner = new HoleSpawner(this, 0, 0);
        this.rockSpawner = new RockSpawner(this, 0, 0);

        this.explosionSpawner = new ExplosionSpawner(this);

        this.killSound = this.sound.add('kill');
        if (!this.music) {
            this.music = this.sound.add('music');
            this.music.loop = true;
        }
        this.music.play();
    }

    createPools() {
        this.platformGroup = this.physics.add.staticGroup();
        this.rocksGroup = this.add.group();
        this.holesGroup = this.add.group();
        this.enemiesGroup = this.add.group();
        this.bulletGroup = this.physics.add.group();
        this.enemyBulletGroup = this.physics.add.group();
    }

    onCompleteGame() {
        this.timeCount = 0;
        this.music.stop();
        this.scene.stop('hud');
        this.scene.start('WinScreen');
    }
    update(time, delta) {
        this.bg.tilePositionX += LEVEL.SCROLL_SPEED.BACKGROUND;
        this.fg.tilePositionX += LEVEL.SCROLL_SPEED.FOREGROUND;
        this.timeCount += delta;
        this.game.events.emit(EVENTS.UPDATE_TIME, this.value ?? Math.floor(this.timeCount / 1000));

        if (this.esc.isDown) {
            this.timeCount = 0;
            this.music.stop();
            this.scene.stop('hud');
            this.scene.start('SplashScreen');
        }
    }
}