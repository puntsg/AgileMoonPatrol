import { EVENTS } from '../../core/events.js';
import { EnemyBullet } from '../EnemyBullet.js';
import { ENEMY } from '../../core/constants.js';

export class BaseEnemy extends Phaser.Physics.Arcade.Sprite {

    /**
   * @param {Phaser.Scene} _scene
   * @param {number} _posX
   * @param {number} _posY
   * @param {string} _texture
   */

    constructor(params, _texture) {
        super(params._scene, params._posX, params._posY, _texture);

        params._scene.add.existing(this);
        params._scene.physics.world.enable(this);

        this.setColliders();
        this.timer();
    }

    timer() {
        if (!this.active || !this.scene?.time) return;

        const delay = Phaser.Math.Between(
            ENEMY.UFO.SHOOTING.TIMER_MIN, ENEMY.UFO.SHOOTING.TIMER_MIN
        );
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.shoot();
                this.timer();
            }
        });
    }

    setColliders() {
        this.scene.physics.add.overlap(this, this.scene.bulletGroup, (_enemy, _bullet) => {
            _enemy.disableBody(true, true);
            _bullet.disableBody(true, true);
            this.scene.game.events.emit(EVENTS.ADD_SCORE, this.value ?? 1);
            this.scene.killSound.play();
        });
    }

    behaviour(time, delta) { }

    shoot() {
        if (!this.active || !this.scene?.enemyBulletGroup) return;

        var _bullet = this.scene.enemyBulletGroup.getFirst(false);
        var _posX = this.x;
        var _posY = this.y;

        if (!_bullet) {
            _bullet = new EnemyBullet(this.scene, _posX, _posY, 'enemy_bullet', false);
            this.scene.enemyBulletGroup.add(_bullet);
        }
        else {
            _bullet.enableBody(true, _posX, _posY, true, true);
            _bullet.destroyGround = false;
        }
        _bullet.body.setVelocityX(ENEMY.UFO.SHOOTING.SPEED_X);
        _bullet.body.setVelocityY(ENEMY.UFO.SHOOTING.SPEED_Y);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.behaviour(time, delta);
    }
}