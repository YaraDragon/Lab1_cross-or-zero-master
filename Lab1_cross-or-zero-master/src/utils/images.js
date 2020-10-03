export const resizeAndCrop = (img, width=30, height=30) => {
    let sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = img.width;
    sourceCanvas.height = img.height;
    let sourceContext = sourceCanvas.getContext("2d");
    sourceContext.drawImage(img, 0, 0);

    let minx = img.width
    let miny = img.height
    let maxx = 0
    let maxy = 0

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let imgDataPixle = sourceContext.getImageData(x, y, 1, 1).data
            if (imgDataPixle[0] !== 0 || imgDataPixle[1] !== 0 || imgDataPixle[2] !== 0 || imgDataPixle[3] !== 0) {
                if (minx > x)
                    minx = x
                if (miny > y)
                    miny = y
                if (maxx < x)
                    maxx = x
                if (maxy < y)
                    maxy = y
            }
        }
    }



    let targetCanvas = document.createElement("canvas");
    targetCanvas.width = width;
    targetCanvas.height = height;
    let targetContext = targetCanvas.getContext("2d");
    targetContext.drawImage(img,minx,miny,maxx-minx,maxy-miny,0,0,30,30);
    const imgUrl = targetCanvas.toDataURL();

    return imgUrl;
}


export const vectorization=(img)=>{
    let sourceCanvas = document.createElement("canvas");

    /* new Image;
    img.src = imgUrl*/
    sourceCanvas.width = img.width;
    sourceCanvas.height = img.height;
    let sourceContext = sourceCanvas.getContext("2d");
    sourceContext.drawImage(img, 0, 0);
    console.log(img)
    let vector = []

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let imgDataPixle = sourceContext.getImageData(x, y, 1, 1).data
            if (imgDataPixle[0] !== 0 || imgDataPixle[1] !== 0 || imgDataPixle[2] !== 0 || imgDataPixle[3] !== 0) {
              vector.push(1);
            }else {
                vector.push(0);
            }
        }
    }



    return vector
}