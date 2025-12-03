import { config } from "../main.js";
import { LEVEL } from "../core/constants.js"    
export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene,posX,posY,_sprite='bullet'){
        super(_scene,posX,posY,_sprite);
        _scene.add.existing(this);
    }
    preUpdate(){
        if(this.x <= 0 || this.x >= config.width)
            this.setActive(false);
    }
}