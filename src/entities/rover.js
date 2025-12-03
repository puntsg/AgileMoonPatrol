import { bulletPrefab } from "../entities/bulletPrefab.js"; 
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
        this.currentScene = _scene;
        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.pressedShoot = false;
    }
    preload(){
        
    }
    create(){

    }
    preUpdate(){
        if(this.body.touching.down){
            if(this.currentScene.cursors.right.isDown){
                if(this.body.velocity.x < 0)
                    this.body.velocity.x += 2*2;
                else if(this.body.velocity.x < 100)
                    this.body.velocity.x +=2;
            }
            else if(this.currentScene.cursors.left.isDown){
                if(this.body.velocity.x > 0)
                    this.body.velocity.x -=2*2;
                else if(this.body.velocity.x > -100)
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
            if (this.currentScene.cursors.up.isDown)
            {
                this.body.setVelocityY(-75);
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
        if(this.x > 360){
            this.x = 360;
            this.body.setVelocityX(0);
        }
        if(this.currentScene.space.isDown && !this.pressedShoot){
            this.pressedShoot = true;
            this.createBullet(0,-50);
            this.createBullet(50,0);
            //console.log("Piu");
        }
        else if(this.currentScene.space.isUp)
            this.pressedShoot = false;
    }
    createBullet(xSpeed,ySpeed){
        
        var _bullet = this.currentScene.bulletPool.getFirst(false);
        if(!_bullet){
            //console.log("Creating Bullet");
            _bullet = new bulletPrefab(this.currentScene,this.x,this.y,'bullet');
            this.currentScene.bulletPool.add(_bullet);
        }else{
            _bullet.setActive(true);
            _bullet.body.reset(this.x, this.y);
        }
        _bullet.body.setAllowGravity(false);
        _bullet.body.setVelocityX(xSpeed);
        _bullet.body.setVelocityY(ySpeed);
    }
}