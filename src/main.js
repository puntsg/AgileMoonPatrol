/// <reference path="./types/phaser.d.ts" />

import { title } from "./scenes/title.js"
import { gameState } from "./scenes/gameState.js"

var config = 
{
    type:Phaser.AUTO,
    width:720,
    height:480,
    scene:[title,gameState],
    render:{
        pixelArt:true
    },
    physics:{
        default:'arcade',
        arcade:{
            debug:true,
            gravity:{
                y:98.1
            }
        }
    }
}

var game = new Phaser.Game(config)