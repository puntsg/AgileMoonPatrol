import { Explosion } from "../entities/Explosion.js";
import { EXPLOSION } from "../core/constants.js";

export class ExplosionSpawner {
    constructor(scene) {
        this.scene = scene;
        this.pool = this.scene.add.group({
            classType: Explosion,
            maxSize: 10,
            runChildUpdate: false
        });
    }

    spawn(x, y) {
        let explosion = this.pool.getFirstDead(false);

        if (!explosion) {
            explosion = new Explosion(this.scene, x, y);
            this.pool.add(explosion);
        }

        explosion.fire(x, y, EXPLOSION.ANIM);
    }
}