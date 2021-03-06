import {thresholdFunction} from "./actionFunction";


export const Neron = (vectorsJson, mode = "newTraining", ifRight = 1, ifWrong = -1, al = 0.1) => {

    let fun = thresholdFunction
    let weightVectors = [];
    let epoch = 0
    let vectors = [];
    let answerArray = []
    let sumError = 0;

    for (let i = 0; i < vectorsJson.length; i++) {
        vectors.push(vectorsJson[i].vector)
        answerArray.push(vectorsJson[i].key)
    }

    function init() {
        for (let i = 0; i < 900; i++) {
            weightVectors.push(-0.3 + (Math.random() * 0.6))
        }
    }

    function sumWeight(vectors, weightVectors) {
        let sum = 0;
        for (let i = 0; i < weightVectors.length; i++) {
            if (vectors[i] > 0 && weightVectors[i] !== 0)
                sum += parseFloat(vectors[i]) * parseFloat(weightVectors[i]);
        }
        return sum;
    }

    function isRight(result, answer) {
        let answerValue = answer ? ifRight : ifWrong;
        return result == answerValue ? true : false;
    }

    function error(pred, answer) {
        let answerValue = answer ? ifRight : ifWrong;
        let valueError = (pred - answerValue) ** 2
        console.log(" error =" + valueError)
        return valueError
    }

    function delta(pred, answer) {
        let answerValue = answer ? ifRight : ifWrong;
        let delta = pred - answerValue;
        console.log("delta =" + delta)
        return delta
    }

    function start(mode = "newTraining") {
        switch (mode) {

            case "newTraining": {
                if(epoch==0){
                    console.log(`Эпоха №${epoch += 1}`)
                }
                init()
                let sumWeightValue;
                let func;
                for (let i = 0; i < vectors.length; i++) {
                    console.log('изображение ' + i + ' Ответ ' + answerArray[i])
                    sumWeightValue = sumWeight(vectors[i], weightVectors);
                    func = thresholdFunction(sumWeightValue, ifRight, ifWrong)
                    console.log(func)
                    if (!isRight(func, answerArray[i])) {
                        let deltaWeight = []
                        sumError += 1;
                        let err = error(sumWeightValue, weightVectors)
                        let del = delta(sumWeightValue, weightVectors)
                        for (let j = 0; j < vectors[i].length; j++) {
                            deltaWeight.push(parseFloat(del) * parseFloat(vectors[i][j]))
                            weightVectors[j] -= al * deltaWeight[j]
                        }
                    }

                }
                console.log(`Процент ошибки за эпоху: ${sumError/answerArray.length*100}% `)
                console.log('')
                if (sumError == 0) {
                    localStorage.setItem('VectorW', weightVectors)
                    break;
                    return true;
                } else {


                    console.log(`Эпоха №${epoch += 1}`)
                    sumError = 0
                    start("who")
                    break;
                }
            }
            case "who": {
                let sumWeightValue;
                let func;
                for (let i = 0; i < vectors.length; i++) {
                    sumWeightValue = sumWeight(vectors[i], weightVectors);
                    func = thresholdFunction(sumWeightValue, ifRight, ifWrong)
                    console.log('изображение ' + i + ' Ответ ' + answerArray[i])
                    console.log(`Функция ${func}`)
                    console.log(`Сумма ${sumWeightValue}`)
                    if (!isRight(func, answerArray[i])) {
                        let deltaWeight = []
                        sumError += 1;
                        let err = error(sumWeightValue, weightVectors)
                        console.log(" error =" + err)
                        let del = delta(sumWeightValue, weightVectors)
                        console.log("delta =" + del)
                        for (let j = 0; j < vectors[i].length; j++) {
                            deltaWeight.push(parseFloat(del) * parseFloat(vectors[i][j]))
                            weightVectors[j] -= al * deltaWeight[j]
                        }

                    }

                }
                console.log(`КОЛЛИЧЕСТВО ОШИБОК:${sumError}`)
                console.log(`Процент ошибки за эпоху: ${sumError/answerArray.length*100}% `)
                console.log('')
                if (sumError === 0) {
                    localStorage.setItem('VectorW', weightVectors)
                    break;
                    return true;
                } else {

                    console.log(`Эпоха №${epoch += 1}`)
                    sumError = 0
                    start("who")
                    break;
                }
            }
            case "whoIt": {
                weightVectors = localStorage.getItem('VectorW').
                replace('[','').
                replace(']','').
                split(',')

                console.log(weightVectors)
                console.log(`ДЛИНА ВЕКРОВА ВЕСОВ ${weightVectors.length}`)
                let sumWeightValue;
                let func;
                sumWeightValue = sumWeight(vectors[0], weightVectors);
                func = thresholdFunction(sumWeightValue, ifRight, ifWrong)
                console.log('изоберажние ' + vectors.length + ' Ответ ' + answerArray[vectors.length-1])
                console.log(`Функция ${func}`)
                console.log(`Сумма ${sumWeightValue}`)
                if (func == 1) {
                    alert('Это Х')
                    break
                } else {
                    alert('Это не X')
                    break
                }

            }case "extraEd": {
                if(epoch==0){
                    console.log(`Эпоха №${epoch += 1}`)
                }
                weightVectors = localStorage.getItem('VectorW').
                replace('[','').
                replace(']','').
                split(',')
                let sumWeightValue;
                let func;
                for (let i = 0; i < vectors.length; i++) {
                    console.log('изображение ' + i + ' Ответ ' + answerArray[i])
                    sumWeightValue = sumWeight(vectors[i], weightVectors);
                    func = thresholdFunction(sumWeightValue, ifRight, ifWrong)
                    console.log(func)
                    if (!isRight(func, answerArray[i])) {
                        let deltaWeight = []
                        sumError += 1;
                        let err = error(sumWeightValue, weightVectors)
                        let del = delta(sumWeightValue, weightVectors)
                        for (let j = 0; j < vectors[i].length; j++) {
                            deltaWeight.push(parseFloat(del) * parseFloat(vectors[i][j]))
                            weightVectors[j] -= al * deltaWeight[j]
                        }
                    }

                }
                console.log(`Процент ошибки за эпоху: ${sumError/answerArray.length*100}% `)
                console.log('')
                if (sumError == 0) {
                    localStorage.setItem('VectorW', weightVectors)
                    break;
                    return true;
                } else {

                    console.log(`Эпоха №${epoch += 1}`)
                    sumError = 0
                    start("who")
                    break;
                }
            }default:
                break
        }
    }

    start(mode)

}