import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';

const GamePieces = forwardRef(({ score, setScore, onGameOver }, ref) => {
  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const INITIAL_SNAKE = [{ x: 180, y: 60 }, { x: 175, y: 60 }];
  const INITIAL_APPLE = { x: 60, y: 120 };

  const [apple, setApple] = useState(INITIAL_APPLE);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState('');
  const [isActive, setIsActive] = useState(true);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setApple(INITIAL_APPLE);
    setDirection('');
    setIsActive(true);
  }, []);

  useImperativeHandle(ref, () => ({
    resetGame
  }));

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isActive]); // Only add listener when game is active

  const handleKeyPress = useCallback((e) => {
    if (!isActive) return;
    
    switch (e.key) {
      case "ArrowRight":
        if (direction !== 'left') setDirection("right");
        break;
      case "ArrowLeft":
        if (direction !== 'right') setDirection("left");
        break;
      case "ArrowUp":
        if (direction !== 'down') setDirection("up");
        break;
      case "ArrowDown":
        if (direction !== 'up') setDirection("down");
        break;
      default:
        break;
    }
  }, [direction, isActive]);

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

    // Draw walls
    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    // Draw apple
    ctx.beginPath();
    ctx.rect(apple.x, apple.y, 14, 14);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }, [snake, apple]); // Only redraw when snake or apple changes

  const handleBodyCollision = useCallback((newSnake) => {
    const snakeHead = newSnake[0];
    for (let i = 1; i < newSnake.length; i++) {
      if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
        setIsActive(false);
        onGameOver('self');
      }
    }
  }, [onGameOver]);

  const handleWallCollision = useCallback((snakeHead) => {
    if(typeof onGameOver !== 'function') {
      console.error('onGameOver is not a function! Current type:', typeof onGameOver);
      return;
    }
    if (snakeHead.x >= canvasRef.current.width || snakeHead.x < 0) {
      setIsActive(false);
      onGameOver('wall');
    }
    if (snakeHead.y >= canvasRef.current.height || snakeHead.y < 0) {
      setIsActive(false);
      onGameOver('wall');
    }
  }, [onGameOver]);

  const handleAppleCollision = useCallback((newSnake) => {
    const snakeHead = newSnake[0];
    if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
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
  }, [apple.x, apple.y, score, setScore]);

  const moveSnake = useCallback(() => {
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
  }, [direction, handleAppleCollision, handleWallCollision, handleBodyCollision]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(interval);
  }, [moveSnake]);

  GamePieces.propTypes = {
    score: PropTypes.number.isRequired,
    setScore: PropTypes.func.isRequired,
    onGameOver: PropTypes.func.isRequired
  };

  return (
    <div>
      <canvas className='gameCanvas' ref={canvasRef} width={800} height={450} />
      <button onClick={resetGame}>Reset</button>
    </div>
  );
});

export default GamePieces;