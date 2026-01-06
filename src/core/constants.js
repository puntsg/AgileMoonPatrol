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
            POS_Y: 350,

            TIMER_MIN: 1250,
            TIMER_MAX: 4500
        }
    },

    HOLE: {
        SPAWN: {
            POS_X: 750,
            POS_Y: 360,

            TIMER_MIN: 1500,
            TIMER_MAX: 3000
        }
    }
}

export const CHECKPOINT = {
    SEPARATION: 2000,
    ACCELERATION: 1
}

export const SCORE = {
    ENEMY_KILL: 10,
    ROCK_PASSED: 50 
}

// --- ACTUALIZADO: Nuevas dimensiones para el sprite de 125x41 (5 frames) ---
export const EXPLOSION = {
    SPRITE: { name: 'explosion', width: 25, height: 41 },
    ANIM: 'explosion_anim' // Una sola animación para todo
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
        },

        SHOOTING: {
            TIMER_MIN: 3000,
            TIMER_MAX: 7000,

            SPEED_X: 100,
            SPEED_Y: -50
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