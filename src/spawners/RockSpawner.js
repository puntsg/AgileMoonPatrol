import { Spawner } from "./Spawner.js";
import { Rock } from "../entities/rock.js";
import { LEVEL } from "../core/constants.js";

export class RockSpawner extends Spawner {
    timer() {
        const delay = Phaser.Math.Between(
            LEVEL.ROCK.SPAWN.TIMER_MIN, LEVEL.ROCK.SPAWN.TIMER_MAX
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
        var _rock = this.scene.rocksGroup.getFirst(false);
        var _posX = LEVEL.ROCK.SPAWN.POS_X;
        var _posY = LEVEL.ROCK.SPAWN.POS_Y;

        if(!_rock)
        {
            _rock = new Rock(this.scene,_posX,_posY,'rock');
            this.scene.rocksGroup.add(_rock);
        }
        else
        {
            _rock.enableBody(true, _posX, _posY, true, true);
            _rock.setCircle((_rock.width * 0.5) / 2, _rock.width / 4, _rock.height / 2);
            _rock.body.setVelocityX(-LEVEL.SCROLL_SPEED.ENTITIES);
            
            // --- NUEVO: Resetear el flag de puntuación al reciclar ---
            _rock.passed = false;
        }
    }
}