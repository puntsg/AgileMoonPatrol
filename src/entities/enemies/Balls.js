import { UFO } from "./UFO.js";
import { ENEMY } from "../../core/constants.js";
import { EnemyBullet } from "../EnemyBullet.js";

export class Balls extends UFO {

    /**
    * @param {number} _state
    * @param {number} _targetX
    * @param {number} _targetY
    * @param {number} _dir
    */

    constructor(params)
    {
        super(params, "Balls");
        this.anims.play("Balls_anim");
    }

    shoot() {
        if(!this.scene?.enemyBulletGroup) return;

        var _bullet = this.scene.enemyBulletGroup.getFirst(false);
        var _posX = this.x;
        var _posY = this.y;

        if(!_bullet)
        {
            _bullet = new EnemyBullet(this.scene,_posX,_posY,'enemy_bullet',true);
            this.scene.enemyBulletGroup.add(_bullet);
        }
        else
        {
            _bullet.enableBody(true, _posX, _posY, true, true);
            _bullet.destroyGround = true;
        }
        _bullet.body.setVelocityX(ENEMY.UFO.SHOOTING.SPEED_X);
        _bullet.body.setVelocityY(ENEMY.UFO.SHOOTING.SPEED_Y);
    }
}