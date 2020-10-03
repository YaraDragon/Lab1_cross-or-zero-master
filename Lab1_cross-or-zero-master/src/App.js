import React, {useRef, useEffect, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import SaveImg from "./redux/actionCreators/SaveImg";
import {ReduxCustomCanvas} from "./component/CustomCanvas";
import Paper from "@material-ui/core/Paper";

const mapStateToProps = (state) => ({
    imgValue: state.a.imgValue
})


function App(props) {

    const dispatch = useDispatch();

    return (
        <div >
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
                            <ReduxCustomCanvas/>
                        </Paper>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>

        </div>);

    function saveImg(event) {
        dispatch(SaveImg(event))
        alert(event.toString())
    }
}

export const AppWithRedux = connect(mapStateToProps)(App)
