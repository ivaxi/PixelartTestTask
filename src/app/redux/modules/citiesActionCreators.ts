import { Capital } from "../../models/Capital";
import {createAsyncActions} from "./baseModule";

// tslint:disable-next-line:export-name
export const loadCities = createAsyncActions(
  "CITIES/LOAD_CITIES",
  "CITIES/LOAD_CITIES_PENDING",
  "CITIES/LOAD_CITIES_FULFILLED",
  "CITIES/LOAD_CITIES_REJECTED"
)<null, null, Capital[], null>();