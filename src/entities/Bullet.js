export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(_scene,posX,posY,_sprite='bullet'){
        super(_scene,posX,posY,_sprite);
        _scene.add.existing(this);
    }
    preUpdate(){
        if(this.y <= 0 || this.x >= 720)
            this.setActive(false);
    }
}