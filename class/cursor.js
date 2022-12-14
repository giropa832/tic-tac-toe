const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    this.resetBackgroundColor();
    // Move cursor up
    if (this.row > 0) this.row--;
    this.setBackgroundColor();
    Screen.render();
  }

  down() {
    this.resetBackgroundColor();
    // Move cursor down
    if (this.row < 2) this.row++;
    this.setBackgroundColor();
    Screen.render();
  }

  left() {
    // Move cursor left
    this.resetBackgroundColor();
    if (this.col > 0) this.col--;
    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    // Move cursor right
    this.resetBackgroundColor();
    if (this.col < 2) this.col++;
    this.setBackgroundColor();
    Screen.render();
  }

}


module.exports = Cursor;
