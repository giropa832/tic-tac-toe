const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.addCommand('up', 'move cursor up', () => this.cursor.up());
    Screen.addCommand('down', 'move cursor down', () => this.cursor.down());
    Screen.addCommand('left', 'move cursor left', () => this.cursor.left());
    Screen.addCommand('right', 'move cursor right', () => this.cursor.right());
    Screen.addCommand('p', 'place move', this.placeMove);


    Screen.render();
  }

  switchPlayer = () => {
    if (this.playerTurn === 'X') {
      this.playerTurn = 'O';
    } else {
      this.playerTurn = 'X';
    }
  }

  placeMove = () => {
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;

      let win = TTT.checkWin(this.grid);
      this.switchPlayer();
      if (win) {
        TTT.endGame(win);
      }
      Screen.setMessage(`It is ${this.playerTurn}'s turn`);
    } else {
      Screen.setMessage("Choose an open spot");
    }

    Screen.render();
  }

  TTT = {}

static checkWin(grid) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (grid[i][0] !== ' ' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
        return grid[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (grid[0][i] !== ' ' && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
        return grid[0][i];
      }
    }

    // Check diagonals
    if (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return grid[0][0];
    }
    if (grid[0][2] !== ' ' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return grid[0][2];
    }

    // Check for tie
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === ' ') {
          isTie = false;
        }
      }
    }
    if (isTie) {
      return 'T';
    }

    // No winner yet
    return false;
  }





  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
