import {combineReducers} from "redux";
import {reducer} from "./reduserSeveImg";
import {reducerVector} from "./reduserVector";

export const rootReducer = combineReducers({a: reducer,vector: reducerVector})
