import { Capital } from "./Capital";
import { ICapitalWeather } from "./Weather";

export enum GameStateEnum {
  "finished",
  "started"
}

export class GameResult {
  public status: GameStateEnum;
}

export class Game {
  public id: string;
  public city1: Capital;
  public city2: Capital;
  public correctAnswer: Capital;
  public gameState: GameResult;
  public userAnswer: Capital;
  public weather1: ICapitalWeather;
  public weather2: ICapitalWeather;
  constructor() {
    this.gameState =  new GameResult();
    this.gameState.status = GameStateEnum.started;
  }

}

export type GameToSave = Omit<Game, "id">;