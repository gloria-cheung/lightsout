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
    console.log("flipping", coord)
    let board = state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    };

    flipCell(y, x); //flip initial cell
    flipCell(y, x - 1); // flip left cell
    flipCell(y, x + 1); // flip right cell
    flipCell(y + 1, x); // flip top cell
    flipCell(y - 1, x); // flip botton cell

    //check to see if hasWon is true or false depending on if all cells are false
    let hasWon = board.every(row => row.every(cell => cell === false));

    setState({board, hasWon});
  }

  // render board if all cells are false (hasWon = true)
  const makeTable = function() {
    const tableBoard = [];
    for (let y = 0; y < nrows; y ++) {
      let row = [];
      for (let x = 0; x < ncols; x ++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell 
            key={coord} 
            isLit={state.board[y][x]} 
            flipCellsAroundMe={() => flipCellsAround(coord)}/>
        );
      }
      tableBoard.push(<tr key={y} >{row}</tr>);
    }

    return (
      <table className="Board">
        <tbody>
          {tableBoard}
        </tbody>
      </table>
    );
  };

  
  return (
    <div>
      {state.hasWon ? (
        <div className='winner'>
          <span className='neon-orange'>YOU</span>
          <span className='neon-blue'>WIN!</span>
        </div>
      ) : (
        <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            {makeTable()}
          </div>
      )}
    </div>
  )
}

export default Board;
