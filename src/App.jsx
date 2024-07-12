import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Join from './pages/Join';
import Game from './pages/Game';
import { useState } from 'react';
import backgroundImage from './assets/background.jpg';


export default function App({socket}) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([name]);
  const [gameObject, setGameObject] = useState({category: "", word: "", imagePath: ""});
  const [ready, setReady] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home socket={socket} setCode={setCode} code={code} name={name} setName={setName} setPlayers={setPlayers}/>} />
          <Route path='/home' element={<Home socket={socket} setCode={setCode} code={code} name={name} setName={setName} setPlayers={setPlayers}/>} />
          <Route path='/lobby' element={<Lobby socket={socket} code={code} players={players} setPlayers={setPlayers} name={name} gameObject={gameObject} setGameObject={setGameObject} ready={ready} setReady={setReady}/>} />
          <Route path='/join' element={<Join socket={socket} code={code} setCode={setCode} name={name} players={players} setPlayers={setPlayers}/>} />
          <Route path='/game' element={<Game socket={socket} gameObject={gameObject} setGameObject={setGameObject} players={players} ready={ready} setReady={setReady} code={code}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


