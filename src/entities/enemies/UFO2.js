import { UFO } from "./UFO.js";
import { ENEMY } from "../../core/constants.js";

export class UFO2 extends UFO {

    /**
    * @param {number} _state
    * @param {number} _targetX
    * @param {number} _targetY
    * @param {number} _dir
    */

    constructor(params)
    {
        super(params, "UFO2");
        this.anims.play("UFO2_anim");
    }
}