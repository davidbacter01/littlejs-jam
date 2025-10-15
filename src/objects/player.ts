import { EngineObject, Vector2, vec2, tile, time, keyDirection, cameraPos } from "littlejsengine";

const PLAYER_SPRITE_SHEET = 1; // Assuming the player texture is at index 1 in the textureInfos
const PLAYER_FRAME_SIZE = vec2(32); // Assuming each frame is 32/32 pixels


export class Player extends EngineObject {
    private spriteSheetFrames = {
        down: [0, 1, 2],
        left: [3, 4, 5],
        right: [6, 7, 8],
        up: [9, 10, 11]
    };

    constructor(position: Vector2) {
        super(position, vec2(2), tile(0, PLAYER_FRAME_SIZE, PLAYER_SPRITE_SHEET), 0);
        this.setCollision();
        this.renderOrder = 1;
    }

    update(): void {
        // Player update logic here
        super.update();

        // apply movement controls
        const moveInput = keyDirection().clampLength(1).scale(.2);
        if (!moveInput.x && !moveInput.y) {
            this.velocity = vec2(0);
        }
        this.velocity = this.velocity.add(moveInput);

        const direction = this._getMovingDirection();
        console.log('Direction:', direction);

        if (direction) {
            const frameArray = this.spriteSheetFrames[direction];
            const frameIndex = Math.floor(time * 10) % frameArray.length;
            const frame = frameArray[frameIndex];
            this.tileInfo = tile(frame, PLAYER_FRAME_SIZE, PLAYER_SPRITE_SHEET);
        } else {
            // If not moving, set to the first frame of the last direction faced
            const lastDirection = Object.keys(this.spriteSheetFrames).find(dir => this.spriteSheetFrames[dir as keyof typeof this.spriteSheetFrames].includes(this.tileInfo.pos.x * this.tileInfo.pos.y));
            if (lastDirection) {
                const frame = this.spriteSheetFrames[lastDirection as keyof typeof this.spriteSheetFrames][1];
                this.tileInfo = tile(frame, PLAYER_FRAME_SIZE, PLAYER_SPRITE_SHEET);
            } else {
                this.tileInfo = tile(this.spriteSheetFrames.down[1], PLAYER_FRAME_SIZE, PLAYER_SPRITE_SHEET); // Default to down-facing idle
            }
        }

        // move camera with player
        cameraPos.set(this.pos.x, this.pos.y);
    }

    private _getMovingDirection(): 'up' | 'down' | 'left' | 'right' | null {
        if (this.velocity.lengthSquared() < 0.01) return null; // Not moving
        const angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (angle >= -Math.PI / 4 && angle < Math.PI / 4) return 'right';
        if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) return 'up';
        if (angle >= -3 * Math.PI / 4 && angle < -Math.PI / 4) return 'down';
        return 'left';
    }
}