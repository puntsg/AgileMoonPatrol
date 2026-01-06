import { config } from "../main.js";
import { ENEMY, EXPLOSION } from "../core/constants.js";

export class SplashScreen extends Phaser.Scene {
    constructor(){
        super({key:"SplashScreen"});
    }

    preload(){
        this.load.image('bg', '../../assets/sprites/BG.png');
        this.load.image('fg', '../../assets/sprites/FG1.png');
        this.load.image('ground','../../assets/sprites/ground.png');
        this.load.image('title', '../../assets/sprites/Title.png');

        this.load.image('blueBackground', '../../assets/sprites/Blue.png');
        this.load.image('cyanBackground', '../../assets/sprites/Cyan.png');
        this.load.image('crown', '../../assets/sprites/crown.png');

        this.load.image('bullet', '../../assets/sprites/spr_bullet_0.png');
        this.load.image('hole', '../../assets/sprites/hole.png');
        this.load.spritesheet('rover','../../assets/sprites/Ship.png',{frameWidth: 34, frameHeight:23});
        this.load.spritesheet('enemy_bullet','../../assets/sprites/Enemy_Bullet_spritesheet.png',{frameWidth: 6, frameHeight:6});
        this.load.spritesheet('rock', '../../assets/sprites/Rocks.png', {frameWidth: 15, frameHeight:16}); 
        
        // Carga de la Explosión
        this.load.spritesheet(EXPLOSION.SPRITE.name, '../../assets/sprites/explosion.png', {
            frameWidth: EXPLOSION.SPRITE.width,
            frameHeight: EXPLOSION.SPRITE.height
        });

        ENEMY.SPRITES.forEach((obj) => {
            this.load.spritesheet(
                obj.name, 
                `../../assets/sprites/${obj.name}_spritesheet.png`,
                {frameWidth: obj.width, frameHeight: obj.height}
            );
        });

        this.load.font('UIFont','../../assets/fonts/RetroGaming.ttf');
    }

    create(){
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0).setScrollFactor(0);
        this.fg = this.add.tileSprite(0, 0, config.width, 64, 'fg').setOrigin(0).setScale(4);
        this.fg.y = config.height - (this.fg.height * 4) + 50;

        this.title = this.add.image(config.width/2, config.height/2 - 60, 'title');
        
        this.tweens.add({
            targets: this.title,
            scale: 1.05,
            y: this.title.y - 10,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const startText = this.add.text(config.width/2, config.height/2 + 80, 'PRESS 1 TO START', { 
            fontFamily: 'Courier', 
            fontSize: '28px', 
            color: '#00ff00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 300, 
            yoyo: true,
            repeat: -1
        });

        const highScore = localStorage.getItem('maxScore') || 0;
        this.add.text(config.width/2, config.height - 30, `TOP RECORD: ${highScore}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }
    
    update(time, delta){
        this.bg.tilePositionX += 0.5;
        this.fg.tilePositionX += 2.0;

        if(this.one.isDown){
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('MainGame');
            });
        }
    }
}