import { Spawner } from "./Spawner.js";
import { UFO } from "../entities/enemies/UFO.js";
import { ENEMY } from "../core/constants.js";

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
        var _enemy = this.scene.enemiesGroup.getFirst(false);
        var _posX = 300;
        var _posY = 200;

        if(!_enemy)
        {
            _enemy = new UFO(this.scene,_posX,_posY,'rock',450,350);
            this.scene.enemiesGroup.add(_enemy);
        }
        else
        {
            _enemy.setActive(true);
            _enemy.body.reset(_posX,_posY);
            _enemy._state = ENEMY.UFO.STATES.ARRIVING;
        }
    }
}