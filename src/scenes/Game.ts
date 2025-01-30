import { Scene } from 'phaser';
import { GreenEnemy } from '../objects/enemies/greenEnemy';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    sea: Phaser.GameObjects.TileSprite;
    bullets: Bullets;
    nextShotAt: number = 0;
    shotdelay: number = 100;
    enemy: Phaser.Physics.Arcade.Sprite;
    player: Phaser.Physics.Arcade.Sprite;
    playerSpeed: number;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

    constructor() {
        super('Game');
    }

    // @TODO: remove after building game.
    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('sea', 'sea.png');
        this.load.image('bullet', 'bullet.png');
        this.load.spritesheet('greenEnemy', 'enemy.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('explosion', 'explosion.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('explosionSound', 'explosion.ogg');
        this.load.spritesheet('player', 'player.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.sea = this.add.tileSprite(512, 384, 1024, 768, 'sea');

        this.enemy = new GreenEnemy(this, 512, 23);

        this.bullets = new Bullets(this);

        this.cursorKeys = this.input?.keyboard?.createCursorKeys() ?? null;

        this.player = this.physics.add.sprite(512, 550, 'player');
        this.playerSpeed = 300;
        this.player.setOrigin(0.5, 0.5);
        this.player.setVelocity(300);
        this.player.setCollideWorldBounds(true);
        this.player.anims.create({
            key: 'fly',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            repeat: -1
        });
        this.player.play('fly');
    }

    update(time: number, delta: number): void {
        this.sea.tilePositionY += 0.2;

        // check for collisions with bullets and enemies
        this.physics.overlap(this.bullets, this.enemy, this.enemyHit, null, this);

        this.player.setVelocity(0);

        if (this.cursorKeys) {
            if (this.cursorKeys.left.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
            } else if (this.cursorKeys.right.isDown) {
                this.player.setVelocityX(this.playerSpeed);
            }

            if (this.cursorKeys.up.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
            } else if (this.cursorKeys.down.isDown) {
                this.player.setVelocityY(this.playerSpeed);
            }

            if (this.cursorKeys.space.isDown) {
                if (this.nextShotAt > this.time.now) {
                    return;
                }

                this.nextShotAt = this.time.now + this.shotdelay;

                this.bullets.fireBullet(this.player.x, this.player.y - 20);
            }
        }

    }

    enemyHit(bullet: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
        console.log('enemy hit');
        bullet.destroy();
        enemy.destroy();
        console.log('enemy x: ', enemy.x, ' y: ', enemy.y);
        var explosion = this.physics.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.setOrigin(0.5, 0.5);
        explosion.anims.create({
            key: 'boom',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }),
            frameRate: 15,
            hideOnComplete: true
        });
        explosion.play('boom');

        var explosionSound = this.sound.add('explosionSound');
        explosionSound.play();
    }

}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
    }

    fire(x: number, y: number) {
        this.body?.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-400);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 100,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet(x: number, y: number) {
        const bullet = this.getFirstDead(false);

        if (bullet) {
            bullet.fire(x, y);
        }
    }
}