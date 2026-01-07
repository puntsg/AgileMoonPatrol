import { config } from "../main.js";

export class WinScreen extends Phaser.Scene {
    constructor(){
        super({key:"WinScreen"});
    }

    create(data){
        this.add.rectangle(0, 0, config.width, config.height, 0x000000).setOrigin(0);

        this.add.text(config.width/2, config.height/2 - 50, 'YOU WIN!', { 
            font: '64px Arial', 
            fill: '#00ff00ff',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        const finalScore = data.score || 0;
        this.add.text(config.width/2, config.height/2 + 20, `SCORE: ${finalScore}`, { 
            font: '32px Arial', 
            fill: '#ffffff' 
        }).setOrigin(0.5);

        const restartText = this.add.text(config.width/2, config.height/2 + 100, 'PRESS 1 TO RESTART', { 
            font: '24px Arial', 
            fill: '#00ff00' 
        }).setOrigin(0.5);

        this.tweens.add({
            targets: restartText,
            alpha: 0.5,
            duration: 800,
            yoyo: true,
            loop: -1
        });

        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(){
        if(this.one.isDown){
            this.scene.start('SplashScreen');
        }
    }
}