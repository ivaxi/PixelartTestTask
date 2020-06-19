import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getType} from "typesafe-actions";

import { Capital } from "../models/Capital";
import { Game } from "../models/game";
import {loadCities} from "../redux/modules/citiesActionCreators";
import { startGameAction } from "../redux/modules/gameActionCreators";

import { weatherApi } from "./../api/WeatherApi";
import {BaseSaga} from "./BaseSaga";


export class StartupSaga extends BaseSaga {
  @autobind
  public *fetchCities(): IterableIterator<CallEffect | PutEffect<any> | ForkEffect<Game>> {
    try {
      yield put(loadCities.setPending(null));
      const capitalsInfo: Capital[] = yield call(weatherApi.getCapitals);
      yield put(loadCities.setFulfilled(capitalsInfo));
      yield put(startGameAction());
    } catch (e) {
      yield put(loadCities.setRejected(null, e.toString()));
    }
  }


  protected *registerListeners(): IterableIterator<ForkEffect> {
	  yield takeLatest(getType(loadCities.invoke), this.fetchCities);
  }
}
