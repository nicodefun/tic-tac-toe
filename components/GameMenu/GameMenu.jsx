/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Fragment } from "react";
import styles from "./GameMenu.module.css";
import Symbol from "../Symbol";

export default function GameMenu({ firstPlayer, getGame, selectPlayer }) {
  let classes = `${styles.active}`;

  function selectPlayerHandler(e) {
    selectPlayer(e.target.dataset.id);
  }

  return (
    <Fragment>
      <Symbol style={"lg"} size={32} type={"logo"} />
      <div className={styles["pick-container"]}>
        <h2>PICK PLAYER 1'S MARK</h2>
        <div className={styles["pick-box"]}>
          <button
            data-id="x"
            onClick={selectPlayerHandler}
            className={firstPlayer === "x" ? `${classes}` : ""}
          >
            <Symbol
              type="x"
              size={32}
              color={firstPlayer === "x" ? "#1F3641" : "#A8BFC9"}
            />
          </button>
          <button
            data-id="o"
            onClick={selectPlayerHandler}
            className={firstPlayer === "o" ? `${classes}` : ""}
          >
            <Symbol
              type="o"
              size={32}
              color={firstPlayer === "o" ? "#1F3641" : "#A8BFC9"}
            />
          </button>
        </div>
        <p>REMEMBER : X GOES FIRST</p>
      </div>
      <div className={styles["game-choice"]}>
        <button onClick={()=>getGame('cpu')}>NEW GAME (VS CPU)</button>
        <button onClick={()=>getGame('player')}>NEW GAME (VS PLAYER)</button>
      </div>
    </Fragment>
  );
}
