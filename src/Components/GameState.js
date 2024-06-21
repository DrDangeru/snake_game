
import React from 'react'

const GameState = () => {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore') || 0));
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollision] = useState('');

  return (
    <>
      <div>
        <p>Score {score}</p>
        <p>High Score {highScore}</p>
        {
          gameOver && (
            <div>
              <p>Game Over! {collision.type === 'wall' ? 'Hit the wall' :
                'You ate yourself'} </p>
              <p>Press Enter to Reset</p>
            </div>
          )
        }{
          !gameOver && (
            <GamePieces />
          )
        }
      </div>
    </>
  )
}

export default GameState