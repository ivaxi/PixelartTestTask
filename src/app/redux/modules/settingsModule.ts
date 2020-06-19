import {ActionType, getType} from "typesafe-actions";
import { getTemperatureSettings, setTemperatureSettings } from "../../helpers/storageHelper";
import {IBaseState} from "./baseModule";
import * as settingsActionCreators from "./settingsActionCreators";

export type TLanguage = "en" | "de";

export interface ITranslations {
  [key: string]: string;
}

export interface ISettingsState extends IBaseState {
  useCelsius: boolean;
  language: TLanguage;
  translations: ITranslations;
  weatherApiKey?: string;
}

const initialState: ISettingsState = {
  error: "",
  language: "en",
  loaded: false,
  pending: false,
  translations: {},
  weatherApiKey: "5be59f209ce749ee681f889e0b56b804",
  useCelsius: getTemperatureSettings()

};


export function settingsReducer(
  state: ISettingsState = initialState,
  action: ActionType<typeof settingsActionCreators>
): ISettingsState {
  switch (action.type) {
    case getType(settingsActionCreators.setLanguage.invoke):
      return {
        ...state,
        language: action.payload
      };
    case getType(settingsActionCreators.setLanguage.setPending):
      return {
        ...state,
        pending: true
      };
    case getType(settingsActionCreators.setLanguage.setFulfilled):
      return {
        ...state,
        error: "",
        loaded: true,
        pending: false,
        translations: action.payload
      };
	  case getType(settingsActionCreators.setLanguage.setRejected):
      return {
		  ...state,
		  error: action.message,
		  loaded: true,
		  pending: false
      };
    case getType(settingsActionCreators.setTemperature):
	  setTemperatureSettings(action.payload);
	  return {
        ...state,
        useCelsius: action.payload
      };

    default:
      return state;
  }
}
