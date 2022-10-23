export const colValues = ['A', 'B', 'C'];

export const rowValues = ['1', '2', '3'];

export const allBoxes: string [] = [];

    colValues.forEach(item => {
        rowValues.forEach(item2 => {
            allBoxes.push(item + item2) // concatenate two items
        });
    });

export const tableRows = rowValues.map(item => {
    return colValues.map(item2 => (item2 + item));
});

export const capitalizeFirst = (str: string): string => str && str[0].toUpperCase() + str.slice(1).toLowerCase();