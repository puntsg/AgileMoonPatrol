import { config } from "../main.js";

export class SplashScreen extends Phaser.Scene {
    constructor(){
        super({key:"SplashScreen"});
    }
    preload(){
        this.load.image('title', '../../assets/sprites/Title.png');
    }
    create(){
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.title = this.add.image(config.width/2,config.height/2,'title');
        const text = this.add.text(
            config.width/2+50, config.height/2+100, 
            'Press 1 to start', 
            { font: '32px Arial', fill: '#00ff00' }
        );
    }
    
    update(delta){
        if(this.one.isDown){
            this.scene.start('MainGame');
        }
    }
}