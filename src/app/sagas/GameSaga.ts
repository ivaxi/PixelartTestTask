import autobind from "autobind-decorator";
import { all, AllEffect, call, CallEffect, fork, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from "redux-saga/effects";
import {getType} from "typesafe-actions";

import { Capital } from "../models/Capital";
import { Game, GameStateEnum } from "../models/game";
import { ICapitalWeather } from "../models/Weather";
import { currentGameSelector, nextGameSelector, randomCitySelector } from "../selectors/gameSelectors";
import { weatherApi } from "./../api/WeatherApi";
import {BaseSaga} from "./BaseSaga";

import { AddResults, cleanResults, getResults } from "../Database/dixieDb";
import * as gameActionCreators from "../redux/modules/gameActionCreators";


export class GameSaga extends BaseSaga {
  @autobind
  public *cleanGameHistory(): IterableIterator<CallEffect | PutEffect<any> | ForkEffect<Game>> {
	  try {
	  yield call(cleanResults);
	  yield put(gameActionCreators.setGameHistory([]));
	  } catch (e) {
      yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }
  @autobind
  public *createGame(): IterableIterator<CallEffect<ICapitalWeather> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<ICapitalWeather>>> {
	  try {

	  const game = new Game();
	  game.city1  = yield select(randomCitySelector);
	  game.city2  = yield select(randomCitySelector);
	  if (game.city2 === game.city1) {
        game.city2  = yield select(randomCitySelector);
      }
	  const weather: ICapitalWeather[] = yield all([call(weatherApi.getWeather, game.city1.id),  call(weatherApi.getWeather, game.city2.id)]);
	  game.weather1 = weather[0];
	  game.weather2 = weather[1];
	  game.correctAnswer = game.weather1.main.temp > game.weather2.main.temp ? game.city1 : game.city2;

	  return game;

	  } catch (e) {
	    yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }
  @autobind
  public *loadGameHistory(): IterableIterator<CallEffect | PutEffect<any> | ForkEffect<Game>> {
	  try {
	  let results: Game[] = yield call(getResults);
	  if (!results) {results = []; }
	  yield put(gameActionCreators.setGameHistory(results));
	  } catch (e) {
      yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }

  @autobind
  public *newGame(): IterableIterator<CallEffect<Game> | PutEffect<any> | SelectEffect | ForkEffect<Game>> {
	  try {
      let nextGame =  yield select(nextGameSelector);
      if (!nextGame) {
        nextGame = yield call(this.createGame);
      }
      yield fork(this.setNextGame);
      yield call(this.setCurrentGame, nextGame);

	  } catch (e) {
      yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }

  @autobind
  public *setCurrentGame(game: Game): IterableIterator<CallEffect<ICapitalWeather> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<ICapitalWeather>>> {
	  try {

	  	yield put(gameActionCreators.setCurrentGameAction(game));

	  } catch (e) {
      yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }
  @autobind
  public *setGameStatus(action: any): IterableIterator<CallEffect<Game> | CallEffect<string> | PutEffect<any> | ForkEffect | SelectEffect | ForkEffect<never>> {
	  try {
      const answer: Capital = action.payload;
      const currentGame: Game =  yield select(currentGameSelector);
      const resultGame = {...currentGame, userAnswer: answer, gameState: {status: GameStateEnum.finished}};
      const {id, ...resutToSave} = resultGame;
      const saveResult = yield call(AddResults, resutToSave);
      yield put(gameActionCreators.setCurrentGameAction(resultGame));
      yield put(gameActionCreators.addToHistory({...resultGame, id: saveResult}));
	  } catch (e) {
      yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }

  @autobind
  public *setNextGame(): IterableIterator<CallEffect<Game> | PutEffect<any> | ForkEffect > {
	  try {
      const nextGame = yield call(this.createGame);
      yield put(gameActionCreators.setNextGameAction(nextGame));

	  } catch (e) {
      yield put(gameActionCreators.errorGame(e.toString()));
	  }
  }
  @autobind
  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(gameActionCreators.startGameAction), this.newGame);
    yield takeLatest(getType(gameActionCreators.setGameResult), this.setGameStatus);
    yield takeLatest(getType(gameActionCreators.loadGameHistory), this.loadGameHistory);
    yield takeLatest(getType(gameActionCreators.cleanHistory), this.cleanGameHistory);
  }
}
