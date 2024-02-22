import React, { useContext } from 'react';
import Token from './components/gameplay/Token';
import StartGame from './components/start-game/StartGame';
import GlobalContext from './components/GlobalContext';

function App() {

  const { isGamePLaying } = useContext(GlobalContext);

  return (
    <>
      {isGamePLaying ? <Token /> : <StartGame />}
    </>
  );
}

export default App;
