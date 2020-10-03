import React, {useRef, useEffect, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import SaveImg from "./redux/actionCreators/SaveImg";
import {ReduxCustomCanvas} from "./component/CustomCanvas";
import Paper from "@material-ui/core/Paper";

const mapStateToProps = (state) => ({
    imgValue: state.a.imgValue
})

let json={
    name:"",
    im:[],
}

function App(props) {

    const dispatch = useDispatch();

    function previewFile() {
        let file    = document.querySelector('input[type=file]').files[0];
        let name = document.querySelector('input[type=file]').files[0].name
        let reader  = new FileReader();

        reader.onloadend = function () {
            alert(reader.result);
            json={
                name:name,
                im:reader.result,
            }
            dispatch(SaveImg(json))
        }
        if (file) {
            reader.readAsDataURL(file);

        }

    }

    return (
        <div style={{background:"#33333333"}} >
            <Grid
                style={{width:"100vh",height:"100vh"}}
                container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid  container item direction="row"  justify="center"
                      alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Paper style={{padding: "10px"}} elevation={3}>
                            <input onChange={previewFile} type="file" accept="image/*"/>
                            <ReduxCustomCanvas/>
                        </Paper>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>

        </div>);


}

export const AppWithRedux = connect(mapStateToProps)(App)
