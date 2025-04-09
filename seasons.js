const seasons = ["Spring", "Summer", "Autumn", "Winter"];

let seasonCurrent = 0;
let seasonCurrentTime = 0;
let elementCurrent;
let elementTimeRemaining = 28;

let seasonScores = {
    "Spring": { "mission1": 0, "mission2": 0 },
    "Summer": { "mission1": 0, "mission2": 0 },
    "Autumn": { "mission1": 0, "mission2": 0 },
    "Winter": { "mission1": 0, "mission2": 0 }
};

// Handles the transition between seasons
function seasonChange() {
    updateCurrentSeason();
    resetSeasonTime();
    updateDisplaysAfterSeasonChange();
}

function updateCurrentSeason() {
    seasonCurrent = (seasonCurrent + 1) % seasons.length;
}

function resetSeasonTime() {
    seasonCurrentTime = 0;
}

function updateDisplaysAfterSeasonChange() {
    updateTimeRemainingDisplay();
    updateSeasonDisplay();
    updateMissionImages(missionListConstant);
    updateMissionScores();
    updateMissionScoresDisplay();
}

// Updates the display for the current season
function updateSeasonDisplayCurrent() {
    const currentSeasonDisplay = document.getElementById('Current');
    const seasonSuffix = getSeasonLables(seasonCurrent);
    currentSeasonDisplay.textContent = `Current Season: ${seasons[seasonCurrent]} ${seasonSuffix}`;
}

function getSeasonLables(seasonIndex) {
    const seasonLables = {
        'Spring': 'AB',
        'Summer': 'BC',
        'Autumn': 'CD',
        'Winter': 'DA'
    };
    return seasonLables[seasons[seasonIndex]] || '';
}

// Updates the display for all seasons
function updateSeasonDisplay() {
    seasons.forEach(updateSeasonScoreDisplay);
}

function updateSeasonScoreDisplay(season) {
    const seasonDiv = document.getElementById(season);
    const score = getSeasonScore(season);
    seasonDiv.innerHTML = `${season}: <span>${score} points</span>`;
}

function getSeasonScore(season) {
    return seasonScores[season].mission1 + seasonScores[season].mission2;
}