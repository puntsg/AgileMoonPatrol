import { Rover } from "../entities/Rover.js";
import { CheckpointManager } from "../managers/CheckpointManager.js";
import { ENEMY, LEVEL } from "../core/constants.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { RockSpawner } from "../spawners/RockSpawner.js";
import { config } from "../main.js";
import { EVENTS } from '../core/events.js';


export class MainGame extends Phaser.Scene {
    constructor(){
        super({key:"MainGame"});
    }
    preload(){
        this.load.image('bg', '../../assets/sprites/BG.png');
        this.load.image('fg', '../../assets/sprites/FG1.png');
        this.load.spritesheet('rover','../../assets/sprites/Ship.png',{frameWidth: 34, frameHeight:23});
        this.load.image('ground','../../assets/sprites/ground.png');
        this.load.spritesheet('rock', '../../assets/sprites/Rocks.png', {frameWidth: 15, frameHeight:16}); 
        ENEMY.SPRITES.forEach((obj, ind, arr) => {
            this.load.spritesheet(
                obj.name, 
                `../../assets/sprites/${obj.name}_spritesheet.png`,
                {frameWidth: obj.width, frameHeight: obj.height}
            );
        });
        this.load.image('bullet', '../../assets/sprites/spr_bullet_0.png');
        
        this.load.audio('music',  '../../assets/sounds/Moon Patrol Arcade - complete soundtrack.mp3');
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
        //localStorage.setItem('maxScore', 0);
        this.maxScore = parseInt(localStorage.getItem('maxScore'));
    }
    createInputs(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    createAnimations(){
        ENEMY.SPRITES.forEach((obj, ind, arr) => {
            this.anims.create({
                key: `${obj.name}_anim`,
                frames: this.anims.generateFrameNumbers(obj.name, { start: 0, end: obj.frames - 1}),
                frameRate: 6,
                repeat: -1
            });
        });
    }
    updateScore(scoreToAdd){
        this.score += scoreToAdd;
        this.game.events.emit(EVENTS.ADD_SCORE, this.value ?? this.score);
        console.log("Score: " + this.score + " Max Score: " + this.maxScore);
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
            this.updateScore(10);
            this.killSound.play();
            console.log("Enemy hit!");
        });

        this.physics.add.collider(this.rover, this.enemiesGroup, () => {
            console.log("Game Over");
            this.QuitLifes();

        });

        this.physics.add.overlap(this.rocksGroup, this.bulletGroup,(_rock, _bullet)=>{
            _rock.disableBody(true, true);
            _bullet.disableBody(true, true);
            this.killSound.play();
            console.log("Rock hit!");
        });

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            console.log("Game Over");
            this.QuitLifes();
        });
    }
    QuitLifes()
    {
        this.lifes--;
        this.game.events.emit(EVENTS.UPDATE_LIFES, this.value ??this.lifes);
        console.log(this.lifes);
        if(this.lifes > 0)
            this.clearScene();
        else{
            this.music.stop();
            this.scene.stop('hud');
            this.scene.start('SplashScreen'); 
        }
    }
    clearScene(){
        this.rocksGroup.clear(true, true);
        this.enemiesGroup.clear(true, true);
        this.bulletGroup.clear(true, true);
        this.rover.setPosition(config.width/2, config.height/2);
    }
    
    setScene(){
        this.scene.launch('hud');
        this.bg = this.add.tileSprite(0,0,config.width, 0, 'bg').setOrigin(0);
        this.fg = this.add.tileSprite(0,0,config.width, 0, 'fg').setOrigin(0).setScale(4);
        this.fg.y = 180;

        this.platformGroup.create(config.width/2, 750, 'ground').setScale(25).refreshBody();
        
        this.rover = new Rover(this,config.width/2,config.height/2,'rover').setScale(1.5);

        this.checkpointManager = new CheckpointManager(this, 0, 0);

        this.enemySpawner = new EnemySpawner(this, 0, 0);
        this.rockSpawner = new RockSpawner(this, 0, 0);
        
        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();

        this.killSound = this.sound.add('kill');
    }

    createPools() {
        this.platformGroup = this.physics.add.staticGroup();
        this.rocksGroup = this.add.group();
        this.enemiesGroup = this.add.group();
        this.bulletGroup = this.physics.add.group();
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