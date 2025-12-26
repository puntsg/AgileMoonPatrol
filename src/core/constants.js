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

        SPAWN: {
            POS_X: 0,
            POS_Y: 0,

            TIMER_MIN: 1500,
            TIMER_MAX: 3000
        },

        TARGET: {
            POS_X: 200,
            POS_Y: 150
        }
    }
}