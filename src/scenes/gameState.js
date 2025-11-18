import { Rover } from "../entities/rover.js"; 
export class gameState extends Phaser.Scene {
    constructor(){
        super({key:"gameState"});
    }
    preload(){
        this.load.image('bg', '../../assets/sprites/BG.png');
        this.load.spritesheet('rover','../../assets/sprites/Ship.png',{frameWidth: 34, frameHeight:23});
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.bg = this.add.tileSprite(0,0,720, 480, 'bg').setOrigin(0);
        this.rover = new Rover(this,720/2,480/2,'rover');
    }
    update(){
        this.bg.tilePositionX += 2;
        if(this.esc.isDown){
            this.scene.start('title'); 
        }
    }
}