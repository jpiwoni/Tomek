import React, { useState, useEffect } from 'react';
import '../styles/dotsAndBoxes.css';

const DotsAndBoxesGame = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [numRed, setNumRed] = useState(0);
  const [numBlue, setNumBlue] = useState(0);
  const [turn, setTurn] = useState("red");
  const [winMessage, setWinMessage] = useState("");
  const [lineCoordinates, setLineCoordinates] = useState({});
  const [boxColors, setBoxColors] = useState({});

  useEffect(() => {
    initialBoard();
  }, [boardSize]);

  const initialBoard = () => {
    let newState = {lineCoordinates: {}, boxColors: {}};
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < boardSize + 1; j++) {
        for (let k = 0; k < boardSize; k++) {
          newState.lineCoordinates[`${i},${j},${k}`] = 0;
        }
      }
    }
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        newState.boxColors[`${i},${j}`] = "rgb(255,255,255)";
      }
    }
    setLineCoordinates(newState.lineCoordinates);
    setBoxColors(newState.boxColors);
    setNumRed(0);
    setNumBlue(0);
    setTurn("red");
    setWinMessage("");
  };

  const fillLine = (event) => {
    const currentCoord = event.target.dataset.coord;
    const newLines = { ...lineCoordinates };
    if (newLines[currentCoord] === 0) {
      newLines[currentCoord] = turn === "red" ? 1 : -1;
      setLineCoordinates(newLines);
      updateBoxesAndTurn(currentCoord);
    }
  };

  const updateBoxesAndTurn = (coord) => {
    const [i, j, k] = coord.split(',').map(Number);
    const newBoxColors = { ...boxColors };
    let madeSquare = false;

    if (checkSquare(j, k) === 4) {
      madeSquare = true;
      newBoxColors[`${j},${k}`] = turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)";
    } 

    if (checkSquare(j - 1, k) === 4) {
      madeSquare = true;
      newBoxColors[`${j - 1},${k}`] = turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)";
    } 

    setBoxColors(newBoxColors);
    if (madeSquare) {
      const newNumRed = numRed + (turn === "red" ? 1 : 0);
      const newNumBlue = numBlue + (turn === "blue" ? 1 : 0);
      setNumRed(newNumRed);
      setNumBlue(newNumBlue);
      checkGameOver();
    } else {
      setTurn(turn === "red" ? "blue" : "red");
    }
  };

  const checkSquare = (j, k) => {
    const checker1 = Math.abs(lineCoordinates[`0,${j},${k}`] || 0);
    const checker2 = Math.abs(lineCoordinates[`0,${j + 1},${k}`] || 0);
    const checker3 = Math.abs(lineCoordinates[`1,${k},${j}`] || 0);
    const checker4 = Math.abs(lineCoordinates[`1,${k},${j + 1}`] || 0);
    return checker1 + checker2 + checker3 + checker4;
  };

  const checkGameOver = () => {
    if (numRed + numBlue === boardSize * boardSize) {
      const message = numRed > numBlue ? "Red wins!" : numBlue > numRed ? "Blue wins!" : "Draw!";
      setWinMessage(`${message} Select a board size to start a new game.`);
    }
  };

  const changeBoardSize = (size) => {
    if (window.confirm('Are you sure you would like to start a new game?')) {
      setBoardSize(size);
    }
  };

  const tint = (event) => {
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      event.target.style.backgroundColor = turn === "red" ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)";
    }
  };

  const untint = (event) => {
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
        console.log("110");
      event.target.style.backgroundColor = "rgb(255,255,255)";
    }
  };

  const makeBoard = () => {
    const cols = [];
    for (let i = 0; i <= 2 * boardSize; i++) {
      const row = [];
      for (let j = 0; j <= 2 * boardSize; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            row.push(<div className="dot" key={`dot-${i/2}-${j/2}`} />);
          } else {
            row.push(<div className="horizContainer" data-coord={`0,${Math.floor(i/2)},${Math.floor(j/2)}`} onClick={fillLine} onMouseEnter={tint} onMouseLeave={untint} key={`h-${i/2}-${j/2}`} />);
          }
        } else {
          if (j % 2 === 0) {
            row.push(<div className="vertContainer" data-coord={`1,${Math.floor(j/2)},${Math.floor(i/2)}`} onClick={fillLine} onMouseEnter={tint} onMouseLeave={untint} key={`v-${j/2}-${i/2}`} />);
          } else {
            row.push(<div className="box" style={{ backgroundColor: boxColors[`${Math.floor(i/2)},${Math.floor(j/2)}`] }} key={`b-${i/2}-${j/2}`} />);
          }
        }
      }
      cols.push(<div className="row" key={`row-${i}`}>{row}</div>);
    }
    return <div id="game-board">{cols}</div>;
  };

  return (
    <div id="game">
      <div id="header">
        <h1 id="welcome">Dots &amp; Boxes</h1>
        <p id="score">Red: {numRed} Blue: {numBlue}</p>
        <div>
          Board size:
          <button onClick={() => changeBoardSize(5)}>5x5</button>
          <button onClick={() => changeBoardSize(8)}>8x8</button>
          <button onClick={() => changeBoardSize(11)}>11x11</button>
        </div>
        <p id="winner">{winMessage}</p>
      </div>
      <div id="board">
        {makeBoard()}
      </div>
    </div>
  );
};

export default DotsAndBoxesGame;

