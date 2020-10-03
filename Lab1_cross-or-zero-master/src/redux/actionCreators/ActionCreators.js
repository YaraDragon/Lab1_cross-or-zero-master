import SaveImgAction from "../actions/Actions";


function SaveImg(value) {
    return {
        type: SaveImgAction,
        imgValue: value
    };
}

export default SaveImg;