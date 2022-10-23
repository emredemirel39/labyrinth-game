import { allBoxes, colValues } from "../utils";

export const beginingBox: string = allBoxes[Math.floor(Math.random() * allBoxes.length)];

export const getBeginingBox = () => allBoxes[Math.floor(Math.random() * allBoxes.length)];

export const getAvaibleDirections = (currentBox: string): string [] => {

    const rotatesX = ['left', 'right'];
    const rotatesY = ['up', 'down'];

    const avaibleDirections = [];

    if (currentBox[0] === 'A') {
        avaibleDirections.push(...rotatesX.filter(r => r !== 'left'));
    };

    if (currentBox[0] === 'B') {
        avaibleDirections.push(...rotatesX);
    };

    if (currentBox[0] === 'C') {
        avaibleDirections.push(...rotatesX.filter(r => r !== 'right'));
    };

    if (currentBox[1] === '1') {
        avaibleDirections.push(...rotatesY.filter(r => r !== 'up'));
    };

    if (currentBox[1] === '2') {
        avaibleDirections.push(...rotatesY);
    };

    if (currentBox[1] === '3') {
        avaibleDirections.push(...rotatesY.filter(r => r !== 'down'));
    };

    return avaibleDirections;

};

export const getDirection = (currentBox: string): string => {
    const allDirections = getAvaibleDirections(currentBox);

    const randomDirection = allDirections[Math.floor(Math.random() * allDirections.length)]

    return randomDirection;
};

export const getNextBox = (currentBox: string, direction: string ): string => {

    //const direction = getDirection(currentBox);
    const arrOfCurrentBox = currentBox.split('');

    console.log(arrOfCurrentBox);
    console.log(direction);

    if (direction === 'up') {

        const newRowValue = Number(arrOfCurrentBox[1]) - 1;

        arrOfCurrentBox[1] = newRowValue.toString();
    };

    if (direction === 'down') {

        const newRowValue = Number(arrOfCurrentBox[1]) + 1;

        arrOfCurrentBox[1] = newRowValue.toString();
    };

    if (direction === 'left') {

        const indexOfCurrentCol = colValues.findIndex(e => e === arrOfCurrentBox[0]);
        const newColValue = colValues.find((v, i) => i=== indexOfCurrentCol - 1);

        arrOfCurrentBox[0] = newColValue!;
    };

    if (direction === 'right') {

        const indexOfCurrentCol = colValues.findIndex(e => e === arrOfCurrentBox[0]);
        const newColValue = colValues.find((v, i) => i=== indexOfCurrentCol + 1);

        arrOfCurrentBox[0] = newColValue!;
    }

    return arrOfCurrentBox.join('');

};