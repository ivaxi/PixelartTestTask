import {all, AllEffect} from "redux-saga/effects";
import { GameSaga } from "./GameSaga";
import {SettingsSaga} from "./SettingsSaga";
import { StartupSaga } from "./StartupSaga";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  yield all([
    (new StartupSaga()).watch(),
    (new SettingsSaga()).watch(),
    (new GameSaga()).watch()
  ]);
}
