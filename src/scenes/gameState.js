import { Rover } from "../entities/rover.js"; 
import { Rock } from "../entities/rock.js"; 
import { UFO } from "../entities/enemies/UFO.js";
import { CheckpointManager } from "../managers/CheckpointManager.js";
import { LEVEL } from "../core/constants.js";

export class gameState extends Phaser.Scene {
    constructor(){
        super({key:"gameState"});
    }
    preload(){
        this.load.image('bg', '../../assets/sprites/BG.png');
        this.load.image('fg', '../../assets/sprites/FG1.png');
        this.load.spritesheet('rover','../../assets/sprites/Ship.png',{frameWidth: 34, frameHeight:23});
        this.load.image('ground','../../assets/sprites/ground.png');
        this.load.spritesheet('rock', '../../assets/sprites/Rocks.png', {frameWidth: 15, frameHeight:16}); 
        this.load.image('bullet', '../../assets/sprites/spr_bullet_0.png');
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.bg = this.add.tileSprite(0,0,720, 0, 'bg').setOrigin(0);
        this.fg = this.add.tileSprite(0,0,720, 0, 'fg').setOrigin(0).setScale(4);
        this.fg.y = 180;
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(720/2, 750, 'ground').setScale(25).refreshBody();

        this.rocksGroup = this.add.group();
        this.enemiesGroup = this.add.group();
        this.bulletPool = this.physics.add.group();
        
        this.rover = new Rover(this,720/2,480/2,'rover').setScale(1.5);

        this.physics.add.collider(this.rover, this.platforms);
        this.physics.add.collider(this.rocksGroup, this.platforms);

        this.physics.add.overlap(this.rocksGroup, this.bulletPool,(_rock, _bullet)=>{
            _rock.setActive(false);
            _bullet.setActive(false);
            console.log("Rock hit!");
        });

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            console.log("Game Over");
            this.scene.restart();
        });

        
        this.spawnRockTimer();
        this.spawnEnemyTimer();

        const checkpointManager = new CheckpointManager(this, 0, 0);
    }
    update(){
        this.bg.tilePositionX += LEVEL.SCROLL_SPEED.BACKGROUND;
        this.fg.tilePositionX += LEVEL.SCROLL_SPEED.FOREGROUND;
        if(this.esc.isDown){
            this.scene.start('title'); 
        }
    }

    spawnRockTimer() {
        const delay = Phaser.Math.Between(1500, 3000);
        this.time.addEvent({
            delay: delay,
            callback: () => {
                this.spawnRock();
                this.spawnRockTimer(); 
            }
        });
    }

    spawnEnemyTimer() {
        const delay = Phaser.Math.Between(1500, 3000);
        this.time.addEvent({
            delay: delay,
            callback: () => {
                this.spawnEnemy();
                this.spawnEnemyTimer(); 
            }
        });
    }

    spawnEnemy() {
        const enemy = new UFO(this, 300, 200, 'rock', 450, 350);
        this.enemiesGroup.add(enemy);
    }

    spawnRock() {
        const rock = new Rock(this, 750, 300, 'rock');
        this.rocksGroup.add(rock);
    }
}