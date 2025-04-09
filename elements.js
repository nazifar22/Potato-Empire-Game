const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
            [0,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
            [0,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
            [0,0,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
            [0,0,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
            [0,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
            [0,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
            [1,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
            [1,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
            [1,1,1],
            [0,1,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
            [1,0,0],
            [1,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
            [1,1,1],
            [1,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
            [1,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
]

function randomElem() {
    return elements[Math.floor(Math.random() * elements.length)];
}

function elementImage(type) {
    const imagePaths = {
        'forest': 'url("assets/tiles/forest_tile.png")',
        'farm': 'url("assets/tiles/plains_tile.png")',
        'town': 'url("assets/tiles/village_tile.png")',
        'water': 'url("assets/tiles/water_tile.png")'
    };
    return imagePaths[type] || '';
}

function elementOffset(shape) {
    let minX = 0, minY = 0;

    shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                minX = Math.min(minX, colIndex);
                minY = Math.min(minY, rowIndex);
            }
        });
    });

    return { x: -minX, y: -minY };
}

function elemDisplay(element) {
    const displayContainer = document.querySelector('.elemDisplay');
    let elemContainer = getOrCreateElementContainer(displayContainer);

    elemContainer.innerHTML = ''; // Clear existing content
    elemContainer.appendChild(createElementTable(element));

    updateElementTimeDisplay(element.time);
}

function getOrCreateElementContainer(displayContainer) {
    let elemContainer = displayContainer.querySelector('.element-container');
    if (!elemContainer) {
        elemContainer = document.createElement('div');
        elemContainer.className = 'element-container';
        displayContainer.appendChild(elemContainer);
    }
    return elemContainer;
}

function createElementTable(element) {
    const table = document.createElement('table');
    element.shape.forEach(row => {
        table.appendChild(createTableRow(row, element.type));
    });
    return table;
}

function createTableRow(rowData, elementType) {
    const tr = document.createElement('tr');
    rowData.forEach(cell => {
        tr.appendChild(createTableCell(cell, elementType));
    });
    return tr;
}

function createTableCell(cell, elementType) {
    const td = document.createElement('td');
    if (cell === 1) {
        td.style.backgroundImage = elementImage(elementType);
        td.className = 'active-cell';
    }
    return td;
}

function updateElementTimeDisplay(time) {
    const elementTimeDisplay = document.getElementById('elemTime');
    elementTimeDisplay.textContent = time.toString();
}


function elementRotation(element) {
    element.shape = element.shape[0].map((_, colIndex) => element.shape.map(row => row[colIndex])).reverse();
}

function elementMirror(element) {
    element.shape.forEach(row => row.reverse());
}

function elementPlacementValid(element, row, col) {
    if (isOutOfBounds(row, col, element.shape)) {
        return false;
    }

    return canPlaceElement(element, row, col);
}

function isOutOfBounds(row, col, shape) {
    const gridMaxSize = 13;
    return row < 0 || col < 0 || row + shape.length > gridMaxSize || col + shape[0].length > gridMaxSize;
}

function canPlaceElement(element, startRow, startCol) {
    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            if (element.shape[i][j] === 1 && !canPlaceCell(startRow + i, startCol + j)) {
                return false;
            }
        }
    }
    return true;
}

function canPlaceCell(row, col) {
    const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    return cell && !cell.classList.contains('mountain') && !cell.classList.contains('occupied');
}

function elementPlacement(element, row, col) {
    if (!elementPlacementValid(element, row, col)) return;

    updateTimeRemaining(element);
    updateSeasonProgress(element);

    placeElementOnGrid(element, row, col);
    handleEndOfSeasonOrGame();
}

function updateTimeRemaining(element) {
    elementTimeRemaining -= element.time;
    const totalTimeElement = document.getElementById("elapsedTimeTotal");
    totalTimeElement.textContent = `${28 - elementTimeRemaining} / 28`;
}

function updateSeasonProgress(element) {
    if (seasonCurrentTime + element.time > 7) {
        resetSeasonTime();
        seasonEndScoring();
        seasonChange();
    } else {
        seasonCurrentTime += element.time;
    }
    const seasonTimeElement = document.getElementById("elapsedTimeSeason");
    seasonTimeElement.textContent = `Elapsed time in current season: ${seasonCurrentTime} / 7`;
}

function resetSeasonTime() {
    seasonCurrentTime = 0;
    updateSeasonDisplayCurrent();
    updateTimeRemainingDisplay();
}

function placeElementOnGrid(element, row, col) {
    elemHelper(element, row, col);
    updateSeasonDisplayCurrent();
}

function handleEndOfSeasonOrGame() {
    if (seasonCurrentTime > 7) {
        resetSeasonTime();
        seasonChange();
        seasonEndScoring();
    }

    if (elementTimeRemaining <= 0) {
        calculateFinalScore();
    }
}

function elemHelper(element, row, col) {
    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            if (element.shape[i][j] === 1) {
                placeIndividualCell(element, row + i, col + j);
            }
        }
    }
}

function placeIndividualCell(element, row, col) {
    const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    if (cell) {
        cell.style.backgroundImage = elementImage(element.type);
        cell.classList.add('occupied', element.type);
    }
}

function addGridEventListeners() {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('mouseover', handleMouseOver);
        cell.addEventListener('mouseout', handleMouseOut);
        cell.addEventListener('click', handleClick);
    });
}

function handleMouseOver(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    const change = elementOffset(elementCurrent.shape);
    elemHighlight(elementCurrent, row - change.y, col - change.x);
}

function handleMouseOut(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    removeHighlight(elementCurrent, row, col);
}

function handleClick(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    if (elementPlacementValid(elementCurrent, row, col) && elementTimeRemaining >= elementCurrent.time) {
        placeElementAndPrepareNext(row, col);
    }
}

function placeElementAndPrepareNext(row, col) {
    elementPlacement(elementCurrent, row, col);
    elementCurrent = randomElem();
    elemDisplay(elementCurrent);
}

function elemHighlight(element, row, col) {
    const change = elementOffset(element.shape);
    iterateElementShape(element.shape, (i, j) => {
        highlightCell(row + i + change.y, col + j + change.x);
    });
}

function removeHighlight(element, row, col) {
    iterateElementShape(element.shape, (i, j) => {
        unhighlightCell(row + i, col + j);
    });
}

function highlightCell(row, col) {
    const cell = getGridCell(row, col);
    if (cell && !cell.classList.contains('mountain') && !cell.classList.contains('occupied')) {
        cell.classList.add('highlight');
    }
}

function unhighlightCell(row, col) {
    const cell = getGridCell(row, col);
    if (cell) cell.classList.remove('highlight');
}

function iterateElementShape(shape, callback) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] === 1) {
                callback(i, j);
            }
        }
    }
}

function getGridCell(row, col) {
    return document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
}
