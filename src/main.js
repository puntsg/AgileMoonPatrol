/// <reference path="./types/phaser.d.ts" />

import { SplashScreen } from "./scenes/SplashScreen.js"
import { MainGame } from "./scenes/MainGame.js"

var config = 
{
    type:Phaser.AUTO,
    width:720,
    height:480,
    scene:[SplashScreen,MainGame],
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