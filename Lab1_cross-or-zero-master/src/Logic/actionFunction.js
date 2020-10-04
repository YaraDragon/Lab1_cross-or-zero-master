export const thresholdFunction=(result, ifRight = 1, ifWrong = -1)=>{
    return  result >= 1 ? ifRight : ifWrong;
}

export const LinearFunction=(result,k=0)=>{
    return result*k;
}