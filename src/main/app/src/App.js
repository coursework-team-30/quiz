import './App.css';
import Game from './components/Game';
import Start from './components/Start';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Start />}/>
          <Route exact path="/game" element={ <Game />}/>
          <Route exact path="/leaderboard" element={<Leaderboard />}/> 
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
