import Dexie from "dexie";
import { Game, GameToSave } from "../models/game";


const gameDB = new Dexie("ReactSampleDB");
gameDB.version(1).stores({ results: "++id" });

export const getResults = (): Promise<Game[]> => {
  return gameDB.table("results").toArray();
};
export const cleanResults = (): Promise<void> => {
  return gameDB.table("results").clear();
};

export const AddResults = (result: GameToSave): Promise<any> => {
  return new Promise((resolveAdd, reject) => {
    gameDB.table("results").add(result).then((ind) => resolveAdd(ind));
  });
};

// eslint-disable-next-line @typescript-eslint/tslint/config
export default gameDB;