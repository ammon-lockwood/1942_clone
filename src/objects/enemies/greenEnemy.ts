import { BotGreenInputComponent } from "../../components/input/bot-green-input-component";

export class GreenEnemy extends Phaser.Physics.Arcade.Sprite {
    inputComponent: BotGreenInputComponent;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        console.log('GreenEnemy x: ', x, ' y: ', y);
        super(scene, x, y, 'greenEnemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.anims.create({
            key: 'fly',
            frameRate: 20,
            frames: scene.anims.generateFrameNumbers('greenEnemy', { start: 0, end: 3 }),
            repeat: -1
        });
        this.play('fly');

        this.inputComponent = new BotGreenInputComponent();

        this.scene.events.on('update', this.update, this);
    }
}