import { Spawner } from "./Spawner.js";
import { Rock } from "../entities/rock.js";

export class RockSpawner extends Spawner {
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
        const rock = new Rock(this.scene, 750, 300, 'rock');
        this.scene.rocksGroup.add(rock);
    }
}