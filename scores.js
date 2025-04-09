// Function to get the current grid status
function scoreGrid() {
    const grid = [];
    for (let row = 0; row < 11; row++) {
        grid.push(getGridRow(row));
    }
    return grid;
}

function getGridRow(row) {
    const rowArray = [];
    for (let col = 0; col < 11; col++) {
        rowArray.push(getGridCellStatus(row, col));
    }
    return rowArray;
}

function getGridCellStatus(row, col) {
    const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    if (cell.classList.contains('mountain')) return 'mountain';
    if (cell.classList.contains('occupied')) return getCellType(cell);
    return 'empty';
}

function getCellType(cell) {
    return ['forest', 'farm', 'town', 'water'].find(type => cell.classList.contains(type));
}

// Function to calculate scores at the end of a season
function seasonEndScoring() {
    const currentSeasonMissions = getCurrentSeasonMissions();
    updateSeasonScores(currentSeasonMissions);
    updateDisplays();
}

function getCurrentSeasonMissions() {
    return {
        "Spring": [missionListConstant[0], missionListConstant[1]],
        "Summer": [missionListConstant[1], missionListConstant[2]],
        "Autumn": [missionListConstant[2], missionListConstant[3]],
        "Winter": [missionListConstant[3], missionListConstant[0]]
    }[seasons[seasonCurrent]];
}

function updateSeasonScores(currentSeasonMissions) {
    const currentSeason = seasons[seasonCurrent];
    seasonScores[currentSeason].mission1 = scoreMission(currentSeasonMissions[0]);
    seasonScores[currentSeason].mission2 = scoreMission(currentSeasonMissions[1]);
}

function updateDisplays() {
    updateSeasonDisplay();
    updateCurrentScoreDisplay();
    updateMissionScores();
    updateMissionScoresHighest();
    updateMissionScoresDisplay();
    updateMissionImages(getCurrentSeasonMissions());
    seasonTotalPoints();
}

// Functions related to calculating and displaying final scores
function calculateFinalScore() {
    let finalScoreText = `Total score: ${calculateTotalScore()}`;
    alert(finalScoreText);
    seasonTotalPoints();
    updateSeasonDisplayCurrent();
}

function calculateTotalScore() {
    let totalScore = 0;
    for (let season in seasonScores) {
        totalScore += seasonScores[season].mission1 + seasonScores[season].mission2;
    }
    return totalScore;
}

function seasonTotalPoints() {
    document.querySelector(".totalPoints").textContent = `Total: ${calculateTotalScore()} points`;
}

function updateCurrentScoreDisplay() {
    const currentScoreElement = document.getElementById('elapsedTimeTotal');
    currentScoreElement.textContent = `Elapsed time in current season: ${calculateCurrentScore()} / 7`;
}

function calculateCurrentScore() {
    return Object.values(seasonScores).reduce((total, season) => total + season.mission1 + season.mission2, 0);
}
