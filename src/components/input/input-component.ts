/**
 * A base component for handling player or AI input.
 * For handling player input in a Phaser 3 game, this class
 * should be extended to support the built in input methods from Phaser,
 * such as keyboard, gamepad, touch, etc. For an example, please see
 * the `KeyboardInputComponent` class.
 *
 * For AI, this class can be extended to support custom logic for the AI
 * to update the inputs to support the movement that is needed. For an
 * example, please see the `BotFighterInputComponent` class.
 */
export class InputComponent {
    _up: boolean;
    _down: boolean;
    _left: boolean;
    _right: boolean;
    _shoot: boolean;
  
    constructor() {
      this.reset();
    }
  
    get leftIsDown(): boolean {
      return this._left;
    }
  
    get rightIsDown(): boolean {
      return this._right;
    }

    get downIsDown(): boolean {
      return this._down;
    }

    get upIsDown(): boolean {
      return this._up;
    }

    get shootIsDown(): boolean {
      return this._shoot;
    }
  
    /**
     * Resets all of the inputs back to their default values of `false`.
     */
    reset(): void {
      this._up = false;
      this._down = false;
      this._right = false;
      this._left = false;
      this._shoot = false;
    }
  }