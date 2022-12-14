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

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    const horizontalWinX = ['X','X','X'];
    const horizontalWinO = ['O','O','O'];

   

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

    if(grid[0][0] == 'X' && grid[1][1] == 'X' && grid[2][2] == 'X') {
      return 'X';
    };

    if (grid[0][0] == 'O' && grid[1][1] == 'O' && grid[2][2] == 'O') {
      return 'O';
    };

    if (grid[0][2] == 'X' && grid[1][1] == 'X' && grid[2][0] == 'X') {
      return 'X';
    }

    if (grid[0][2] == 'O' && grid[1][1] == 'O' && grid[2][0] == 'O') {
      return 'O';
    }

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
