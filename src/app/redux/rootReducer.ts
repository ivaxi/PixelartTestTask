import {CombinedState, combineReducers, Reducer} from "redux";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {citiesReducer} from "./modules/citiesModule";
import { gameReducer } from "./modules/gameModule";
import {settingsReducer} from "./modules/settingsModule";

const rootReducer: Reducer<CombinedState<IStore>> = combineReducers<IStore>({

  citiesState: citiesReducer,
  gameState: gameReducer,
  router: router5Reducer,
  settings: settingsReducer
});

export default rootReducer;
