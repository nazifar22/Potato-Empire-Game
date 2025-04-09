document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid');
    initialiseGrid(gridContainer);
    updateSeasonDisplayCurrent();

    elementCurrent = randomElem();
    elemDisplay(elementCurrent)
    missionListConstant = shuffleMissions().slice(0.4);
    updateMissionImages(missionListConstant);

    addRotationAndMirrorListeners();
    addGridEventListeners();

});   
    
function addRotationAndMirrorListeners() {
    document.getElementById('rotate').addEventListener('click', () => {
        elementRotation(elementCurrent);
        elemDisplay(elementCurrent);
    });

    document.getElementById('mirror').addEventListener('click', () => {
        elementMirror(elementCurrent);
        elemDisplay(elementCurrent);
    });
};

function initialiseGrid(container) {
    const table = createGridTable(11, 11); 
    initialiseMountains(table);
    container.appendChild(table);
}

function createGridTable(rows, cols) {
    const table = document.createElement('table');
    table.className = 'map-grid';

    for (let row = 0; row < rows; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < cols; col++) {
            tr.appendChild(createGridCell(row, col));
        }
        table.appendChild(tr);
    }
    return table;
}

function createGridCell(row, col) {
    const cell = document.createElement('td');
    cell.className = 'grid-cell';
    cell.style.backgroundImage = 'url("assets/tiles/base_tile.png")';
    cell.dataset.row = row.toString();
    cell.dataset.col = col.toString();
    return cell;
}

function initialiseMountains(table) {
    const mountainLocations = [{row: 2, col: 2}, {row: 4, col: 9}, { row: 6, col: 4 }, { row: 9, col: 10 }, { row: 10, col: 6 }];
    mountainLocations.forEach(loc => {
        const cell = table.rows[loc.row - 1].cells[loc.col - 1];
        cell.style.backgroundImage = 'url("assets/tiles/mountain_tile.png")';
        cell.classList.add('mountain');
    });
}

function updateTimeRemainingDisplay() {
    const timeRemainingElement = document.getElementById('elapsedTimeTotal');
    timeRemainingElement.textContent = `${seasonCurrentTime} / 28`;
}