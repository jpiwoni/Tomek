export const checkIntersection = (ship1, ship2) => {
    const [row1, col1] = ship1.location;
    const [row2, col2] = ship2.location;
    const size1 = ship1.length;
    const size2 = ship2.length;
    const orientation1 = ship1.rotated;
    const orientation2 = ship2.rotated;

    const calculateShipCells = (row, col, size, orientation) => {
        const shipCells = [];
        if (!orientation) {
            for (let i = 0; i < size; i++) {
                shipCells.push([row, col + i]);
            }
        } else {
            for (let i = 0; i < size; i++) {
                shipCells.push([row + i, col]);
            }
        }
        return shipCells;
    };

    const ship1Cells = calculateShipCells(row1, col1, size1, orientation1);
    const ship2Cells = calculateShipCells(row2, col2, size2, orientation2);

    for (const cell of ship1Cells) {
        const [row, col] = cell;
        if (ship2Cells.some(([r, c]) => r === row && c === col)) {
            return true;
        }
    }
    return false;
}