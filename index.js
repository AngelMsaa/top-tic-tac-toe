let game = null;

const bodySelector = document.querySelector("body");
const headerSelector = document.querySelector("header");

const display = createDisplay();

const bodyListener = bodySelector.addEventListener("click", handleClick);

function createGameboard() {
    return {
        tiles: {
            "c1": null, "c2": null, "c3": null,
            "c4": null, "c5": null, "c6": null,
            "c7": null, "c8": null, "c9": null
        }, 
        
    }
}

function createPlayer(name, team) {
    return  {
        name: name,  
        team: team,
    }
}

function createGame() {
    let players = [];
    let gameboard = null;
    let winner = null;
    let currentRound = "x";
    let roundCounter = 0;

    function startGame() {
        const player1 = createPlayer("Player 1", "x");
        const player2 = createPlayer("Player 2", "o");

        gameboard = createGameboard();
        players.push(player1, player2);
    }

    function makeMove(id) {
        if (!gameboard.tiles[id]) { // Check if the cell is empty
            let selectedTile = document.querySelector(`#${id}`);
            let token = document.createElement("span");
            token.classList.add("token");
            token.textContent =  currentRound;
            
            selectedTile.append(token);
            gameboard.tiles[id] = currentRound;
            return true;
        } else {
            return false;
        }
    }

    function nextRound() {
        currentRound = (currentRound === "x") ? "o" : "x";
        console.log(currentRound);
        roundCounter++;
    }

    function checkWin() {
        const winningCombinations = [
            ["c1", "c2", "c3"], // Horizontal wins
            ["c4", "c5", "c6"],
            ["c7", "c8", "c9"],
            ["c1", "c4", "c7"], // Vertical wins
            ["c2", "c5", "c8"],
            ["c3", "c6", "c9"],
            ["c1", "c5", "c9"], // Diagonal wins
            ["c3", "c5", "c7"]
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameboard.tiles[a] && gameboard.tiles[a] === gameboard.tiles[b] && gameboard.tiles[a] === gameboard.tiles[c]) {

                // Colors the winning combination red
                document.querySelector(`#${a}`).classList.add("winner");
                document.querySelector(`#${b}`).classList.add("winner");
                document.querySelector(`#${c}`).classList.add("winner");

                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        const tiles = gameboard.tiles;
        let counter = 0;
        
        for (const tile of Object.values(tiles)) {
            if (tile != null) {
                counter++;
            }
        }

        return (counter === 9) ? true : false;
    }

    function endGame() {
        const winningText = document.createElement("span");
        winningText.classList.add("winning-text")
        winningText.textContent = getFinalText();

        headerSelector.append(winningText);

        function getFinalText() {
            if (winner) {
                const winnerName = (winner === "x") ? "Player 1" : "Player 2";
                return `${winnerName} wins!`;
            } else {
                return "It's a draw!";
            }
        }

        const replayButton = document.createElement("button");
        replayButton.textContent = "Replay";
        replayButton.classList.add("button-4");
        replayButton.setAttribute("id", "replay");
        headerSelector.append(replayButton);

        display.deleteDisplay();
        game = null;
        
    }

    return {
        startGame,
        makeMove,
        nextRound,
        checkWin,
        checkDraw,
        endGame,
        get currentRound() {
            return currentRound;
        },
        set winner(value) {
            winner = value;
        } 
    }
}

function handleClick(event) {
    if (event.target && event.target.id === "start") {

        event.target.remove() // Removes start button
        display.showDisplay();

        game = createGame();
        game.startGame();
    } else if (game) { // Only executed if the game is in progress
        if (event.target && event.target.className === "cell") {
            if (game.makeMove(event.target.id)) {
                if (game.checkWin()) {
                    game.winner = game.currentRound;
                    game.endGame();
                } else if (game.checkDraw()) {
                    game.endGame();
                } else {
                    game.nextRound();
                }
            }
        }
    } else if (event.target && event.target.id === "replay") {
        event.target.remove() // Removes start button
        display.showDisplay;

        const tokens = document.querySelectorAll(".token");
        tokens.forEach(token => token.remove());

        const winningCells = document.querySelectorAll(".winner");
        winningCells.forEach(cell => cell.classList.remove("winner"));

        const winnerText = document.querySelector(".winning-text")
        winnerText.remove();

        game = createGame();
        game.startGame();
    }
}

function createDisplay() {
    const roundDisplayContainer = document.createElement("div");
    roundDisplayContainer.classList.add("display-container");

    const roundDisplayText1 = document.createElement("span");
    roundDisplayText1.classList.add("display-text-1");
    roundDisplayText1.textContent = "Player 1";

    const roundDisplayText2 = document.createElement("span");
    roundDisplayText2.classList.add("display-text-2");
    roundDisplayText2.textContent = "Player 2";

    roundDisplayContainer.appendChild(roundDisplayText1, roundDisplayText2);

    function showDisplay() {
        headerSelector.appendChild(roundDisplayContainer);
    }

    function updateDisplay() {
        const roundDisplayText1Selector = document.querySelector("display-text-1");
        const roundDisplayText2Selector = document.querySelector("display-text-2");

        roundDisplayText1Selector.textContent = (roundDisplayText1Selector.textContent === "Player 1") ? "Player 2" : "Player 1";
        roundDisplayText2Selector.textContent = (roundDisplayText2Selector.textContent === "Player 2") ? "Player 1" : "Player 2";
    }

    function deleteDisplay() {
        roundDisplayContainer.remove();
    }

    return {
        showDisplay,
        updateDisplay,
        deleteDisplay,
    }
}
