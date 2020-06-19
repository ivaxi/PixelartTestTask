import {ActionType, getType} from "typesafe-actions";
import { Game } from "../../models/game";
import {IBaseState} from "./baseModule";
import * as gameActionCreators from "./gameActionCreators";

export interface IGameState extends IBaseState {
  game: Game;
  nextGame: Game;
  gameHistory: Game[];
}

const initialState: IGameState = {
  game: undefined,
  nextGame: undefined,
  error: "",
  loaded: false,
  pending: false,
  gameHistory: null
};

export function gameReducer(
  state: IGameState = initialState,
  action: ActionType<typeof gameActionCreators>
): IGameState {

  switch (action.type) {
    case getType(gameActionCreators.startGameAction):
      return {
		  ...state,
		  loaded: false,
		  game: undefined,
		  pending: true
      };
    case getType(gameActionCreators.setCurrentGameAction):
	  return {
        ...state,
        game: action.payload,
        error: "",
        loaded: true,
        pending: false
	  };
    case getType(gameActionCreators.setNextGameAction):
	  return {
        ...state,
        nextGame: action.payload
      };
    case getType(gameActionCreators.errorGame):
      return {
        ...state,
        error: "loading error",
        loaded: true,
        pending: false
      };
    case getType(gameActionCreators.setGameHistory):
      return {
        ...state,
        gameHistory: action.payload
      };
    case getType(gameActionCreators.addToHistory):
      return {
        ...state,
        gameHistory: [...state.gameHistory,  action.payload]
      };
    default:
      return state;
  }
}
