import Vector from "../actionCreators/Vector";
import VectorAction from "../actions/VectorAction";


const initialState = {
    vectors:[],
}

export function reducerVector(state = initialState, action) {
    switch(action.type) {
        case VectorAction:
                state.vectors.push(action.vectors);
//        return { ...state, vectors: action.vectors };

        default: return state;
    }
}