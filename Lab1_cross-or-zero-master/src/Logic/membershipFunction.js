










export const thresholdFunction=(result, ifRight = 1, ifWrong = -1)=>{
    return  result >= 1 ? ifRight : ifWrong;
}