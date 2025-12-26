import { EVENTS } from '../../core/events.js';

export class Enemy extends Phaser.Physics.Arcade.Sprite {

    /**
   * @param {Phaser.Scene} _scene
   * @param {number} _posX
   * @param {number} _posY
   * @param {string} _texture
   */

    constructor(params, _texture)
    {
        super(params._scene,params._posX,params._posY,_texture);

        params._scene.add.existing(this);
        params._scene.physics.world.enable(this);

        this.setColliders();
    }

    setColliders()
    {
        this.scene.physics.add.overlap(this, this.scene.bulletGroup,(_enemy, _bullet)=>{
                    _enemy.disableBody(true, true);
                    _bullet.disableBody(true, true);
                    this.scene.game.events.emit(EVENTS.ADD_SCORE, this.value ?? 1);
                    this.scene.killSound.play();
                    console.log("Enemy hit!");
                });
    }

    behaviour(time,delta) {}

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);  

        this.behaviour(time,delta);
    }
}