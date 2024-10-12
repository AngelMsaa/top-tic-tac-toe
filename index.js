function createGameboard() {
    return {
        tiles: [],
    }
}

function createPlayer(name, team) {
    return  {
        name: name,  
        team: team,
    }
}

function createGame() {
    const start = TODO;
    const players = [];
    const round = "x";
    
    startGame();

    function startGame() {

        // TODO: ask user for input for name

        const player1 = createPlayer(name1, "x");
        const player2 = createPlayer(name2, "o");

        players.push(player1, player2);
    }

    function startRound() {
        if (round = "x") {

            round = "o";
        } else {

            round = "x";
        }
    }
}

let game = createGame();
game.start();

const button = document.querySelector("#start");
const gameboard = document.querySelector(".gameboard");

function handleClick() {
    
}

