import { CHECKPOINT, LEVEL } from "../core/constants.js";
import { Manager } from "./Manager.js";

export class CheckpointManager extends Manager {

    /**
     * @param {number} _distance
     * @param {integer} _currentCheckpoint
     * @constant {Phaser.GameObjects.Text} _text
     */

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this._distance = 0;
        this._currentCheckpoint = 0;
        this._text = scene.add.text(
            0, 0, 
            'A' + this._currentCheckpoint, 
            { font: '32px Arial', fill: '#00ff00' }
        );
        this._text.setX(CHECKPOINT.SEPARATION);
        this._text.setY(0);

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

    preUpdate(time, delta) {
        this._distance += LEVEL.SCROLL_SPEED.BACKGROUND;

        var distanceLeft = (this._currentCheckpoint + 1) * CHECKPOINT.SEPARATION - this._distance;

        this._text.setX(distanceLeft);

        if(distanceLeft < 0) {
            this._currentCheckpoint += 1;
            this._text.setText('A' + this._currentCheckpoint);
        }
    }
}