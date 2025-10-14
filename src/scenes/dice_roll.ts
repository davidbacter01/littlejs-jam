import {
    EngineObject,
    tile,
    time,
    vec2,
    Vector2,
    TileInfo,
    randInt,
    UIText,
    Color,
    UIObject,
    mainCanvasSize
} from 'littlejsengine';

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
    private _resultDisplayTime: number = 2; // seconds
    private _startDisplayTime: number = 0;
    private _resultText: UIObject | null = null;

    constructor(diceCount: number = 3, resultDisplayTime: number = 2) {
        super();
        this._resultDisplayTime = resultDisplayTime;

        for (let i = 0; i < diceCount; i++) {
            this.children.push(new Dice(vec2((i * 4) - 5, 0), vec2(5)));
        }
    }

    get isRolling() {
        return this.children.some(die => (die as Dice).isRolling);
    }

    roll() {
        const result = [];

        for (const die of this.children) {
            die.rollDice();
            result.push(die.result);
        }

        return result;
    }

    update(): void {
        if (!this.isRolling && this._startDisplayTime === 0) {
            this._startDisplayTime = time;
            // start display result
            let text = 'Result: ';
            let total = 0;
            for (const die of this.children) {
                text += die.result + '+';
                total += die.result;
            }
            text = text.slice(0, -1); // Remove trailing '+'
            text += `=${total}`;
            console.log(text);
            const pos = vec2(mainCanvasSize.x / 2 - 10, mainCanvasSize.y / 2 - 100);
            this._resultText = new UIObject(pos, vec2(500, 80));
            this._resultText.children.push(new UIText(pos, vec2(500, 80), text));
            this._resultText.color = new Color(1, 0, 0, 1);
        } else if (!this.isRolling && time - this._startDisplayTime > this._resultDisplayTime) {
            this.destroy();
        }
    }

    render(): void {
        return;
    }
}