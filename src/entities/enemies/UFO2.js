import { UFO } from "./UFO.js";
import { ENEMY } from "../../core/constants.js";

export class UFO2 extends UFO {

    /**
    * @param {number} _state
    * @param {number} _targetX
    * @param {number} _targetY
    * @param {number} _dir
    */

    constructor(_scene,_posX,_posY,_texture,_targetX,_targetY)
    {
        super(_scene,_posX,_posY,_texture);


        this.body.reset(_posX, _posY);

        this._targetX = _targetX;
        this._targetY = _targetY;
        this._dir = 1;
        this._state = ENEMY.UFO.STATES.ARRIVING;

        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.setOrigin(0);
        this.setScale(3);
        this.setGravityY(0); 
        this.setCircle((this.width) / 2, 0, -this.height/4);
        this.anims.play('UFO2anim');
    }

}