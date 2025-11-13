export class Enemy extends Phaser.Physics.Arcade.Sprite {

    /**
   * @param {Phaser.Scene} _scene
   * @param {number} _posX
   * @param {number} _posY
   * @param {string} _texture
   */

    constructor(_scene,_posX,_posY,_texture)
    {
        super(_scene,_posX,_posY,_texture);

        _scene.add.existing(this);
        _scene.physics.world.enable(this);

        this.setColliders();
    }

    setColliders()
    {

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);  

        behaviour(time,delta);
    }

    behaviour(time,delta) {}
}