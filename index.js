function handleClick(event) {
    if (event.target && event.target.id === "start") {
        let game = createGame();
        game.startGame();
    }

    if (event.target && event.target.className === "cell") {
        console.log("todo: handle click on cell");
    }
}

function createGameboard() {
    return {
        tiles: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    }
}

function createPlayer(name, team) {
    return  {
        name: name,  
        team: team,
    }
}

function createGame() {
    const players = [];
    let roundCounter = 0;
    let round = "x";
    let gameboard = null;

    function startGame() {
        const dialog = document.addElement("dialog")

        const player1 = createPlayer("Player 1", "x");
        const player2 = createPlayer("Player 2", "o");

        this.gameboard = createGameboard();
        this.players.push(player1, player2);
        this.startRound();
    }

    function startRound() {
        if (round === "x") {

            round = "o";
        } else {

            round = "x";
        }
        roundCounter++;
    }

    return {
        startGame,
        startRound,
    }
}

const bodySelector = document.querySelector("body");
const bodyListener = bodySelector.addEventListener("click", handleClick);
