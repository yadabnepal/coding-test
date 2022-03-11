function getLiveNeighbours(array, row, column) {
  let neighbours = 0;
  let rows = array.length - 1;
  let columns = array[0].length - 1;

  for (let x = Math.max(0, row - 1); x <= Math.min(row + 1, rows); x++) {
    for (let y = Math.max(0, column - 1); y <= Math.min(column + 1, columns); y++) {
      if (x !== row || y !== column) {
        // Check for the cell that is live
        if (array[x][y] === true) {
          neighbours++;
        }
      }
    }
  }

  return neighbours;
}

// (world: boolean[][]) => boolean[][]
export const next = (world) => {
  // Check if all cells are false
  const isAllCellsDead = world.every((line) => line.every((cell) => cell === false));

  if (isAllCellsDead) return world;

  return world.map((row, rowIndex) => row.map((cell, cellIndex) => {
    // Get number of neighbours that are live
    const neighbours = getLiveNeighbours(world, rowIndex, cellIndex);

    // Cell with less than 2 or more than 3 neighbours dies
    if (neighbours <= 1 || neighbours >= 4) return false;

    // Cell with 3 neighbours revives.
    if (neighbours == 3) return true;

    // Cell survives for 2 or 3 neighbours. it returns live cell on above condition anyway for 3 neighbours
    return cell;
  }))
};

// (pattern: string) => boolean[][]
export const parse = (pattern) => {
  if (!pattern) return [];

  // Convert string to boolean creating 2d array
  return pattern.trim().split('\n').map((pattern) => pattern.split('').map((char) => char === 'O'))
};
