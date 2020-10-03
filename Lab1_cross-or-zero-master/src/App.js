import React, {useRef, useEffect, useState} from 'react';
import {Canvas} from "./component/Canvas";
import {Button, Grid} from "@material-ui/core";
import {CanvaNew, ReduxCanvaNew} from "./component/CanvaNew";
import {connect, useDispatch} from "react-redux";
import SaveImg from "./redux/actionCreators/SaveImg";
import { ReduxCustomCanvas} from "./component/CustomCanvas";

const mapStateToProps = (state) => ({
    imgValue: state.a.imgValue
})


function App(props) {

    const dispatch = useDispatch();

    return (
        <div>
            <input type="file" multiple accept="image/*" onChange={saveImg}/>
            <Grid>
               {/* <Canvas color={color}/>*/}
                <ReduxCustomCanvas/>

            </Grid>

        </div>);

    function saveImg(event) {
        dispatch(SaveImg(event))
        alert(event.toString())
    }
}

export const AppWithRedux = connect(mapStateToProps)(App)
