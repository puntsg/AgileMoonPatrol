import { EVENTS } from '../core/events.js';
export class Hud extends Phaser.Scene {
    constructor() {
      super({ key: 'hud' });
    }
  
    create()
    {
        this.add.image(0, 0, 'blueBackground').setOrigin(0, 0).setScrollFactor(0).setScale(24,2.5);
        this.add.image(210, 5, 'cyanBackground').setOrigin(0, 0).setScrollFactor(0).setScale(12.5,1.5);
        this.add.image(210, 55, 'progrssBar').setOrigin(0, 0).setScrollFactor(0).setScale(1.5,1);
        this.pointText = this.add.text(210, 10, 'POINT', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#000000ff'
        }).setScrollFactor(0);

        

        this.progressBarFill = this.add.image(210, 65, 'barFill').setOrigin(0, 0).setScrollFactor(0).setScale(0,.15);
        //Max Scale 12.35
        
        this.dot1 = this.add.image(390, 15, 'blackDot').setOrigin(0, 0).setScrollFactor(0).setScale(.25,.25);
        this.dot2 = this.add.image(390, 25, 'blackDot').setOrigin(0, 0).setScrollFactor(0).setScale(.25,.25);
        this.dot3 = this.add.image(390, 35, 'blackDot').setOrigin(0, 0).setScrollFactor(0).setScale(.25,.25); 
        this.cautionText = this.add.text(400, 10, 'CAUTION!', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#000000ff'
        }).setScrollFactor(0);
        this.rdot1 = this.add.image(390, 15, 'redDot').setOrigin(0, 0).setScrollFactor(0).setScale(.25,.25);
        this.rdot1.setVisible(false);
        this.cautionText.setVisible(false);
        this.cautionTimer = null;

        this.timeUIText = this.add.text(210, 25, 'Time: 0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#da6a6aff'
        }).setScrollFactor(0);

        this.scoreUIText = this.add.text(50, 40, '1P - 000000', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffff00ff'
        }).setScrollFactor(0);

        this.add.image(60, 25, 'crown').setScrollFactor(0).setScale(1.5);
        this.maxScoreUIText = this.add.text(75, 15, '0', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#da6a6aff'
        }).setScrollFactor(0);

        this.roverIcon = this.add.sprite(660, 35, 'rover', 0).setScrollFactor(0).setScale(.75);
        this.roverIcon.setFrame(0);  
        this.healthUIText = this.add.text(680, 25, '3', {
            fontFamily: 'UIFont',
            fontSize: '16px',
            color: '#ffff00ff'
        }).setScrollFactor(0); 
        
        
        this.score = 0;
        this.setListeners();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeListeners, this);
        this.events.once(Phaser.Scenes.Events.DESTROY, this.removeListeners, this);
        this.currentHealth = 3;
        this.maxScore = parseInt(localStorage.getItem('maxScore'));
        this.setMaxScore(this.maxScore);
        this.game.events.emit(EVENTS.SET_MAXSCORE, this.value ?? this.maxScore);
        this.currentCheckpointChar = '';
    }
    removeListeners() {
        this.game.events.off(EVENTS.ADD_SCORE, this.onAddScore, this);
        this.game.events.off(EVENTS.UPDATE_LIFES, this.onRoverDamaged, this);
        this.game.events.off(EVENTS.UPDATE_TIME, this.onUpdateTime, this);
        this.game.events.off(EVENTS.SET_MAXSCORE, this.setMaxScore, this);
        this.game.events.off(EVENTS.UPDATE_CHECKPOINT, this.onUpdateCheckpoint, this);
        this.game.events.off(EVENTS.UPDATE_CHECKPOINT_PROGRESS, this.onUpdateCheckpointProgress, this);
        this.game.events.off(EVENTS.ON_ENEMY_SPAWNED, this.onEnemySpawned, this);
    }
    setListeners()
    {
        this.game.events.on(EVENTS.ADD_SCORE, this.onAddScore, this); 
        this.game.events.on(EVENTS.UPDATE_LIFES, this.onRoverDamaged, this); 
        this.game.events.on(EVENTS.UPDATE_TIME, this.onUpdateTime, this);
        this.game.events.on(EVENTS.SET_MAXSCORE, this.setMaxScore, this);
        this.game.events.on(EVENTS.UPDATE_CHECKPOINT, this.onUpdateCheckpoint, this);
        this.game.events.on(EVENTS.UPDATE_CHECKPOINT_PROGRESS, this.onUpdateCheckpointProgress, this);
        this.game.events.on(EVENTS.ON_ENEMY_SPAWNED, this.onEnemySpawned, this);
    }
    onEnemySpawned(_enemy)
    {
        //console.log('HUD - onEnemySpawned: '+_enemy);
        this.cautionText.setVisible(true);
        this.rdot1.setVisible(true);
        if (this.cautionTimer) {
            this.cautionTimer.remove(false);
            this.rdot1.setVisible(false);
            this.cautionTimer = null;
        }
        this.cautionTimer = this.time.delayedCall(3000, () => {
            if (this.cautionText) 
                this.cautionText.setVisible(false);
            this.cautionTimer = null;
        });
    }
    onUpdateCheckpointProgress(_progress)
    {
        //console.log('HUD - onUpdateCheckpointProgress: '+_progress);
        this.progressBarFill.setScale(12.35 * _progress,.15);
    }
    onUpdateCheckpoint(_newCheckpoint)
    {
        this.currentCheckpointChar = String.fromCharCode(64+_newCheckpoint);
        this.pointText.text = 'POINT ' + this.currentCheckpointChar;
        console.log('HUD - onUpdateCheckpoint: '+ String.fromCharCode(64+_newCheckpoint));
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
        this.healthUIText.text = this.currentHealth; 
    }

    onAddScore(_value)
    {
        this.score =_value;
        this.updateScoreUI();
    }

    updateScoreUI()
    {
        this.scoreUIText.text = '1P - ';
        if(this.score < 10)
            this.scoreUIText.text = this.scoreUIText.text +'00000';
        else if(this.score < 100)
            this.scoreUIText.text = this.scoreUIText.text +'0000';
        else if(this.score < 1000)
            this.scoreUIText.text = this.scoreUIText.text +'000';
        else if(this.score < 10000)
            this.scoreUIText.text = this.scoreUIText.text +'00';
        else if(this.score < 100000)
            this.scoreUIText.text = this.scoreUIText.text +'0';
        this.scoreUIText.text = this.scoreUIText.text + this.score;
    }
    setMaxScore(_newMaxScore)
    {
        console.log('HUD - setMaxScore: '+_newMaxScore);
        if(_newMaxScore < 10)
            this.maxScoreUIText.text = '00000'+_newMaxScore;
        else if(_newMaxScore < 100)
            this.maxScoreUIText.text = '0000'+_newMaxScore;
        else if(_newMaxScore < 1000)
            this.maxScoreUIText.text = '000'+_newMaxScore;
        else if(_newMaxScore < 10000)
            this.maxScoreUIText.text = '00'+_newMaxScore;
        else if(_newMaxScore < 100000)
            this.maxScoreUIText.text = '0'+_newMaxScore;
        else
            this.maxScoreUIText.text = _newMaxScore;
    }
}