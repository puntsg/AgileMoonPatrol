import { Rover } from "../entities/Rover.js";
import { CheckpointManager } from "../managers/CheckpointManager.js";
import { LEVEL } from "../core/constants.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { RockSpawner } from "../spawners/RockSpawner.js";

export class MainGame extends Phaser.Scene {
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
    
        this.createPools();

        this.platformGroup.create(720/2, 750, 'ground').setScale(25).refreshBody();
        
        this.rover = new Rover(this,720/2,480/2,'rover').setScale(1.5);

        this.checkpointManager = new CheckpointManager(this, 0, 0);

        this.physics.add.collider(this.rover, this.platformGroup);
        this.physics.add.collider(this.rocksGroup, this.platformGroup);

        this.physics.add.overlap(this.rocksGroup, this.bulletGroup,(_rock, _bullet)=>{
            _rock.setActive(false);
            _bullet.setActive(false);
            console.log("Rock hit!");
        });

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            console.log("Game Over");
            this.scene.restart();
        });

        this.enemySpawner = new EnemySpawner(this, 0, 0);
        this.rockSpawner = new RockSpawner(this, 0, 0);
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
            this.scene.start('title'); 
        }
    }
}