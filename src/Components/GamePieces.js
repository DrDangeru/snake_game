import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';


const GamePieces = ({ score, setScore, onGameOver }) => {
  

GamePieces.propTypes = {
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  onGameOver: PropTypes.func.isRequired
};

  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const [apple, setApple] = useState({ x: 60, y: 120 })
  const [snake, setSnake] = useState([{ x: 180, y: 60 }, { x: 175, y: 60 }])
  const [direction, setDirection] = useState('') // was null

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowRight":
        setDirection("right")
        break;
      case "ArrowLeft":
        setDirection("left")
        break;
      case "ArrowUp":
        setDirection("up")
        break;
      case "ArrowDown":
        setDirection("down")
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Add safety check
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(snakePart => {
      ctx.beginPath();
      ctx.rect(snakePart.x, snakePart.y, 14, 14);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();
    });

    // Draw apple
    ctx.beginPath();
    ctx.rect(apple.x, apple.y, 14, 14);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }, [snake, apple]); // Only redraw when snake or apple changes

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(interval);
  }, [direction]); // Only reset interval when direction changes

  const moveSnake = () => {
    if (direction) {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake]
        const snakeHead = { x: newSnake[0].x, y: newSnake[0].y }

        for (let i = newSnake.length - 1; i > 0; i--) {
          newSnake[i].x = newSnake[i - 1].x;
          newSnake[i].y = newSnake[i - 1].y;
        }

        switch (direction) {
          case 'right':
            snakeHead.x += SNAKE_SPEED
            break;
          case 'left':
            snakeHead.x -= SNAKE_SPEED
            break;
          case 'up':
            snakeHead.y -= SNAKE_SPEED
            break;
          case 'down':
            snakeHead.y += SNAKE_SPEED
            break;
          default:
            break;
        }

        newSnake[0] = snakeHead;
        handleAppleCollision(newSnake);
        handleWallCollision(snakeHead);
        handleBodyCollision(newSnake);
        return newSnake;
      });
    }
  };

  const handleBodyCollision = (newSnake) => {
    const snakeHead = newSnake[0];
    for (let i = 1; i < newSnake.length; i++) {
      if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
        onGameOver('self')
      }
    }
  }

  const handleWallCollision = (snakeHead) => {
    if(typeof onGameOver !== 'function') {
      console.error('onGameOver is not a function! Current type:', typeof onGameOver);
      return;
    }
    if (snakeHead.x + SNAKE_SPEED > canvasRef.current.width || snakeHead.x - SNAKE_SPEED < 0) {
      onGameOver('wall');
    }
    if (snakeHead.y + SNAKE_SPEED > canvasRef.current.height || snakeHead.y - SNAKE_SPEED < 0) {
      onGameOver('wall');
    }
  }

  const handleAppleCollision = (newSnake) => {
    const snakeHead = newSnake[0];
    if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
      // Instead of directly setting score, schedule it for next render
      setTimeout(() => setScore(score + 1), 0);
      setApple({
        x: Math.floor((Math.random() * canvasRef.current.width) / SNAKE_SPEED) * SNAKE_SPEED,
        y: Math.floor((Math.random() * canvasRef.current.height) / SNAKE_SPEED) * SNAKE_SPEED,
      })

      newSnake.push({
        x: newSnake[newSnake.length - 1].x,
        y: newSnake[newSnake.length - 1].y
      })
    }
  }

  const snakePart = ({ style, key }) => {
    return <div key={key} className="snake-part" style={style}></div>;
  };

  return (
    <div>
      <canvas className='gameCanvas' ref={canvasRef} width={800} height={450} />

    </div>
  )
}


export default GamePieces