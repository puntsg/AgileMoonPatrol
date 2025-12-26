import { Bullet } from "../entities/Bullet.js"; 
import * as CONSTANTS from "../core/constants.js";
import { config } from "../main.js";
export class Rover extends Phaser.Physics.Arcade.Sprite{
    /**
     * @param {Phaser.Scene} _scene
     * @param {number} _speed
     * @param {number} _posX
     * @param {number} _posY
     * @param {string} _texture
     */
    constructor(_scene,_posX,_posY,_texture){
        super(_scene,_posX,_posY,_texture);
        this._scene = _scene;
        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.pressedShoot = false;
        
        this.jumpSound = _scene.sound.add('jump'); 
        this.shotSound = _scene.sound.add('shot');
    }
    preload(){
        
    }
    create(){

    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if(this.body.touching.down){
            if(this._scene.cursors.right.isDown){
                if(this.body.velocity.x < 0)
                    this.body.velocity.x += 2*2;
                else if(this.body.velocity.x < CONSTANTS.ROVER.MAX_VELOCITY)
                    this.body.velocity.x +=2;
            }
            else if(this._scene.cursors.left.isDown){
                if(this.body.velocity.x > 0)
                    this.body.velocity.x -=2*2;
                else if(this.body.velocity.x > -CONSTANTS.ROVER.MAX_VELOCITY)
                    this.body.velocity.x -=2;
            }
            else{
                if(this.body.velocity.x > 0){
                    this.body.velocity.x-=1.5;
                    if(this.body.velocity.x < 0)
                        this.body.setVelocityX(0);
                }
                if(this.body.velocity.x < 0){
                    this.body.velocity.x+=1.5;
                    if(this.body.velocity.x > 0)
                        this.body.setVelocityX(0);
                }
            }
            if (this._scene.cursors.up.isDown)
            {
                this.body.setVelocityY(CONSTANTS.ROVER.JUMPFORCE);
                this.jumpSound.play();
            }
        }else{
            if(this.body.velocity.x > 0){
                this.body.velocity.x-=.5;
                if(this.body.velocity.x < 0)
                    this.body.setVelocityX(0);
            }
            else if(this.body.velocity.x < 0){
                this.body.velocity.x+=.5;
                if(this.body.velocity.x > 0)
                    this.body.setVelocityX(0);
            }
        }
        if(this.x > config.width/2){
            this.x = config.width/2;
            this.body.setVelocityX(0);
        }
        
        if(this._scene.space.isDown && !this.pressedShoot){
            this.pressedShoot = true;
            this.createBullet(0,CONSTANTS.BULLET.VERTICALSPEED);
            this.createBullet(CONSTANTS.BULLET.HORIZONTALSPEED,0);
            this.shotSound.play();
        }
        else if(this._scene.space.isUp)
            this.pressedShoot = false;
    }
    createBullet(xSpeed,ySpeed){
        var _bullet = this._scene.bulletGroup.getFirst(false);
        if(!_bullet){
            _bullet = new Bullet(this._scene,this.x,this.y,'bullet');
            this._scene.bulletGroup.add(_bullet);
        }else{
            _bullet.enableBody(true, this.x, this.y, true, true);
        }
        _bullet.body.setAllowGravity(false);
        _bullet.body.setVelocityX(xSpeed);
        _bullet.body.setVelocityY(ySpeed);
    }
}