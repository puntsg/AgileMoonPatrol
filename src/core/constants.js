export const LEVEL = {
    SCROLL_SPEED: {
        ENTITIES: 200,
        BACKGROUND: 1.5,
        FOREGROUND: 0.625
    }
}

export const CHECKPOINT = {
    SEPARATION: 2000
}

export const ENEMY = {
    UFO: {
        SPEED: 50,
        STATES: {
            ARRIVING: 0,
            PATROLLING: 1,
            STEERING: 2
        },
        ARRIVING_TOLERANCE: 10,
        PATROLLING_AMPLITUDE: 50
    }
}