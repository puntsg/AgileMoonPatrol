
import { EVENTS } from '../core/events.js';
export class Hud extends Phaser.Scene {
    constructor() {
      super({ key: 'hud' });
    }
  
    preload()
    { //Carga assets en memoria
        
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('UIFont','Retro Gaming.fnt');
    }

    create()
    {
        this.scoreUIText = this.add.text(10, 10, 'Score: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(1,0).setScrollFactor(0);
        this.score = 0;
        this.setListeners();
        this.healthUIText = this.add.text(10, 20, 'Lifes: 3', {
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
    }

    onRoverReady()
    {
        //this.currentHealth = this.maxHealth;
        //this.updateHealthUI();   
    }

    onRoverDamaged(_newHealth)
    {
        console.log(_newHealth);
        this.currentHealth = _newHealth;
        this.updateHealthUI();   
    }

    updateHealthUI()
    {
        //this.healthUI.setFrame(this.currentHealth);  
        this.healthUIText.text = 'x'+('0'+this.currentHealth).slice(-2); 
    }

    onAddScore(_value)
    {
        this.score +=_value;  
        //  console.log('HUD recibió GEM_COLLECTED, valor:', _value); 
        this.updateScoreUI();
    }

    updateScoreUI()
    {
        this.scoreUIText.text = 'x'+('0'+this.score).slice(-2);
    }
}