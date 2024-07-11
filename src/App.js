import React from 'react';
import './style.css';

const initialBoard = () => {
  return Array(9).fill(null);
};

export default function App() {
  const [board, setBoard] = React.useState(initialBoard);
  const [isNext, setIsNext] = React.useState(true);
  const [winner, setWinner] = React.useState(null);

  const divRefs = React.useRef([]);

  const WINNING_PATERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log(winner);

  React.useEffect(() => {
    const win = calculateWinner(board);
    setWinner(win);
  }, [board]);

  function resetGame() {
    setBoard(initialBoard);
    setIsNext(true);
    divRefs.current.forEach((div, index) => {
      if (div) {
        div.style.backgroundColor = 'grey';
      }
    });
  }

  function calculateWinner(currentBoard) {
    for (let i = 0; i < WINNING_PATERNS.length; i++) {
      const [a, b, c] = WINNING_PATERNS[i];
      if (
        currentBoard[a] &&
        currentBoard[a] == currentBoard[b] &&
        currentBoard[a] == currentBoard[c]
      ) {
        divRefs.current[a].style.backgroundColor = 'green';
        divRefs.current[b].style.backgroundColor = 'green';
        divRefs.current[c].style.backgroundColor = 'green';
        return currentBoard[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    divRefs.current[index].style.backgroundColor = 'black';
    console.log(index);
    const win = calculateWinner(board);
    //setWinner(win);
    if (win || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsNext(!isNext);
  }

  function getStatusMessage() {
    if (winner) {
      return <h1 style={{ color: 'green' }}>Player {winner} wins !</h1>;
    } else if (!winner && !board.includes(null)) {
      return <h1 style={{ color: 'red' }}>It's is a draw !</h1>;
    } else {
      return <h1>{isNext ? 'Player X turn' : 'Player O turn'}</h1>;
    }
  }

  return (
    <div style={{ display: 'block', AlignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'Space-around' }}>
        {getStatusMessage()}
        <button Style={{ color: 'grey' }} onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className="board"
          style={{ border: winner ? '1px solid green' : '1px solid grey' }}
        >
          {board.map((b, index) => (
            <button
              ref={(el) => (divRefs.current[index] = el)}
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
