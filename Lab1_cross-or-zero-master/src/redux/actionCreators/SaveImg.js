import SaveImgAction from "../actions/SaveImgAction";


function SaveImg(value,name) {
    return {
        type: SaveImgAction,
        imgValue: value,
        imgName:name
    };
}

export default SaveImg;