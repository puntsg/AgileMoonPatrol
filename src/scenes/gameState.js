import { Rover } from "../entities/rover.js"; 
import { Rock } from "../entities/rock.js"; 

export class gameState extends Phaser.Scene {
    constructor(){
        super({key:"gameState"});
    }
    preload(){
        this.load.image('bg', '../../assets/sprites/BG.png');
        this.load.spritesheet('rover','../../assets/sprites/Ship.png',{frameWidth: 34, frameHeight:23});
        this.load.image('ground','../../assets/sprites/ground.png');
        this.load.spritesheet('rock', '../../assets/sprites/Rocks.png', {frameWidth: 15, frameHeight:16}); 
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.bg = this.add.tileSprite(0,0,720, 0, 'bg').setOrigin(0);
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(720/2, 750, 'ground').setScale(25).refreshBody();

        this.rocksGroup = this.add.group();

        this.rover = new Rover(this,720/2,480/2,'rover');

        this.physics.add.collider(this.rover, this.platforms);
        this.physics.add.collider(this.rocksGroup, this.platforms);

        this.physics.add.collider(this.rover, this.rocksGroup, () => {
            console.log("Game Over");
            this.scene.restart();
        });

        this.spawnRockTimer();
    }
    update(){
        this.bg.tilePositionX += 2;
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

    spawnRock() {
        const rock = new Rock(this, 750, 300, 'rock');
        this.rocksGroup.add(rock);
    }
}