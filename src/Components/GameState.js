// import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react'
import GamePieces from './GamePieces';

function GameState ({onGameOver}){
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore') || 0));
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollision] = useState('');

  const handleGameOver = (reason) => {
    setGameOver(true);
    
    if (score > highScore) {
      localStorage.setItem('highScore', score.toString());
      setHighScore(score);
    }
    
    onGameOver(reason); // Pass through to parent
    setScore(0);
  };

  const handleGameReset = () => {
    setScore(0);
    setGameOver(false);
  }
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === 'Enter') {
        handleGameReset(); //reset
      }
    }
    window.addEventListener('keydown', handleKeyPress);
  }, [gameOver])

  

  return (
    <div className='game-container'>
      <GamePieces 
        score={score}
        setScore={setScore}
        onGameOver={handleGameOver}
      />
      <p className='score'>Score: {score}</p>
      <p className='highScore'>High Score: {highScore}</p>
      {gameOver && (
        <button onClick={handleGameReset}>Play Again</button>
      )}
    </div>
  )
}

export default GameState;