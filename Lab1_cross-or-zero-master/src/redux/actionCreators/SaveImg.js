import SaveImgAction from "../actions/SaveImgAction";


function SaveImg(value) {
    return {
        type: SaveImgAction,
        imgValue: value
    };
}

export default SaveImg;