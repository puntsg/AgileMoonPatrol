export class title extends Phaser.Scene {
    constructor(){
        super({key:"title"});
    }
    preload(){
        

    }
    create(){
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }
    
    update(delta){
        if(this.one.isDown){
            this.scene.start('gameState');
        }
    }
}