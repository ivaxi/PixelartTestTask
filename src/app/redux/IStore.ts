import {RouterState} from "redux-router5";
import { ICitiesState } from "./modules/citiesModule";
import { IGameState } from "./modules/gameModule";
import {ISettingsState} from "./modules/settingsModule";


export interface IStore {
  citiesState: ICitiesState;
  gameState: IGameState;
  router: RouterState;
  settings: ISettingsState;
}
