
const GameBoard = (function() {
  let gameboard = [
    null, null, null,
    null, null, null,
    null, null, null
  ];

  // Document queries
  const boardContainer = document.getElementById('boardContainer');
  
  _render();

   // Bind events
  function _bindEvents(arr) {
   arr.forEach(function(space) {
    space.onclick = e => {
      if (PlayGame.checkSpace(space.getAttribute("data-index"))) {
        space.classList.add(PlayGame.checkTurn())
        space.innerText = PlayGame.checkTurn()
        PlayGame.takeTurn(space.getAttribute("data-index"))
        }
      }
    })
  }

  // Creates divs for each element in the gameboard array and puts them into $board
  function _render() {
    documentBoard = []
    _clearBoard();
    gameboard.forEach(function(space, index) {
      const boardspace = document.createElement('div');
      boardspace.classList.add("space", space)
      boardspace.innerText = space
      boardspace.setAttribute("data-index", index)
      boardContainer.appendChild(boardspace)
      documentBoard.push(boardspace)
    });
    _bindEvents(documentBoard)
  }

  function _clearBoard() {
    boardContainer.innerHTML = '';
  }

  function viewBoardArr() {
    return gameboard
  }

  // Resets the game board array to null values for use in other modules to restart the game.
  function resetBoard() {
    gameboard.forEach(function(space, index) { 
      this[index] = null; 
    }, gameboard)
    _render()
  }

  // Overwrites a space in the game's board array and renders the updated board.
  function updateSpaceArr(index, token) {
    if (!(token == "X" || token == "O")) {
      return
    }
    if (PlayGame.checkSpace(index)) { 
      gameboard[index] = token
    }
    else { 
      console.log("Space not available")
      return false;
     }
    _render()
  }

  return { updateSpaceArr, resetBoard, viewBoardArr }
})();

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return {name, getName, getToken}
};

const PlayGame = (function() {
  // Create player placeholders and turn tracker
  const playerX = Player("Player1", "X");
  const playerO = Player("Player2", "O");
  let turns = 1;

  // Document queries
  const startGameForm = document.getElementById("playerNameForm");
  const playerContainer = document.getElementById("playerContainer");
  const playerNameContainer = document.getElementById("playerNameContainer")
  const gameOverContainer = document.getElementById("gameOverContainer");
  const gameOverPopUp = document.getElementById("gameOverPopUp");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const resetBtn = document.getElementById("resetBtn");
  const boardContainer = document.getElementById("boardContainer");

  // Bind Events
  startGameForm.addEventListener("submit", _startGame)
  playAgainBtn.addEventListener("click", _resetGame)
  resetBtn.addEventListener("click", _resetGame)

  function takeTurn(index) {
    GameBoard.updateSpaceArr(index, checkTurn())
    turns +=1;
    if (_checkWin()) {
      _gameOver()
    }
  }

  function checkSpace(index)
  {
    currentBoard = GameBoard.viewBoardArr()
    if (currentBoard[index] == null) {
      return true
    }
    else { return false }
  }

  function checkTurn()
  {
    if (turns % 2 == 0) { return playerO.getToken()}
    else { return playerX.getToken()}
  }

  function _startGame(event) {
    event.preventDefault()
    boardContainer.style.visibility = "visible"
    // Assign player names from form submission
    playerX.name = document.getElementById("playerX").value
    playerO.name = document.getElementById("playerO").value

    // Create divs for player name fields
    const playerXDiv = document.createElement("div");
    playerXDiv.classList.add("nameField", "btn", "player")
    const playerODiv = document.createElement("div");
    playerODiv.classList.add("nameField", "btn", "player")

    // Create container to hold name fields above.
    const playerNameDiv = document.createElement("div");
    playerNameDiv.classList.add("playerNameFields")

    playerXDiv.innerText = `Player X: ${playerX.name}`
    playerODiv.innerText = `Player O: ${playerO.name}`

    startGameForm.style.display = "none"
    resetBtn.style.display = "block"
    
    playerNameDiv.appendChild(playerXDiv)
    playerNameDiv.appendChild(playerODiv)
    playerNameContainer.appendChild(playerNameDiv)
    
  }

  function _checkWin() {
    currentBoard = GameBoard.viewBoardArr();
    if ((currentBoard[0] == "X" && currentBoard[1] == "X" && currentBoard[2] == "X") || 
        (currentBoard[3] == "X" && currentBoard[4] == "X" && currentBoard[5] == "X") ||
        (currentBoard[6] == "X" && currentBoard[7] == "X" && currentBoard[8] == "X") ||
        (currentBoard[0] == "X" && currentBoard[3] == "X" && currentBoard[6] == "X") ||
        (currentBoard[1] == "X" && currentBoard[4] == "X" && currentBoard[7] == "X") ||
        (currentBoard[2] == "X" && currentBoard[5] == "X" && currentBoard[8] == "X") ||
        (currentBoard[0] == "X" && currentBoard[4] == "X" && currentBoard[8] == "X") ||
        (currentBoard[2] == "X" && currentBoard[4] == "X" && currentBoard[6] == "X"))
      {return playerX;}
    else if ((currentBoard[0] == "O" && currentBoard[1] == "O" && currentBoard[2] == "O") || 
      (currentBoard[3] == "O" && currentBoard[4] == "O" && currentBoard[5] == "O") ||
      (currentBoard[6] == "O" && currentBoard[7] == "O" && currentBoard[8] == "O") ||
      (currentBoard[0] == "O" && currentBoard[3] == "O" && currentBoard[6] == "O") ||
      (currentBoard[1] == "O" && currentBoard[4] == "O" && currentBoard[7] == "O") ||
      (currentBoard[2] == "O" && currentBoard[5] == "O" && currentBoard[8] == "O") ||
      (currentBoard[0] == "O" && currentBoard[4] == "O" && currentBoard[8] == "O") ||
      (currentBoard[2] == "O" && currentBoard[4] == "O" && currentBoard[6] == "O"))
      {return playerO;}
    else {return false}
  }

  function _gameOver() {
    winner = _checkWin()
    if (winner) {
      gameOverContainer.style.display = "flex"
      const winnerDiv = document.createElement('h2');
      winnerDiv.innerText = `${winner.name} Won!`
      gameOverPopUp.prepend(winnerDiv)
    }
  }

  function _resetGame() {
    turns = 1
    GameBoard.resetBoard()
    gameOverPopUp.removeChild(gameOverPopUp.childNodes[0])
    gameOverContainer.style.display = "none"
    boardContainer.style.display = "none"
    resetBtn.style.display = "none"
    playerNameContainer.innerHTML = ''
    startGameForm.reset()
    startGameForm.style.display = "flex"
    
  }
  return {takeTurn, checkTurn, checkSpace}
})();