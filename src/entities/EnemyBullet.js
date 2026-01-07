
export class EnemyBullet extends Phaser.Physics.Arcade.Sprite {

    /**
     * @param {boolean} destroyGround
     */

    constructor(_scene, posX, posY, _sprite = 'enemy_bullet', _destroyGround) {
        super(_scene, posX, posY, _sprite);
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.destroyGround = _destroyGround;

        this.setScale(3);
    }

    preUpdate() {
        if (this.body.velocity.y > 150) {
            this.anims.play('enemy_bullet_vertical');
            return;
        }
        else if (this.body.velocity.y > 50) {
            this.anims.play('enemy_bullet_diagonal');
            return;
        } else {
            this.anims.play('enemy_bullet_horizontal');
        }

    }
}