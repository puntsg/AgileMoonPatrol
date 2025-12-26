import { Spawner } from "./Spawner.js";
import { UFO } from "../entities/enemies/UFO.js";
import { UFO2 } from "../entities/enemies/UFO2.js";
import { Balls } from "../entities/enemies/Balls.js";
import { ENEMY } from "../core/constants.js";

export class EnemySpawner extends Spawner {
    timer() {
        const delay = Phaser.Math.Between(
            ENEMY.SPAWNING.TIMER_MIN, ENEMY.SPAWNING.TIMER_MAX
        );
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.spawnBurst();
                this.timer(); 
            }
        });
    }

    spawnBurst() {
        const count = Phaser.Math.Between(
            ENEMY.SPAWNING.BURST_ENEMIES_MIN, ENEMY.SPAWNING.BURST_ENEMIES_MAX
        );
        var type = Phaser.Math.Between(
                0, ENEMY.TYPE_COUNT - 1
            );
        for(var i = 0; i < count; i++) {
            const delay = Phaser.Math.Between(
                ENEMY.SPAWNING.BURST_TIMER_MIN, ENEMY.SPAWNING.BURST_TIMER_MAX
            );
            switch(type) {
                case 0:
                    this.scene.time.addEvent({
                        delay: delay,
                        callback: () => {
                            this.spawn(UFO);
                        }
                    });
                    break;
                case 1:
                    this.scene.time.addEvent({
                        delay: delay,
                        callback: () => {
                            this.spawn(UFO2);
                        }
                    });
                    break;
                case 2:
                    this.scene.time.addEvent({
                        delay: delay,
                        callback: () => {
                            this.spawn(Balls);
                        }
                    });
                    break;
            }
        }
    }

    spawn(enemyType) {
        var enemies = this.scene.enemiesGroup.getMatching('active', false);
        var _posX = ENEMY.SPAWNING.POS_X;
        var _posY = ENEMY.SPAWNING.POS_Y;

        if(enemies.length > 0) {
            enemies.forEach((_enemy) => {
                if(_enemy.constructor === enemyType)
                {
                    _enemy.enableBody(true, _posX, _posY, true, true);
                    _enemy._state = ENEMY.UFO.STATES.ARRIVING;
                }
            });
        }

        var _enemy = new enemyType({
            _scene: this.scene,
            _posX: _posX, _posY: _posY,
            _targetX: ENEMY.UFO.TARGET.POS_X, _targetY: ENEMY.UFO.TARGET.POS_Y
        });
        this.scene.enemiesGroup.add(_enemy);
    }
}