export class Manager extends Phaser.GameObjects.Container {
    /**
    * @param {Phaser.Scene} _scene
    * @param {number} _posX
    * @param {number} _posY
    */

    constructor (_scene, x, y)
    {
        super(_scene);
        this._posX = x;
        this._posY = y;

        _scene.add.existing(this);
    }

    addedToScene ()
    {
        super.addedToScene();

        //  This Game Object has been added to a Scene
    }

    removedFromScene ()
    {
        super.removedFromScene();

        //  This Game Object has been removed from a Scene
    }
}