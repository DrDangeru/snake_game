// import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useRef } from 'react'
import GamePieces from './GamePieces';
import Modal from './Modal';

function GameState ({onGameOver}){
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore') || 0));
  const [gameOver, setGameOver] = useState(false);
  const gamePiecesRef = useRef(null);

  const handleGameOver = (reason) => {
    setGameOver(true);
    
    if (score > highScore) {
      localStorage.setItem('highScore', score.toString());
      setHighScore(score);
    }
    
    onGameOver(reason);
  };

  const handleRestart = () => {
    if (gamePiecesRef.current && gamePiecesRef.current.resetGame) {
      gamePiecesRef.current.resetGame();
    }
    setGameOver(false);
    setScore(0);
    setHighScore(parseInt(localStorage.getItem('highScore') || 0));
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Score: {score}</h2>
        <h3>High Score: {highScore}</h3>
      </div>
      <GamePieces
        ref={gamePiecesRef}
        score={score}
        setScore={setScore}
        onGameOver={handleGameOver}
      />
      <Modal
        isOpen={gameOver}
        onClose={handleRestart}
        score={score}
        highScore={highScore}
      />
    </div>
  );
}

export default GameState;