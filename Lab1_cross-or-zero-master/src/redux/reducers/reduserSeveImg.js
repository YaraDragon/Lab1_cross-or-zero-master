import SaveImg from "../actions/SaveImgAction";

const initialState = {
    imgValue:[],
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case SaveImg: {
            state.imgValue.push(action.imgValue)
            // return { ...state, imgValue: action.imgValue };
        }
        default: return state;
    }
}