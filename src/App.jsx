import { useState } from "react";
import GameMenu from "../components/GameMenu/GameMenu";
import Game from "../components/Game/Game";

function App() {
  const [isGaming, setIsGaming] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState("o");
  const [withCPU, setWithCPU] = useState(false);
  const [secondPlayer, setSecondPlayer] = useState('x');

  function getGameHandler(value) {
    if (value === "cpu") {
      setWithCPU(true);
    }
    setIsGaming(true);
  }
  function selectPlayerHandler(id) {
    setFirstPlayer(id);
    setSecondPlayer(id === 'x' ? 'o' : 'x');
  }
  function onExitHander(value) {
    setIsGaming(value);
  }

  return (
    <main>
      {!isGaming ? (
        <GameMenu
          getGame={getGameHandler}
          firstPlayer={firstPlayer}
          selectPlayer={selectPlayerHandler}
        />
      ) : (
        <Game
          withCPU={withCPU}
          firstPlayer={firstPlayer}
          onExit={onExitHander}
          secondPlayer={secondPlayer}
        />
      )}
    </main>
  );
}

export default App;
