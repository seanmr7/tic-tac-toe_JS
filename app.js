
const GameBoard = (function() {
  let gameboard = [
    null, 'O', 'X',
    'O', 'X', 'O',
    'X', 'O', 'X'
  ];

  const boardContainer = document.getElementById('boardContainer')

  _render();

  // Creates divs for each element in the gameboard array and puts them into $board
  function _render() {
    _clearBoard();
    gameboard.forEach(function(space, index) {
      console.log(space);
      const boardspace = document.createElement('div');
      boardspace.classList.add("space", space);
      boardspace.innerText = space;
      boardspace.setAttribute("data-index", index);
      boardContainer.appendChild(boardspace);
    })
  }

  function _clearBoard() {
    boardContainer.innerHTML = '';
  }

  // Resets the game board array to null values for use in other modules to restart the game.
  function resetBoard() {
    gameboard.forEach(function(space, index) { 
      this[index] = null; 
    }, gameboard);
    _render();
  }

  // Overwrites a space in the game's board array and renders the updated board.
  function updateSpace(index, token) {

    console.log(token);
    if (!(token == "X" || token == "O")) {
      return;
    }
    if (gameboard[index] == null) { gameboard[index] = token; }
    else { console.log("Space not available") }
    _render();
  }

  return {
    updateSpace,
    resetBoard 
  }
})();

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return {getName, getToken}
};

const PlayGame = (function() {
  const playerOne = Player("Player1", "X");
  const playerTwo = Player("Player2", "O");
  let turns = 1;

  gameboard = document.querySelectorAll('.space');
  // Bind events
  gameboard.forEach(function(space) {
    index = space.getAttribute("data-index");
    space.onclick = e => {
      console.log(e.target)
      takeTurn(space.getAttribute("data-index"));
    }
  })

  function takeTurn(index) {
    console.log(playerOne.getToken());
    console.log(index);
    GameBoard.updateSpace(index, playerOne.getToken());
    turns +=1;
  }

  function doSomething(something)
  {
    alert(something)
  }

  return {playerOne, playerTwo, gameboard}
})();