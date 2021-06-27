
const GameBoard = (function() {
  let gameboard = [
    'X', 'O', 'X',
    'O', 'X', 'O',
    'X', 'O', 'X'
  ];

  const boardContainer = document.getElementById('boardContainer')

  render();

  function render() {
    // Creates divs for each element in the gameboard array and puts them into $board
    gameboard.forEach(function(space) {
      console.log(space);
      const boardspace = document.createElement('div');
      boardspace.classList.add("space", space);
      boardspace.innerText = space;
      boardContainer.appendChild(boardspace);
    })
  }
})();

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return {getName, getToken}
};

const displayBoard = {

}

const PlayGame = (function() {

  const board = GameBoard;

  console.log('Here comes the game')
})();