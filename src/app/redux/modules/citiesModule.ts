import {ActionType, getType} from "typesafe-actions";
import { Capital } from "../../models/Capital";
import {IBaseState} from "./baseModule";
import * as citisActionCreators from "./citiesActionCreators";
export interface ICitiesState extends IBaseState {
  cities: Capital[];
}

const initialState: ICitiesState = {
  cities: [],
  error: "",
  loaded: false,
  pending: false
};

export function citiesReducer(
  state: ICitiesState = initialState,
  action: ActionType<typeof citisActionCreators>
): ICitiesState {
  switch (action.type) {
    case getType(citisActionCreators.loadCities.setPending):
      return {
        ...state,
        pending: true
      };
    case getType(citisActionCreators.loadCities.setFulfilled):
      return {
        ...state,
        cities: action.payload,
        error: "",
        loaded: true,
        pending: false
      };
    case getType(citisActionCreators.loadCities.setRejected):
      return {
        ...state,
        error: action.message,
        loaded: true,
        pending: false
      };
    default:
      return state;
  }
}
