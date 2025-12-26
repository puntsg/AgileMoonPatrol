import { UFO } from "./UFO.js";
import { ENEMY } from "../../core/constants.js";

export class Balls extends UFO {

    /**
    * @param {number} _state
    * @param {number} _targetX
    * @param {number} _targetY
    * @param {number} _dir
    */

    constructor(params)
    {
        super(params, "Balls");
        this.anims.play("Balls_anim");
    }
}