export class title extends Phaser.Scene {
    constructor(){
        super({key:"title"});
    }
    preload(){
        this.load.image('title', '../../assets/sprites/Title.png');
    }
    create(){
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.title = this.add.image(720/2,480/2,'title');
        const text = this.add.text(720/2+50, 480/2+100, 'Press 1 to start', { font: '32px Arial', fill: '#00ff00' });
    }
    
    update(delta){
        if(this.one.isDown){
            this.scene.start('gameState');
        }
    }
}