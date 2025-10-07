import type { Player } from './player';
import type { IScene } from './types';

export class Game {
    scene: IScene;
    player: Player;

    constructor(scene: IScene, player: Player) {
        this.scene = scene;
        this.player = player;
    }

    update() {
        this.scene.update();
        this.player.update();
    }
}