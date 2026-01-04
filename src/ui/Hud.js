
import { EVENTS } from '../core/events.js';
export class Hud extends Phaser.Scene {
    constructor() {
      super({ key: 'hud' });
    }
  
    preload()
    { 
        this.load.setPath('assets/fonts/');
        this.load.font('UIFont','RetroGaming.ttf');
        this.load.setPath('assets/sprites/');
        this.load.image('blueBackground', 'Blue.png');
        this.load.image('crown', 'crown.png');
    }

    create()
    {
        this.add.image(0, 0, 'blueBackground').setOrigin(0, 0).setScrollFactor(0).setScale(24,2.5);
        this.scoreUIText = this.add.text(100, 10, 'Score: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffff00ff'
        }).setScrollFactor(0);
        this.healthUIText = this.add.text(100, 20, 'Lifes: 3', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffff00ff'
        }).setScrollFactor(0);
        this.timeUIText = this.add.text(100, 30, 'Time: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#da6a6aff'
        }).setScrollFactor(0);
        this.add.image(10, 40, 'crown').setScrollFactor(0).setScale(0.5);
        this.maxScoreUIText = this.add.text(200, 50, 'Max Score: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#da6a6aff'
        }).setScrollFactor(0);
        this.score = 0;
        this.setListeners();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeListeners, this);
        this.events.once(Phaser.Scenes.Events.DESTROY, this.removeListeners, this);
        this.currentHealth = 3;
        this.maxScore = parseInt(localStorage.getItem('maxScore'));
        this.game.events.emit(EVENTS.SET_MAXSCORE, this.value ?? this.maxScore);
    }
    removeListeners() {
        this.game.events.off(EVENTS.ADD_SCORE, this.onAddScore, this);
        this.game.events.off(EVENTS.UPDATE_LIFES, this.onRoverDamaged, this);
        this.game.events.off(EVENTS.UPDATE_TIME, this.onUpdateTime, this);
        this.game.events.off(EVENTS.SET_MAXSCORE, this.setMaxScore, this);
    }
    setListeners()
    {
        this.game.events.on(EVENTS.ADD_SCORE, this.onAddScore, this); 
        this.game.events.on(EVENTS.UPDATE_LIFES, this.onRoverDamaged, this); 
        this.game.events.on(EVENTS.UPDATE_TIME, this.onUpdateTime, this);
        this.game.events.on(EVENTS.SET_MAXSCORE, this.setMaxScore, this);
    }
    setMaxScore(_newMaxScore)
    {
        console.log('HUD - setMaxScore: '+_newMaxScore);
        this.maxScoreUIText.text = 'Max Score: '+('0'+_newMaxScore);
    }
    onUpdateTime(_newTime)
    {
        this.timeUIText.text = 'TIME ';
        if(_newTime < 10)
            this.timeUIText.text = this.timeUIText.text +'0';
        if(_newTime < 100)
            this.timeUIText.text = this.timeUIText.text +'0';
        this.timeUIText.text = this.timeUIText.text + _newTime;
    }
    onRoverDamaged(_newHealth)
    {
        console.log('HUD - onRoverDamaged: '+_newHealth);
        this.currentHealth = _newHealth;
        this.updateHealthUI();   
    }
    updateHealthUI()
    {
        this.healthUIText.text = 'Lifes'+('0'+this.currentHealth); 
    }

    onAddScore(_value)
    {
        this.score =_value;
        this.updateScoreUI();
    }

    updateScoreUI()
    {
        this.scoreUIText.text = 'Score'+('0'+this.score);
    }
}