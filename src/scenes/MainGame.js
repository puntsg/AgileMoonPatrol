import { Rover } from "../entities/Rover.js";
import { CheckpointManager } from "../managers/CheckpointManager.js";
import { ENEMY, LEVEL, SCORE } from "../core/constants.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { RockSpawner } from "../spawners/RockSpawner.js";
import { config } from "../main.js";
import { EVENTS } from '../core/events.js';
import { HoleSpawner } from "../spawners/HoleSpawner.js";

export class MainGame extends Phaser.Scene {
    constructor(){
        super({key:"MainGame"});
    }

    preload(){
        this.load.audio('music', '../../assets/sounds/Moon Patrol Arcade - complete soundtrack.mp3');
        this.load.audio('jump', '../../assets/sounds/jump.mp3');
        this.load.audio('shot', '../../assets/sounds/shot.mp3');
        this.load.audio('kill', '../../assets/sounds/kill.mp3');
    }

    create(){
        this.createInputs();
        this.createPools();
        
        this.setScene();
        this.createAnimations();
        this.setCollisions();
        
        this.lifes = 3;
        this.timeCount = 0;
        this.score = 0;
        this.maxScore = parseInt(localStorage.getItem('maxScore')) || 0;
    }
    createPlatform(x,y,xSpeed,ySpeed){

        this.plat = this.physics.add.staticImage(config.width/2, 750, 'ground').setScale(25).refreshBody();
        this.platformGroup.add(this.plat);

        // var _plat = this.platformGroup.getFirst(false);
        // if(!_plat){
        //     _plat = new Platform(this,x,y,'ground').setScale(25).refreshBody();
        //     this.platformGroup.add(_plat);
        // }else{
        //     _plat.enableBody(true,x, y, true, true);
        // }
        // _plat.body.setAllowGravity(false);
        // _plat.body.setVelocityX(xSpeed);
        // _plat.body.setVelocityY(ySpeed);
    }
    createInputs(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    createAnimations(){
        ENEMY.SPRITES.forEach((obj) => {
            if(!this.anims.exists(`${obj.name}_anim`)) {
                this.anims.create({
                    key: `${obj.name}_anim`,
                    frames: this.anims.generateFrameNumbers(obj.name, { start: 0, end: obj.frames - 1}),
                    frameRate: 6,
                    repeat: -1
                });
            }
        });

        this.anims.create({
            key: "enemy_bullet_horizontal",
            frames: this.anims.generateFrameNumbers('enemy_bullet', {start: 0, end: 0})
        });

        this.anims.create({
            key: "enemy_bullet_diagonal",
            frames: this.anims.generateFrameNumbers('enemy_bullet', {start: 1, end: 1})
        });

        this.anims.create({
            key: "enemy_bullet_vertical",
            frames: this.anims.generateFrameNumbers('enemy_bullet', {start: 2, end: 2})
        });
    }

    updateScore(scoreToAdd){
        this.score += scoreToAdd;
        this.game.events.emit(EVENTS.ADD_SCORE, this.value ?? this.score);
        if(this.score > this.maxScore){
            this.maxScore = this.score;
            localStorage.setItem('maxScore', this.maxScore);
            this.game.events.emit(EVENTS.SET_MAXSCORE, this.value ?? this.maxScore);
        }
    }

    setCollisions(){
        this.physics.add.collider(this.rover, this.platformGroup);
        this.physics.add.collider(this.rocksGroup, this.platformGroup);

        this.physics.add.overlap(this.enemiesGroup, this.bulletGroup,(_enemy, _bullet)=>{
            _enemy.disableBody(true, true);
            _bullet.disableBody(true, true);
            this.updateScore(SCORE.ENEMY_KILL);
            this.killSound.play();
        });

        this.physics.add.collider(this.rover, this.enemiesGroup, () => {
            this.QuitLifes();
        });

        this.physics.add.overlap(this.rocksGroup, this.bulletGroup,(_rock, _bullet)=>{
            _rock.disableBody(true, true);
            _bullet.disableBody(true, true);
            this.killSound.play();
        });

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            this.QuitLifes();
        });

        this.physics.add.collider(this.rover, this.holesGroup, () => {
            console.log("Game Over");
            this.QuitLifes();
        });

        this.physics.add.overlap(this.platformGroup, this.enemyBulletGroup,(_plat, _bullet)=>{
            _bullet.disableBody(true, true);
            if(_bullet.destroyGround) {
                this.holeSpawner.spawnAt(_bullet.x, LEVEL.HOLE.SPAWN.POS_Y);
            }
        });

        this.physics.add.overlap(this.rover, this.enemyBulletGroup,()=>{
            this.QuitLifes();
        });

        this.physics.add.overlap(this.bulletGroup, this.enemyBulletGroup,(_bullet, _eBullet)=>{
            _bullet.disableBody(true, true);
            _eBullet.disableBody(true, true);
        });
    }

    QuitLifes()
    {
        this.lifes--;
        this.game.events.emit(EVENTS.UPDATE_LIFES, this.value ?? this.lifes);
        
        if(this.lifes > 0) {
            this.clearScene();
        } else {
            this.music.stop();
            this.scene.stop('hud');
            this.scene.start('GameOver', { score: this.score }); 
        }
    }

    clearScene(){
        this.rocksGroup.clear(true, true);
        this.enemiesGroup.clear(true, true);
        this.holesGroup.clear(true, true);
        this.bulletGroup.clear(true, true);
        this.enemyBulletGroup.clear(true, true);
        this.rover.setPosition(config.width/2, config.height/2);
    }
    
    setScene(){
        this.scene.launch('hud');
        this.bg = this.add.tileSprite(0,0,config.width, 0, 'bg').setOrigin(0);
        this.fg = this.add.tileSprite(0,0,config.width, 0, 'fg').setOrigin(0).setScale(4);
        this.fg.y = 180;

        this.createPlatform(config.width/2, 750, 0, 0);

        // this.platformGroup.create(config.width/2, 750, 'ground').setScale(25).refreshBody();
        // this.platformGroup[0].body.setVelocityX(-100);
        // this.platformGroup[0].body.setAllowGravity(false);
        
        this.rover = new Rover(this,config.width/2,config.height/2,'rover').setScale(1.5);

        this.checkpointManager = new CheckpointManager(this, 0, 0);

        this.enemySpawner = new EnemySpawner(this, 0, 0);
        this.holeSpawner = new HoleSpawner(this, 0, 0);
        this.rockSpawner = new RockSpawner(this, 0, 0);
        
        this.killSound = this.sound.add('kill');
        
        this.music = this.sound.add('music');
        this.music.loop = true;
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

    update(time,delta){
        this.bg.tilePositionX += LEVEL.SCROLL_SPEED.BACKGROUND;
        this.fg.tilePositionX += LEVEL.SCROLL_SPEED.FOREGROUND;
        this.timeCount += delta;
        this.game.events.emit(EVENTS.UPDATE_TIME, this.value ?? Math.floor(this.timeCount/1000));
        
        if(this.esc.isDown){
            this.timeCount = 0;
            this.music.stop();
            this.scene.stop('hud');
            this.scene.start('SplashScreen'); 
        }
    }
}