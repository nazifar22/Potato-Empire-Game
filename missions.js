const missions =
    {
        "basic": [
            { "title": "Edge of the Forest", "description": "One point for each forest field adjacent to the map edge." },
            { "title": "Sleepy Valley", "description": "Four points for every row with three forest fields." },
            { "title": "Watering Potatoes", "description": "Two points for each water field adjacent to farm fields." },
            { "title": "Borderlands", "description": "Six points for each full row or column." }
        ]
    };


const missionImages = 
    {
        "Borderlands": "url('assets/missions_eng/Group 78.png')",
        "Edge of Forest": "url('assets/missions_eng/Group 69.png')",
        "Sleepy Valley": "url('assets/missions_eng/Group 74.png')",
        "Watering Potatoes": "url('assets/missions_eng/Group 70.png')"
    };

let missionListConstant = ["Borderlands", "Edge of Forest", "Sleepy Valley", "Watering Potatoes"];
let highestMissionScores = { "Borderlands": 0, "Edge of Forest": 0, "Sleepy Valley": 0, "Watering Potatoes": 0 };
let A = 0, B = 0, C = 0, D = 0;

function scoreMission(mission) {
    switch (mission) {
        case "Borderlands": return scoreBorderlands();
        case "Edge of Forest": return scoreEdgeForest();
        case "Sleepy Valley": return scoreSleepyValley();
        case "Watering Potatoes": return scoreWateringPotatoes();
        default: return 0;
    }
}

// calculating score for borderlands

function scoreBorderlands() {
    const grid = scoreGrid();
    let totalScore = 0;

    totalScore += scoreFullRows(grid);
    totalScore += scoreFullColumns(grid);

    return totalScore;
}

function scoreFullRows(grid) {
    let rowScore = 0;
    grid.forEach(row => {
        if (isRowFull(row)) {
            rowScore += 6;
        }
    });
    return rowScore;
}

function isRowFull(row) {
    return row.every(cell => cell !== 'empty' && cell !== 'mountain');
}

function scoreFullColumns(grid) {
    let columnScore = 0;
    for (let col = 0; col < grid[0].length; col++) {
        if (isColumnFull(grid, col)) {
            columnScore += 6;
        }
    }
    return columnScore;
}

function isColumnFull(grid, col) {
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][col] === 'empty' || grid[row][col] === 'mountain') {
            return false;
        }
    }
    return true;
}

// calculating score for Edge of forests

function scoreEdgeForest() {
    const grid = scoreGrid();
    let score = 0;

    const maxRowIndex = grid.length - 1;
    const maxColIndex = grid[0].length - 1;

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {

            if (cell === 'forest' && isEdgeCell(rowIndex, colIndex, maxRowIndex, maxColIndex)) {
                score++;
            }
        });
    });

    return score;
}

function isEdgeCell(rowIndex, colIndex, maxRowIndex, maxColIndex) {
    return rowIndex === 0 || rowIndex === maxRowIndex || colIndex === 0 || colIndex === maxColIndex;
}

// calculating score for Sleepy valley

function scoreSleepyValley() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach(row => {
        const forestCount = row.filter(cell => cell === 'forest').length;
        if (forestCount == 3) score += 4;
    }); return score;
}

// calculating score for Watering potatoes

function scoreWateringPotatoes() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 'water') {
                score += getWaterAdjacentFarmScore(grid, rowIndex, colIndex);
            }
        });
    });

    return score;
}

function getWaterAdjacentFarmScore(grid, row, col) {
    const adjacentFarmScore = 2;
    const adjacentPositions = getAdjacentPositions(row, col);
    if (adjacentPositions.some(pos => isFarm(grid, pos))) {
        return adjacentFarmScore;
    }
    return 0;
}

function getAdjacentPositions(row, col) {
    return [
        [row - 1, col], // Up
        [row + 1, col], // Down
        [row, col - 1], // Left
        [row, col + 1]  // Right
    ];
}

function isFarm(grid, [r, c]) {
    return grid[r] && grid[r][c] === 'farm';
}


function shuffleMissions() {
    for (let i= missionListConstant.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [missionListConstant[i], missionListConstant[j]] = [missionListConstant[j], missionListConstant[i]]; // Swap elements
    } return missionListConstant;
}

function updateMissionImages(currentMissions) {
    const seasonHighlights = {
        'Spring': [0, 1],
        'Summer': [1, 2],
        'Autumn': [2, 3],
        'Winter': [3, 0]
    };

    const highlightIndexes = seasonHighlights[seasons[seasonCurrent]];

    ['A', 'B', 'C', 'D'].forEach((divId, index) => {
        const missionName = currentMissions[index];
        const image = missionImages[missionName];
        const divElement = document.getElementById(divId);

        if (image) {
            divElement.style.backgroundImage = image;
            toggleMissionHighlight(divElement, highlightIndexes.includes(index));
        }
    });
}

function toggleMissionHighlight(element, shouldHighlight) {
    if (shouldHighlight) {
        element.classList.add('mission-highlight');
    } else {
        element.classList.remove('mission-highlight');
    }
}


function updateMissionScores() {
    resetMissionScores();
    incrementSeasonScoresBasedOnCurrentSeason();
}

function resetMissionScores() {
    A = B = C = D = 0;
}

function incrementSeasonScoresBasedOnCurrentSeason() {
    switch(seasonCurrent) {
        case 1:
            incrementScoresForSpring(); break;
        case 2:
            incrementScoresForSummer(); break;
        case 3:
            incrementScoresForAutumn(); break;
        case 4:
            incrementScoresForWinter(); break;
    }
}

function incrementScoresForSpring() {
    A += seasonScores.Spring.mission1;
    B += seasonScores.Spring.mission2;
}

function incrementScoresForSummer() {
    B += seasonScores.Summer.mission1;
    C += seasonScores.Summer.mission2;
}

function incrementScoresForAutumn() {
    C += seasonScores.Autumn.mission1;
    D += seasonScores.Autumn.mission2;
}

function incrementScoresForWinter() {
    D += seasonScores.Winter.mission1;
    A += seasonScores.Winter.mission2;
}

function updateMissionScoresHighest() {
    const currentSeason = seasons[seasonCurrent];
    const currentSeasonMissions = {
        "Spring": [missionListConstant[0], missionListConstant[1]],
        "Summer": [missionListConstant[1], missionListConstant[2]],
        "Autumn": [missionListConstant[2], missionListConstant[3]],
        "Winter": [missionListConstant[3], missionListConstant[0]]
    }[currentSeason];

    currentSeasonMissions.forEach(mission => {
        const currentScore = scoreMission(mission);
        if (currentScore > highestMissionScores[mission]) {
            highestMissionScores[mission] = currentScore;
        }
    });
}

function updateMissionScoresDisplay(){
    const ADist = document.getElementById('mission-A-score');
    const BDist = document.getElementById('mission-B-score');
    const CDist = document.getElementById('mission-C-score');
    const DDist = document.getElementById('mission-D-score');

    ADist.textContent = `${A} points`
    BDist.textContent = `${B} points`
    CDist.textContent = `${C} points`
    DDist.textContent = `${D} points`
}