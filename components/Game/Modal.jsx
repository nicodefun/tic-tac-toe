/* eslint-disable react/prop-types */
import styles from "./Modal.module.css";
import Symbol from "../Symbol";
import { useState, useEffect } from "react";

export default function Modal({
  winner,
  onExit,
  nextRound,
  firstPlayer,
  secondPlayer,
}) {
  const [banner, setBanner] = useState("");

  useEffect(() => {
    if (winner === "tie") {
      setBanner("A draw!!!");
    } else if (winner === firstPlayer) {
      setBanner("Player 1 wins!!!");
    } else if (winner === secondPlayer) {
      setBanner("Player 2 wins!!!");
    }
  }, [winner, firstPlayer, secondPlayer]);

  function winnerResult(winner) {
    const green = winner === "x" ? `${styles.green}` : "";
    const color = winner === "x" ? "#31C3BD" : "#F2B137";
    if (winner === "tie") {
      return (
        <div className={styles.result}>
          <h2 className={styles.white}>ROUND TIED</h2>
        </div>
      );
    }

    return (
      <div className={styles.result}>
        <Symbol type={winner} color={color} size={30} />
        <h2 className={green}>TAKES THE ROUND</h2>
      </div>
    );
  }


  function nextRoundHandler(actualWinner) {
    nextRound(actualWinner);
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <p>{banner}</p>
        {winnerResult(winner)}
        <div className={styles.btns}>
          <button onClick={()=>onExit(false)}>QUIT</button>
          <button onClick={() => nextRoundHandler(winner)}>NEXT ROUND</button>
        </div>
      </div>
    </div>
  );
}
