import React from "react";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

const mapStateToProps = (state) => ({
    imgValue: state.a.imgValue
})

export const ImeToArr = (props) => {
    let img = props.imgValue[props.imgValue.size - 1];

    alert(img)
    return (null)

    /*let img = props.imgValue[props.imgValue.size - 1];
    let canvas = document.createElement('canvas');
    canvas.width = '300px';
    canvas.height = '300px';
    let context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);

    const w = canvas.width;
    const h = canvas.height;
    const pixel=6;

    for (let y = 0; y <h; y+=pixel) {
        for (let x   = 0; x <w; x+=pixel) {
            const data= context.getImageData(x, y, pixel, pixel);
            data.data=

        }

    }
    context.drawImage(img, 0, 0);
*/
}
export const ReduxImgToArray= connect(mapStateToProps)(ImeToArr)