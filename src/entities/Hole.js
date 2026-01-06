import { config } from "../main.js";
import { LEVEL } from "../core/constants.js"    
export class Hole extends Phaser.Physics.Arcade.Sprite {
    constructor(_scene,posX,posY,_sprite='hole'){
        super(_scene,posX,posY,_sprite);
        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.setScale(.5);
        this.setCircle((this.width * 0.5) / 2, this.width / 4, 0);
        //this.setDepth(-100);
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.x <= 0)
            this.disableBody(true, true);
    }
}