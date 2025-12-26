import { Enemy } from "./Enemy.js";
import { ENEMY } from "../../core/constants.js";

export class UFO extends Enemy {

    /**
    * @param {number} _state
    * @param {number} _targetX
    * @param {number} _targetY
    * @param {number} _dir
    */

    constructor(params, _texture="UFO")
    {
        super(params,_texture);

        this.body.reset(params._posX, params._posY);

        this._targetX = params._targetX;
        this._targetY = params._targetY;
        this._dir = 1;
        this._state = ENEMY.UFO.STATES.ARRIVING;

        params._scene.add.existing(this);
        params._scene.physics.add.existing(this);

        this.setOrigin(0);
        this.setScale(3);
        this.setGravityY(0); 
        this.setCircle((this.width) / 2, 0, -this.height/4);
        this.anims.play("UFO_anim");
    }

    behaviour(time,delta) {
        switch(this._state) {
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
        var dirX = this._targetX - this.body.position.x;
        var dirY = this._targetY - this.body.position.y;

        var mag = Math.sqrt(dirX * dirX + dirY * dirY);

        if(mag <= ENEMY.UFO.ARRIVING_TOLERANCE) {
            this._state = ENEMY.UFO.STATES.PATROLLING;
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

        if(Math.abs(this.body.position.x - this._targetX) >= 
            Math.abs(ENEMY.UFO.PATROLLING_AMPLITUDE)) 
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

        var dirX = (ENEMY.UFO.SPEED + 5) * this._dir;
        var dirY = 0;

        this.body.setVelocityX(dirX);
        this.body.setVelocityY(dirY);
    }

}