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

        this.body.debugShowBody = false;
        this.body.debugShowVelocity = false;

        this.setScale(0.5);
        this.setGravityY(500); 
        this.setVelocityX(-200); 
        this.setCircle((this.width * 0.5) / 2);
        this.setBounce(0.2);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.x < -this.width) {
            this.destroy();
        }
    }
}