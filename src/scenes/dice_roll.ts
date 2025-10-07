import { EngineObject, tile, time, vec2, Vector2, TileInfo, randInt } from 'littlejsengine';

const FRAME_SIZE = vec2(96, 96);
const DICE_TEXTURE_SHEET = 0; // Assumes the dice sprite sheet is the first texture loaded

export class Dice extends EngineObject {
    startingFrame = 0;
    rollDuration = 2; // seconds
    numberOfFrames = 20; // total frames in the sprite sheet
    rollStartTime = 0;
    isRolling = false;
    result = 1;

    constructor(position: Vector2, size: Vector2) {
        super(position, size, tile(0, FRAME_SIZE, DICE_TEXTURE_SHEET));
    }

    rollDice() {
        this.rollDuration = randInt(2, 6);
        this.startingFrame = randInt(0, this.numberOfFrames - 1);
        this.result = randInt(1, 20);
        this.isRolling = true;
        console.log('result: ', this.result)
    }

    update(): void {
        if (!this.isRolling) {
            this.tileInfo = this._getFrameAtIndex(this.result - 1);
            this.angle = 0;
            this.pos.y = 0;
            return;
        }

        const rollTotalSpins = 5 + randInt(0, 6); // 5–10 full revolutions

        const elapsed = time - this.rollStartTime;
        const t = Math.min(1, elapsed / this.rollDuration);
        // Easing (fast → slow)
        const eased = 1 - Math.pow(1 - t, 3);
        // How many frames we’ve advanced (includes full revolutions)
        const totalFrameAdvance = rollTotalSpins * this.numberOfFrames + (this.result - 1);
        const frameFloat = totalFrameAdvance * eased;
        const frameIndex = Math.floor(frameFloat) % this.numberOfFrames;

        this.tileInfo = this._getFrameAtIndex(frameIndex);
        // Cosmetic spin + bounce
        this.angle = eased * Math.PI * 8;
        this.pos.y = Math.sin(eased * Math.PI * 10) * 0.25 * (1 - eased);

        if (t >= 1) {
            this.isRolling = false;
            this.tileInfo = this._getFrameAtIndex(this.result - 1);
            this.angle = 0;
            this.pos.y = 0;
        }
    }

    private _getFrameAtIndex(index: number): TileInfo {
        return tile(index, FRAME_SIZE, DICE_TEXTURE_SHEET);
    }
}

export class DiceRollScene extends EngineObject {
    isRolling: boolean = false;
    dice: Dice[] = [];
    constructor(diceCount: number = 3) {
        super();
        for (let i = 0; i < diceCount; i++) {
            const die = new Dice(vec2((i * 4) - 5, 0), vec2(5));
            this.dice.push(die);
        }
    }

    roll() {
        for (const die of this.dice) {
            die.rollDice();
        }
    }

    render(): void {
        return;
    }
}