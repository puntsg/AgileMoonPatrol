import { LEVEL, SCORE } from "../core/constants.js"

export class Rock extends Phaser.Physics.Arcade.Sprite {
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

        this.passed = false; 
        this.hp = Phaser.Math.Between(1, 2);
            if(this.hp == 1)
                this.setFrame(0);
            else
                this.setFrame(Phaser.Math.Between(1, 2));
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.active && !this.passed && this.x < this.scene.rover.x) {
            this.passed = true;
            this.scene.updateScore(SCORE.ROCK_PASSED); 
        }

        if (this.x < -this.width) {
            this.disableBody(true, true);
        }
    }
}