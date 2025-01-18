import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    sea : Phaser.GameObjects.TileSprite;
    bullet: Phaser.GameObjects.Sprite;
    enemy: Phaser.GameObjects.Sprite;

    constructor ()
    {
        super('Game');
    }

    // @TODO: remove after building game.
    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('sea', 'sea.png');
        this.load.image('bullet', 'bullet.png');
        this.load.spritesheet('greenEnemy', 'enemy.png', {frameWidth: 32, frameHeight: 32});
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.sea = this.add.tileSprite(512, 384, 1024, 768, 'sea');

        this.enemy = this.add.sprite(512, 200, 'greenEnemy');
        this.enemy.anims.create({
            key: 'fly',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers('greenEnemy', { start: 0, end: 3 }),
            repeat: -1
        });
        this.enemy.play('fly');

        this.bullet = this.physics.add.sprite(512, 400, 'bullet');

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update(time: number, delta: number): void {
        this.sea.tilePositionY += 0.2;
    }
}
