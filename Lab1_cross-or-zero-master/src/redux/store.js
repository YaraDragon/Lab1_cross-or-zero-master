import { createStore } from 'redux';
import SaveImg from "./actions/SaveImgAction";
import {rootReducer} from "./reducers/rootReducer";

export const store = createStore(rootReducer);
