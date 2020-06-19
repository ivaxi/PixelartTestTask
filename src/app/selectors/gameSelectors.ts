import { Capital } from "../models/Capital";
import { Game } from "../models/game";
import { IStore } from "../redux/IStore";

export const randomCitySelector = (state: Pick<IStore, "citiesState">): Capital => {
  return state.citiesState.cities[Math.floor(Math.random() * state.citiesState.cities.length)];
};

export const nextGameSelector = (state: Pick<IStore, "gameState">): Game => {
  return state.gameState.nextGame;
};

export const currentGameSelector = (state: Pick<IStore, "gameState">): Game => {
  return state.gameState.game;
};