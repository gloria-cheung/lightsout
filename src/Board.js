import {useState} from "react";
import Cell from "./Cell";
import './Board.css';

function Board(props) {
  const {nrows, ncols, chanceLightStartsOn} = props

  // creates array of arrays of true / false for board
  const createBoard = function() {
    let board = [];
    for (let y = 0; y < nrows; y ++) {
      let row = [];
      for (let x = 0; x < ncols; x ++) {
        if (Math.random() < chanceLightStartsOn) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
      board.push(row);
    }
    return board
  };

  const [state, setState] = useState({
    hasWon: false,
    board: createBoard()
  });

   /** handle changing a cell: update board & determine if winner */
   const flipCellsAround = function(coord) {
    let board = state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
   };
     // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // setState({board, hasWon});
  }

  const tableBoard = [];
  for (let y = 0; y < nrows; y ++) {
    let row = [];
    for (let x = 0; x < ncols; x ++) {
      let coord = `${y}-${x}`;
      row.push(<Cell key={coord} isLit={state.board[y][x]} />);
    }
    tableBoard.push(<tr key={y} >{row}</tr>);
  }

  // if the game is won, just show a winning msg & render nothing else TODO
  
  return (
    <table className="Board">
      <tbody>
        {tableBoard}
      </tbody>
    </table>
  );
}

export default Board;
