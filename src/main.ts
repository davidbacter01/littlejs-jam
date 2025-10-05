import { engineInit } from 'littlejsengine';
import { Player } from './objects/player';

function gameInit() {
  // Your game initialization code here
  console.log('Game Initialized');
  const player = new Player();
}

function gameUpdate() {
  // Your game update code here
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

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);