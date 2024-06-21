import { useEffect, useState } from "react";

const GamePieces = () => {

  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const [apple, setApple] = useState({ x: 60, y: 120 })
  const [snake, setSnake] = useState({ x: 180, y: 60 }, { x: 175, y: 60 })
  const [direction, setDirection] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(canvas.current)
    const ctx = canvas.getContext('2d');

    const drawSnake = () => {
      snake.forEach((snakePart) =>
        ctx.beginPath(),
        ctx.rect(snakePart.x, snakePart.y, 14, 14),
        ctx.fillStyle = 'green',
        ctx.fill(),
        ctx.closePath()
      )
    }

    const drawApple = () => {
      apple.forEach((apple) =>
        ctx.beginPath(),
        ctx.rect(apple.x, apple.y, 14, 14),
        ctx.fillStyle = 'red', // color or hex code
        ctx.fill(),
        ctx.closePath()
      )
    }

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake]
          const snakeHead = {}
        })
      }
    }

    const interval = setInterval(() => {
      ctx.clearREct(0, 0, canvas.width, canvas.height);
      drawSnake(),
        drawApple()
    }, 100)

    return () => {
      clearInterval(interval);
    }



  }, [snake, direction])

  return (
    <div>
      <canvas className='gameCanvas' ref={canvasRef} width={800} height={450} />

    </div>
  )
}


export default GamePieces