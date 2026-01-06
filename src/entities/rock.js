import { LEVEL, SCORE } from "../core/constants.js" // Importamos SCORE

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

        // Flag para saber si ya hemos puntuado por esta roca
        this.passed = false; 
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Lógica de puntuación:
        // Si la roca está activa, no hemos puntuado aún, y su X es menor que la del jugador...
        if (this.active && !this.passed && this.x < this.scene.rover.x) {
            this.passed = true;
            // Llamamos a updateScore de la escena principal
            this.scene.updateScore(SCORE.ROCK_PASSED); 
        }

        if (this.x < -this.width) {
            this.disableBody(true, true);
        }
    }
}