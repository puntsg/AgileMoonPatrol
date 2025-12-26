import {UFO} from "../entities/enemies/UFO.js"
import {UFO2} from "../entities/enemies/UFO2.js"
import {Balls} from "../entities/enemies/Balls.js"

export const LEVEL = {
    SCROLL_SPEED: {
        ENTITIES: 200,
        BACKGROUND: 1.5,
        FOREGROUND: 0.625
    },

    ROCK: {
        SPAWN: {
            POS_X: 750,
            POS_Y: 300,

            TIMER_MIN: 1500,
            TIMER_MAX: 3000
        }
    }
}

export const CHECKPOINT = {
    SEPARATION: 2000
}
export const ROVER = {
    ACCELERATION: 2,
    DECELERATION: 1.5,
    MAX_VELOCITY: 100,
    JUMPFORCE: -75
}
export const BULLET = {
    VERTICALSPEED: -150,
    HORIZONTALSPEED: 150
}
export const ENEMY = {
    TYPE_COUNT: 3,

    SPRITES: [
        {name: "UFO", width: 18, height: 16, frames: 3}, 
        {name: "UFO2", width: 16, height: 16, frames: 1}, 
        {name: "Balls", width: 16, height: 16, frames: 3},
    ],

    UFO: {
        SPEED: 50,
        STATES: {
            ARRIVING: 0,
            PATROLLING: 1,
            STEERING: 2
        },
        ARRIVING_TOLERANCE: 10,
        PATROLLING_AMPLITUDE: 50,

        TARGET: {
            POS_X: 200,
            POS_Y: 150
        }
    },

    SPAWNING: {
        POS_X: 0,
        POS_Y: 0,

        TIMER_MIN: 10000,
        TIMER_MAX: 15000,

        BURST_TIMER_MIN: 500,
        BURST_TIMER_MAX: 2500,

        BURST_ENEMIES_MIN: 3,
        BURST_ENEMIES_MAX: 7
    }
}