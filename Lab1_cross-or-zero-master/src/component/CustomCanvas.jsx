import React from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Line, Text} from 'react-konva';
import {Button} from "@material-ui/core";
import SaveImg from "../redux/actionCreators/SaveImg";
import {connect, useDispatch} from "react-redux";
import {resizeAndCrop, vectorization} from "../utils/images";
import Paper from "@material-ui/core/Paper";
import Vector from "../redux/actionCreators/Vector";
import {Neron} from "../Logic/Neron";
import {thresholdFunction} from "../Logic/membershipFunction";

const mapStateToProps = (state) => ({
    vectors: state.vector.vectors
})


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
                    let jsonVector = {
                        key: pictureMeaning,
                        vector: vectorFromImg
                    }

                    dispatch(Vector(jsonVector))
                }
            }
            newImg.src = newImgUrl;

        }

        layerRef.current.getLayer().toImage({callback: imageReceived});

    }

    function clear(){
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
        <div>
            <div style={{width: "300px", height: "300px"}}>
                <Paper>
                    <select
                        value={tool}
                        onChange={(e) => {
                            setTool(e.target.value);
                        }}
                    >
                        <option value="pen">Pen</option>
                        <option value="eraser">Eraser</option>
                    </select>
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
            <canvas width={300} height={300} ref={stageImg}></canvas>
            <Button onClick={Save}>Сохранить</Button>
            <Button onClick={clear}>Удалить картинку</Button>
            <Button onClick={startEducation}>Начать обучение</Button>
            <Button onClick={extraEducation}>Продолжить обучение</Button>
            <Button onClick={ask}>Спросить</Button>
        </div>
    );

    function startEducation() {
        Neron(props.vectors)
    }
    function ask(){
        Neron(props.vectors,"whoIt")
    }

    function extraEducation(){
        Neron(props.vectors,"extraEd")
    }
};


export const ReduxCustomCanvas = connect(mapStateToProps)(CustomCanvas)