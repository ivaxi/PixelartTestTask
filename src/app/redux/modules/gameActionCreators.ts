import {createAction} from "typesafe-actions";
import { Capital } from "../../models/Capital";
import { Game } from "../../models/game";

export const setCites = createAction("GAME/SETCITIES")<Capital>();
export const startGameAction = createAction("GAME/START")();
export const setNextGameAction = createAction("GAME/SETNEXTGAME")<Game>();
export const setCurrentGameAction = createAction("GAME/SETCURRENTGAME")<Game>();
export const setGameResult = createAction("GAME/SETGAMERESULT")<Capital>();
export const setGame = createAction("GAME/SETGAME")<Game>();
export const errorGame = createAction("GAME/ERROR")<string>();

export const loadGameHistory = createAction("GAME/LOADGAMEHISTORY")();
export const setGameHistory = createAction("GAME/SETGAMEHISTORY")<Game[]>();
export const addToHistory = createAction("GAME/SAVETOHISTORY")<Game>();
export const cleanHistory = createAction("GAME/CLEANHISTORY")();
