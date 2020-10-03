import React, {useState} from 'react';
import {render} from 'react-dom';
import {Stage, Layer, Line, Text, Image} from 'react-konva';
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
import createPalette from "@material-ui/core/styles/createPalette";
import {connect, useDispatch} from "react-redux";
import SaveImg from "../redux/actionCreators/SaveImg";

const mapStateToProps = (state) => ({
    imgValue: state.a.imgValue
})


const CanvaNew = (props) => {

    const stageKanva = useState(null)

    const stageImg = useState(null)
    const dispatch = useDispatch();

    const [isImg,setImg] = React.useState(false);
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);


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

    const handleMouseUp = (paper) => {
        isDrawing.current = false;

    };
    const ImgRef = React.forwardRef(((props, ref) => {
        return(<canvas  /*width={30}
                        height={30}*/  ref={ref}/>);
    }))

    const Test3 = React.forwardRef(((props, ref) => {
        return (
            <Stage

                width={300}
                height={300}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer      ref={ref}>

                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="black"
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
        )
    }))
    return (
        <div style={{width: "300px", height: "300px"}}>
            <Paper elevation={3}>
                <Test3 ref={stageKanva}></Test3>
            </Paper>
            <Button onClick={Save} >Save</Button>
            <Button onClick={imgToArray} >Img</Button>
            <ImgRef ref={stageImg}></ImgRef>
        </div>
    );



    function Save() {
        alert(stageKanva.current.getLayer().toJSON())
        stageKanva.current.getLayer().toImage({
            callback(img) {
                alert(img)
                dispatch(SaveImg(img))
                alert(props.imgValue)
                clear()
                //imgToArray()
            }
        });

    }

    function clear(){
        stageKanva.current.getStage().clear()
        setLines([])
    }

    function imgToArray(){
        let img = props.imgValue.pop();
        let canvas = stageImg.current;
        //let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        let minx=img.width
        let miny=img.height
        let maxx=0
        let maxy=0

        for (let y = 0; y < img.height ; y++) {
            for (let x = 0; x < img.width; x++) {
                let imgDataPixle=context.getImageData(x,y,1,1).data

                if (imgDataPixle[0]!==0 || imgDataPixle[1]!==0 || imgDataPixle[2]!==0 || imgDataPixle[3]!==0){
                    if (minx>x){minx=x
                        console.log(x)
                    }
                    if (miny>y){miny=y
                        console.log(x)
                    }
                    if (maxx<x){maxx=x
                        console.log(x)
                    }
                    if (maxy<y){maxy=y
                        console.log(x)
                    }
                }

            }

        }



        context.drawImage(img,minx,miny,maxx-minx,maxy-miny,0,0,30,30)
        let imgData = context.getImageData(0, 0, img.width, img.height).data;

        alert(imgData);
        setImg(true)
    }
}

export const ReduxCanvaNew = connect(mapStateToProps)(CanvaNew)