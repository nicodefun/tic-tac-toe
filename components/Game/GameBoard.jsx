/* eslint-disable react/prop-types */
import styles from "./GameBoard.module.css";
import { useEffect, useState } from "react";
import Symbol from "../Symbol";


export default function GameBoard({ gameBoard, onClick }) {
  const [displayBoard, setDisplayBoard] = useState([]);

  useEffect(() => {
    // Convert the gameBoard array to hold React components
    const transformedBoard = gameBoard.map(row =>
      row.map((symbol, index) => {
        if (symbol === 'x') {
          return <Symbol key={index} type='x' />;
        } else if (symbol === 'o') {
          return <Symbol key={index} type='o' />;
        }
        return null;
      })
    );
    setDisplayBoard(transformedBoard);
  }, [gameBoard]);

  return (
    <ol className={styles["game-board"]}>
      {displayBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled={playerSymbol !== null}
                  onClick={() => onClick(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}