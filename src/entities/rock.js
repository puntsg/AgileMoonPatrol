import { LEVEL } from "../core/constants.js"

export class Rock extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(1);
        this.setScale(3);
        this.setGravityY(0); 
        this.setVelocityX(-LEVEL.SCROLL_SPEED.ENTITIES); 
        this.setCircle((this.width * 0.5) / 2, this.width / 4, this.height / 2);
        this.setBounce(0);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.x < -this.width) {
            this.destroy();
        }
    }
}