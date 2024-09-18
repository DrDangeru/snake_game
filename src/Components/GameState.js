// import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect } from 'react'

const GameState = () => {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore') || 0));
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollision] = useState('');

  const handleGameOver = (type) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
    setCollision(type)

  }

  const handleGameReset = () => {
    setScore(0);
    setGameOver(false);
  }
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key == 'Enter') {
        handleGameReset(); //reset
      }
    }
    window.addEventListener('keydown', handleKeyPress);
  }, [gameOver])


  return (
    <div className='game-container'>
      <p className='score'>Score {score}</p>
      <p className='highScore'>High Score {highScore}</p>
      {
        gameOver && (
          <div className='gameOver'>
            <p>Game Over! {collision.type === 'wall' ? 'Hit the wall' :
              'You ate yourself'} </p>
            <p >Press Enter to Reset</p>
          </div>
        )
      }{
        !gameOver && (
          <GamePieces
            score={score}
            setScore={setScore}
            onGameOver={(type) => handleGameOver(type)} />
        )
      }
    </div>

  )
}

export default GameState