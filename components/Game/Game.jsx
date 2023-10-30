/* eslint-disable react/prop-types */
import styles from "./Game.module.css";
import Symbol from "../Symbol";
import GameBoard from "./GameBoard";
import { Fragment, useEffect, useState } from "react";
import Modal from "./Modal";
import { WINNING_COMBINATIONS } from "../../src/winning";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const initialScores = {
  firstplayer: 0,
  secondplayer: 0,
  tie: 0,
  round: 0,
};

export default function Game({ firstPlayer, onExit, secondPlayer, withCPU }) {
  const [gameBoard, setGameBoard] = useState(intialGameBoard);
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState(initialScores);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (withCPU && turn === secondPlayer && !winner) {
      setGameBoard((prevGameBoard) => {
        const updatedBoard = [
          ...prevGameBoard.map((innerArray) => [...innerArray]),
        ];
        const move = getRandomMove(updatedBoard);
        if (move !== null) {
          updatedBoard[move.rowIndex][move.colIndex] = secondPlayer;
        }
        checkWinner(updatedBoard);
        return updatedBoard;
      });
      setTurn(firstPlayer);
    }
  }, [winner, turn, withCPU, secondPlayer, firstPlayer, isInitialRender]);

  const checkWinner = (gameBoard) => {
    let winnerFound = false;

    for (const combination of WINNING_COMBINATIONS) {
      const firstSqauareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSqauareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSqauareSymbol =
        gameBoard[combination[2].row][combination[2].column];

      if (
        firstSqauareSymbol &&
        firstSqauareSymbol === secondSqauareSymbol &&
        firstSqauareSymbol === thirdSqauareSymbol
      ) {
        setWinner(firstSqauareSymbol);
        winnerFound = true;
        break;
      }
    }

    if (!winnerFound) {
      let isBoardFull = true;
      for (const row of gameBoard) {
        for (const cell of row) {
          if (cell === null) {
            isBoardFull = false;
            break;
          }
        }
        if (!isBoardFull) {
          break;
        }
      }

      if (isBoardFull) {
        setWinner("tie");
      }
    }
  };

  function nextRound(actualWinner) {
    restartHandler();
    updateScores(actualWinner);
    setWinner(null);
  }

  function updateScores(actualWinner) {
    if (actualWinner === firstPlayer) {
      setScores((prevScores) => ({
        ...prevScores,
        firstplayer: prevScores["firstplayer"] + 1,
        round: prevScores["round"] + 1,
      }));
    }
    if (actualWinner === secondPlayer) {
      setScores((prevScores) => ({
        ...prevScores,
        secondplayer: prevScores["secondplayer"] + 1,
        round: prevScores["round"] + 1,
      }));
    }
    if (actualWinner === "tie") {
      setScores((prevScores) => ({
        ...prevScores,
        tie: prevScores["tie"] + 1,
        round: prevScores["round"] + 1,
      }));
    }
  }

  function getRandomMove(gameBoard) {
    const availableMoves = [];

    gameBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === null) {
          availableMoves.push({ rowIndex: +i, colIndex: +j });
        }
      });
    });
    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
    return null;
  }

  function clickBtnHandler(rowIndex, colIndex) {
    // console.log(rowIndex, colIndex)
    console.log(turn);
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];

      if (turn === "x") {
        updatedBoard[rowIndex][colIndex] = "x";
        setTurn("o");
      }
      if (turn === "o") {
        updatedBoard[rowIndex][colIndex] = "o";
        setTurn("x");
      }

      checkWinner(updatedBoard);
      return updatedBoard;
    });
  }

  function restartHandler() {
    setGameBoard(intialGameBoard);
    setTurn("x");
  }

  function formatPlayer(player) {
    return player.toUpperCase();
  }

  return (
    <Fragment>
      {winner && (
        <Modal
          winner={winner}
          onExit={onExit}
          nextRound={nextRound}
          firstPlayer={firstPlayer}
          secondPlayer={secondPlayer}
        />
      )}

      <div className={styles["container"]}>
        <div className={styles.header}>
          <Symbol size={20} style="sm" />
          <button className={styles.turn} onClick={() => onExit(false)}>
            <Symbol type={turn} size={15} style="sm" color={"#A8BFC9"} />
            <h3>TURN</h3>
          </button>
          <button className={styles.restart} onClick={restartHandler}>
            <Symbol type={"restart"} size={15} />
          </button>
        </div>
        <GameBoard
          onClick={clickBtnHandler}
          gameBoard={gameBoard}
          turn={turn}
        />
        <div className={styles.bottom}>
          <button>
            <p>
              {formatPlayer(firstPlayer)}
              <br />
              (First Player)
            </p>
            <p>{scores.firstplayer}</p>
          </button>
          <button>
            <p>TIES</p>
            <p>{scores.tie}</p>
          </button>
          <button>
            <p>
              {formatPlayer(secondPlayer)}
              <br />
              {withCPU ? "(CPU)" : "(Second Player)"}
            </p>
            <p>{scores.secondplayer}</p>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
