import { Spawner } from "./Spawner.js";
import { UFO } from "../entities/enemies/UFO.js";

export class EnemySpawner extends Spawner {
    timer() {
        const delay = Phaser.Math.Between(1500, 3000);
                this.scene.time.addEvent({
                    delay: delay,
                    callback: () => {
                        this.spawn();
                        this.timer(); 
                    }
                });
    }

    spawn() {
        const enemy = new UFO(this.scene, 300, 200, 'rock', 450, 350);
        this.scene.enemiesGroup.add(enemy);
    }
}