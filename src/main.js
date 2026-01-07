/// <reference path="./types/phaser.d.ts" />

import { SplashScreen } from "./scenes/SplashScreen.js"
import { MainGame } from "./scenes/MainGame.js"
import { Hud } from "./ui/Hud.js"
import { GameOver } from "./scenes/GameOver.js"
import { WinScreen } from "./scenes/WinScreen.js"

export const config = 
{
    type:Phaser.AUTO,
    width:720,
    height:480,
    scene:[SplashScreen, MainGame, Hud, GameOver, WinScreen],
    render:{
        pixelArt:true
    },
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:98.1
            }
        }
    }
}

var game = new Phaser.Game(config)