import { CHECKPOINT, LEVEL } from "../core/constants.js";
import { Manager } from "./Manager.js";
import { EVENTS } from '../core/events.js';

export class CheckpointManager extends Manager {

    /**
     * @param {number} _distance
     * @param {integer} _currentCheckpoint
     * @constant {Phaser.GameObjects.Text} _text
     */

    constructor(scene, x, y) {
        super(scene, x, y);

        var checkpoint = this.scene.registry.get('Checkpoint');
        if (checkpoint === undefined) {
            checkpoint = 0;
            this.scene.registry.set('Checkpoint', checkpoint)
        }
        this._currentCheckpoint = checkpoint;

        this._distance = this._currentCheckpoint * CHECKPOINT.SEPARATION;

        this._text = scene.add.text(
            0, 0,
            String.fromCharCode(65 + this._currentCheckpoint),
            { font: '32px Arial', fill: '#00ff00' }
        );
        this._text.setX(CHECKPOINT.SEPARATION);
        this._text.setY(350);
        this.distancePercent = 0;
        this.scene.children.bringToTop(this._text);
        this.totaldistance = CHECKPOINT.SEPARATION*26;
    }

    preUpdate(time, delta) {
        this._distance += LEVEL.SCROLL_SPEED.BACKGROUND;

        var distanceLeft = (this._currentCheckpoint + 1) * CHECKPOINT.SEPARATION - this._distance;
        if (this.scene.cursors.right.isDown) {
            this._distanceLeft -= CHECKPOINT.ACCELERATION;
            this._distance += CHECKPOINT.ACCELERATION;
        }

        this._text.setX(distanceLeft);
        this.distancePercent = this._distance / this.totaldistance;
        if(this.distancePercent >= 1) 
            this.scene.game.events.emit(EVENTS.ON_LAST_CHECKPOINT_REACHED);
        
        this.scene.game.events.emit(EVENTS.UPDATE_CHECKPOINT_PROGRESS, this.distancePercent);

        if (distanceLeft < 0) {
            this._currentCheckpoint += 1;
            this.scene.registry.set('Checkpoint', this._currentCheckpoint);
            this.scene.game.events.emit(EVENTS.UPDATE_CHECKPOINT, this._currentCheckpoint);
            this._text.setText(String.fromCharCode(65 + this._currentCheckpoint));

            this.scene.children.bringToTop(this._text);
        }
        
    }
}