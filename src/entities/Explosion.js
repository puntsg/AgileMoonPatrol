import { EXPLOSION } from "../core/constants.js";

export class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, EXPLOSION.SPRITE.name);
        scene.add.existing(this);
        this.on('animationcomplete', this.hide, this);
    }

    fire(x, y, animationKey) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.play(animationKey);
    }

    hide() {
        this.setActive(false);
        this.setVisible(false);
    }
}