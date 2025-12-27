
import { EVENTS } from '../core/events.js';
export class Hud extends Phaser.Scene {
    constructor() {
      super({ key: 'hud' });
    }
  
    preload()
    { 
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('UIFont','Retro Gaming.fnt');
    }

    create()
    {
        this.scoreUIText = this.add.text(100, 10, 'Score: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(1,0).setScrollFactor(0);
        this.healthUIText = this.add.text(100, 20, 'Lifes: 3', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(1,0).setScrollFactor(0);
        this.timeUIText = this.add.text(100, 30, 'Time: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(1,0).setScrollFactor(0);
        this.score = 0;
        this.setListeners();
        this.currentHealth = 3;
    }

    setListeners()
    {
        this.game.events.on(EVENTS.ADD_SCORE, this.onAddScore, this); 
        this.game.events.on(EVENTS.UPDATE_LIFES, this.onRoverDamaged, this); 
        this.game.events.on(EVENTS.UPDATE_TIME, this.onUpdateTime, this);
    }
    onUpdateTime(_newTime)
    {
        this.timeUIText.text = 'Time: '+('0'+_newTime).slice(-2);
    }
    onRoverDamaged(_newHealth)
    {
        console.log('HUD - onRoverDamaged: '+_newHealth);
        this.currentHealth = _newHealth;
        this.updateHealthUI();   
    }
    updateHealthUI()
    {
        this.healthUIText.text = 'Lifes'+('0'+this.currentHealth).slice(-2); 
    }

    onAddScore(_value)
    {
        this.score +=_value;
        this.updateScoreUI();
    }

    updateScoreUI()
    {
        this.scoreUIText.text = 'Score'+('0'+this.score).slice(-2);
    }
}