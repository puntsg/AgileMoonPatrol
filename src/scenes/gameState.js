export class gameState extends Phaser.Scene {
    constructor(){
        super({key:"gameState"});
    }
    preload(){
        
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    update(){
        if(this.esc.isDown){
            this.scene.start('title'); 
        }
    }
}