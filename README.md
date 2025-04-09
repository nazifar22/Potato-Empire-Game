# potato empire game

In this project, I developed a tile-based browser game set in the whimsical Potato Empire. The goal is to help Empress French Frie explore and settle unknown land by placing shuffled map elements—representing forests, farms, villages, and water—on an 11x11 grid map. Each tile has a time value (1 or 2 units), and the game ends when 28 time units are used up.

The map starts with five fixed mountains on the grid. Tiles are randomly drawn from a predefined set and can be rotated and mirrored before placement. Tiles cannot overlap mountains or extend outside the grid. Players place shapes by clicking on valid locations, with the interface preventing illegal placements.

The game randomly selects four mission cards at the start. Each mission gives points for specific patterns, such as forest tiles on the edge or water adjacent to farms. The 28 time units represent a year, split into four seasons (spring, summer, autumn, winter), each lasting 7 time units. At the end of each season, two missions are scored, and at game end, all mission scores are totaled.

I used HTML and CSS to build a responsive grid layout and styled the terrain using background colors/images. The game logic is implemented in JavaScript, using a matrix to represent the board state and handling tile placement, shape rotation/mirroring, mission scoring, time tracking, and seasonal logic. All interactions, such as tile hovering, placement, and button presses (rotate/mirror), are handled through event listeners and dynamically update the UI.

How to Use:
Open the game in a web browser.
The grid appears with 5 fixed mountains.
A terrain shape and its time unit are shown.
Use Rotate and Mirror buttons to adjust the shape.
Click a valid square on the grid to place it.
Track the season and missions as time progresses.
The game ends after 28 time units; final scores are displayed.
