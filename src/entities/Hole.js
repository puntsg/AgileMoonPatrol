import { config } from "../main.js";
import { LEVEL } from "../core/constants.js"    
export class Hole extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene,posX,posY,_sprite='hole'){
        super(_scene,posX,posY,_sprite);
        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.setScale(.5);
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.x <= 0)
            this.disableBody(true, true);
    }
}