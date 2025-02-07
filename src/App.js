import './App.css';
import GameState from './Components/GameState';

function App() {
  return (
    <div className='container'>
      <GameState 
        onGameOver={(reason) => { // Add handler here
          console.log('Game Over Reason:', reason);
          // Add game reset logic here later
        }}
      />
    </div>
  );
}

export default App;