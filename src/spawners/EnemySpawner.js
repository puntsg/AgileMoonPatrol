import { Spawner } from "./Spawner.js";
import { UFO } from "../entities/enemies/UFO.js";
import { ENEMY } from "../core/constants.js";

export class EnemySpawner extends Spawner {
    timer() {
        const delay = Phaser.Math.Between(
            ENEMY.UFO.SPAWN.TIMER_MIN, ENEMY.UFO.SPAWN.TIMER_MAX
        );
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
        var _posX = ENEMY.UFO.SPAWN.POS_X;
        var _posY = ENEMY.UFO.SPAWN.POS_Y;

        if(!_enemy)
        {
            _enemy = new UFO(
                this.scene,
                _posX, _posY,
                'rock',
                ENEMY.UFO.TARGET.POS_X, ENEMY.UFO.TARGET.POS_Y
            );
            this.scene.enemiesGroup.add(_enemy);
        }
        else
        {
            _enemy.enableBody(true, _posX, _posY, true, true);
            _enemy._state = ENEMY.UFO.STATES.ARRIVING;
        }
    }
}