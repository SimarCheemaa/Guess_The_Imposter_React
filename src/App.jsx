import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Join from './pages/Join';
import { useState } from 'react';


export default function App({socket}) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([name]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home socket={socket} setCode={setCode} code={code} name={name} setName={setName} setPlayers={setPlayers}/>} />
        <Route path='/home' element={<Home socket={socket} setCode={setCode} code={code} name={name} setName={setName} setPlayers={setPlayers}/>} />
        <Route path='/lobby' element={<Lobby socket={socket} code={code} players={players} setPlayers={setPlayers}/>} />
        <Route path='/join' element={<Join socket={socket} code={code} setCode={setCode} name={name} players={players} setPlayers={setPlayers}/>} />
      </Routes>
    </BrowserRouter>
  )
}


