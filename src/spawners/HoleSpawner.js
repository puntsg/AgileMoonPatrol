import { Spawner } from "./Spawner.js";
import { LEVEL } from "../core/constants.js";
import { Hole } from "../entities/Hole.js";

export class HoleSpawner extends Spawner {
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

        var _hole = this.scene.holesGroup.getFirst(false);
        var _posX = LEVEL.HOLE.SPAWN.POS_X;
        var _posY = LEVEL.HOLE.SPAWN.POS_Y;

        if (!_hole) {
            _hole = new Hole(this.scene, _posX, _posY, 'hole');
            this.scene.holesGroup.add(_hole);
        }
        else {
            _hole.enableBody(true, _posX, _posY, true, true);
        }
        _hole.body.setAllowGravity(false);
        _hole.body.setVelocityX(-LEVEL.SCROLL_SPEED.ENTITIES);
    }

    spawnAt(x, y) {
        var _hole = this.scene.holesGroup.getFirst(false);
        var _posX = x;
        var _posY = y;

        if (!_hole) {
            _hole = new Hole(this.scene, _posX, _posY, 'hole');
            this.scene.holesGroup.add(_hole);
        }
        else {
            _hole.enableBody(true, _posX, _posY, true, true);
            _hole.setCircle((_hole.width * 0.5) / 2, _hole.width / 4, _hole.height / 2);
        }
        _hole.body.setAllowGravity(false);
        _hole.body.setVelocityX(-LEVEL.SCROLL_SPEED.ENTITIES);
    }
}