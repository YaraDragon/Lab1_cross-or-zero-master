import React from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Line, Text} from 'react-konva';
import {Button, Grid} from "@material-ui/core";
import SaveImg from "../redux/actionCreators/SaveImg";
import {connect, useDispatch} from "react-redux";
import {resizeAndCrop, vectorization} from "../utils/images";
import Paper from "@material-ui/core/Paper";
import Vector from "../redux/actionCreators/Vector";
import {Neron} from "../Logic/Neron";
import {thresholdFunction} from "../Logic/membershipFunction";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Select from "@material-ui/core/Select";

const mapStateToProps = (state) => ({
    vectors: state.vector.vectors,
    imgs:state.a.imgValue,
})

let jsonVector = {
    key: "",
    vector: [],
}

const CustomCanvas = (props) => {
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const layerRef = React.useRef();
    const stageImg = React.useRef();
    const dispatch = useDispatch();

    function Save() {

        const imageReceived = (img) => {
            const newImgUrl = resizeAndCrop(img);
            let vectorFromImg
            console.log(newImgUrl)
            const newImg = new Image;
            newImg.onload = () => {
                const testContext = stageImg.current.getContext("2d");
                testContext.drawImage(newImg, 0, 0)
                vectorFromImg = vectorization(newImg)
                let pictureMeaning = window.confirm("x ?")
                if (vectorFromImg.length > 0) {
                    jsonVector = {
                        key: pictureMeaning,
                        vector: vectorFromImg
                    }

                    dispatch(Vector(jsonVector))
                }
            }
            newImg.src = newImgUrl;
            clear()
        }

        layerRef.current.getLayer().toImage({callback: imageReceived});
    }

    function vectorizationFromInputImg(){
        const image = new Image()
        let img = props.imgs.pop()
        let name = img.name[0]
        image.src = img.im
        alert(name)
        let miniImg = resizeAndCrop(image)
        let vector =vectorization(miniImg)
        if (vector.length > 0) {
            let jsonVector = {
                key: name,
                vector: vector
            }
            dispatch(Vector(jsonVector))
        }
    }

    function startEducation() {
        Neron(props.vectors)
    }

    function ask() {
        Neron(props.vectors, "whoIt")
    }

    function extraEducation() {
        Neron(props.vectors, "extraEd")
    }

    function clear() {
        layerRef.current.getStage().clear()
        setLines([])
    }

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, {tool, points: [pos.x, pos.y]}]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <>
            <Grid container item
                  direction="row"
                  justify="center"
                  alignItems="center"
            >
                <Grid item>
                    <div style={{width: "300px", height: "300px"}}>
                        <Paper elevation={5}>
                            <Select
                                value={tool}
                                onChange={(e) => {
                                    setTool(e.target.value);
                                }}
                            >
                                <option value="pen">Перо</option>
                                <option value="eraser">Ластик</option>
                            </Select>
                            <Stage
                                width={300}
                                height={300}
                                onMouseDown={handleMouseDown}
                                onMousemove={handleMouseMove}
                                onMouseup={handleMouseUp}
                            >
                                <Layer ref={layerRef}>
                                    {lines.map((line, i) => (
                                        <Line
                                            key={i}
                                            points={line.points}
                                            stroke="#df4b26"
                                            strokeWidth={5}
                                            tension={0.5}
                                            lineCap="round"
                                            globalCompositeOperation={
                                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                            }
                                        />
                                    ))}
                                </Layer>
                            </Stage>
                        </Paper>
                    </div>
                </Grid>
                <Grid item>
                    <canvas width={300} height={300} ref={stageImg}></canvas>
                </Grid>
            </Grid>
            <ButtonGroup variant="contained">
                <Button style={{background: "green", color: "white"}}
                        onClick={Save}>Сохранить картинку</Button>
                <Button onClick={vectorizationFromInputImg}>Добавить картинки из загрузки</Button>
                <Button color="secondary" onClick={clear}>Удалить картинку</Button>
                <Button onClick={startEducation}>Начать обучение</Button>
                <Button onClick={extraEducation}>Продолжить обучение</Button>
                <Button color="primary" onClick={ask}>Спросить</Button>
            </ButtonGroup>
        </>
    );


};


export const ReduxCustomCanvas = connect(mapStateToProps)(CustomCanvas)