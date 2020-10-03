import VectorAction from "../actions/VectorAction";


function Vector(value) {
    return {
        type: VectorAction,
        vectors: value
    };
}

export default Vector;