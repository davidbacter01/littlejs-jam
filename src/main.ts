import { engineInit, EngineObject, setCanvasFixedSize, tile, vec2, textureInfos, TileInfo, Color } from 'littlejsengine';
import { Player } from './objects/player';
import { Game } from './objects/game';
import { DiceRollScene } from './scenes/dice_roll';
// import { DiceRollScene } from './scenes/dice_roll';

const ASSETS = ['assets/d20_sheet.png'];

let game: Game | null = null;

setCanvasFixedSize(vec2(1200, 800));

function gameInit() {
  // Your game initialization code here
  console.log('Game Initialized');
  // const player = new Player();

  console.log(textureInfos);

  // const ob = new EngineObject(vec2(0), vec2(3), tile(0, 96, 0));
  // ob.color = new Color(1, 0, 0);
  // ob.renderOrder = 1;

  const diceScene = new DiceRollScene();
  diceScene.roll();

  // game = new Game({
  //   update: () => {
  //     // Scene update logic here
  //   }
  // }, player);

}

function gameUpdate() {
  // Your game update code here
  game?.update();
}

function gameUpdatePost() {
  // Your post-update code here
}

function gameRender() {
  // Your game rendering code here
}

function gameRenderPost() {
  // Your post-rendering code here
}

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ASSETS);