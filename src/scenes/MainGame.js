import { Rover } from "../entities/Rover.js";
import { CheckpointManager } from "../managers/CheckpointManager.js";
import { LEVEL } from "../core/constants.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { RockSpawner } from "../spawners/RockSpawner.js";
import { config } from "../main.js";

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
        this.load.spritesheet('ufo', '../../assets/sprites/enemyUFO.png', {frameWidth: 16, frameHeight:7});
        this.load.image('bullet', '../../assets/sprites/spr_bullet_0.png');
        
        // --- AUDIOS ---
        this.load.audio('music',  '../../assets/sounds/Moon Patrol Arcade - complete soundtrack.mp3');
        this.load.audio('jump', '../../assets/sounds/jump.mp3');
        this.load.audio('shot', '../../assets/sounds/shot.mp3');
        
        // --- NUEVO: Cargar sonido de muerte/explosión ---
        this.load.audio('kill', '../../assets/sounds/kill.mp3');
    }
    create(){
        this.createInputs();
        this.createPools();
        
        this.setScene();
        this.createAnimations();
        this.setCollisions();
    }
    createInputs(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    createAnimations(){
        this.anims.create({
            key: 'UFOanim',
            frames: this.anims.generateFrameNumbers('ufo', { start: 0, end: 2}),
            frameRate: 6,
            repeat: -1
        });
    }
    setCollisions(){

        this.physics.add.collider(this.rover, this.platformGroup);
        this.physics.add.collider(this.rocksGroup, this.platformGroup);

        // --- COLISIÓN BALA CONTRA ENEMIGO (UFO) ---
        this.physics.add.overlap(this.enemiesGroup, this.bulletGroup,(_enemy, _bullet)=>{
            _enemy.disableBody(true, true);
            _bullet.disableBody(true, true);
            
            // --- NUEVO: Reproducir sonido kill ---
            this.killSound.play();
            
            console.log("Enemy hit!");
        });

        this.physics.add.collider(this.rover, this.enemiesGroup, () => {
            console.log("Game Over");
            this.scene.restart();
        });

        // --- COLISIÓN BALA CONTRA ROCA ---
        this.physics.add.overlap(this.rocksGroup, this.bulletGroup,(_rock, _bullet)=>{
            _rock.disableBody(true, true);
            _bullet.disableBody(true, true);
            
            // --- NUEVO: Reproducir sonido kill (también para rocas) ---
            this.killSound.play();
            
            console.log("Rock hit!");
        });

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            console.log("Game Over");
            this.scene.restart();
        });
    }
    setScene(){
        this.bg = this.add.tileSprite(0,0,720, 0, 'bg').setOrigin(0);
        this.fg = this.add.tileSprite(0,0,720, 0, 'fg').setOrigin(0).setScale(4);
        this.fg.y = 180;

        this.platformGroup.create(720/2, 750, 'ground').setScale(25).refreshBody();
        
        this.rover = new Rover(this,720/2,480/2,'rover').setScale(1.5);

        this.checkpointManager = new CheckpointManager(this, 0, 0);

        this.enemySpawner = new EnemySpawner(this, 0, 0);
        this.rockSpawner = new RockSpawner(this, 0, 0);
        
        // Inicialización de sonidos
        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();

        // --- NUEVO: Inicializar el sonido kill ---
        this.killSound = this.sound.add('kill');
    }

    createPools() {
        this.platformGroup = this.physics.add.staticGroup();
        this.rocksGroup = this.add.group();
        this.enemiesGroup = this.add.group();
        this.bulletGroup = this.physics.add.group();
    }

    update(){
        this.bg.tilePositionX += LEVEL.SCROLL_SPEED.BACKGROUND;
        this.fg.tilePositionX += LEVEL.SCROLL_SPEED.FOREGROUND;
        if(this.esc.isDown){
            this.music.stop();
            this.scene.start('SplashScreen'); 
        }
    }
}