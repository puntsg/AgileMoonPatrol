import { Enemy } from "./Enemy.js";
import { ENEMY } from "../../core/constants.js";

export class UFO extends Enemy {

    /**
    * @param {number} _state
    * @param {number} _targetX
    * @param {number} _targetY
    * @param {number} _dir
    */

    constructor(_scene,_posX,_posY,_texture)
    {
        super(_scene,_posX,_posY,_texture);
    }

    behaviour(time,delta) {
        switch(_state) {
            case ENEMY.UFO.STATES.ARRIVING:
                this.arriving(time, delta);
                break;
            case ENEMY.UFO.STATES.PATROLLING:
                this.patrolling(time, delta);
                break;
            case ENEMY.UFO.STATES.STEERING:
                this.steering(time, delta);
                break;
        }
    }

    arriving(time, delta) {
        var dirX = _targetX - _posX;
        var dirY = _targetY - _posY;

        var mag = Phaser.Math.Sqrt(dirX * dirX + dirY * dirY);

        if(mag <= ENEMY.UFO.ARRIVING_TOLERANCE) {
            this._state = ENEMY.UFO.STATES.ARRIVING;
            return;
        } 

        dirX *= ENEMY.UFO.SPEED / mag;
        dirY *= ENEMY.UFO.SPEED / mag;

        this.body.setVelocityX(dirX);
        this.body.setVelocityY(dirY);
    }

    patrolling(time, delta) {
        var dirX = ENEMY.UFO.SPEED * this._dir;
        var dirY = 0;

        if(Phaser.Math.Abs(this._posX - this._targetX) >= 
            Phaser.Math.Abs(ENEMY.UFO.PATROLLING_AMPLITUDE)) 
            {
                this._state = ENEMY.UFO.STATES.STEERING;
                return;
        }

        this.body.setVelocityX(dirX);
        this.body.setVelocityY(dirY);
    }

    steering(time, delta) {
        this._dir *= -1;
        this._state = ENEMY.UFO.STATES.PATROLLING;
    }

}