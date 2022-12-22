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

  static checkWin(grid) {

    const horizontalWinX = ['X','X','X'];
    const horizontalWinO = ['O','O','O'];

   //Horizontal Win

    for (let i = 0; i < grid.length; i++) {
      if (grid[i].toString() == horizontalWinX.toString()) {
        return 'X';
      };
      if (grid[i].toString() == horizontalWinO.toString()) {
        return 'O';
      };
      if (grid[0][i] == 'X' && grid[1][i] == 'X' && grid[2][i] == 'X') {
        return 'X';
      };
      if (grid[0][i] == 'O' && grid[1][i] == 'O' && grid[2][i] == 'O') {
        return 'O';
      };
    };

    //Vertical Win

    if(grid[0][0] == 'X' && grid[1][1] == 'X' && grid[2][2] == 'X') {
      return 'X';
    };

    if (grid[0][0] == 'O' && grid[1][1] == 'O' && grid[2][2] == 'O') {
      return 'O';
    };

    //Diagonal Wins

    if (grid[0][2] == 'X' && grid[1][1] == 'X' && grid[2][0] == 'X') {
      return 'X';
    }

    if (grid[0][2] == 'O' && grid[1][1] == 'O' && grid[2][0] == 'O') {
      return 'O';
    }

    // Blank Spaces

    for (let i = 0; i < grid.length; i++) {
      if(grid[0].includes(' ')) {
        return false;
      }
    }

    return 'T';

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
