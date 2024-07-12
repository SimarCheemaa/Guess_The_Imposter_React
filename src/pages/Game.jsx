import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Game({socket, gameObject, setGameObject, players, ready, setReady, code}) {
    const toggleGameStatus = () => {
        socket.emit("ready-up", {code: code, ready: !ready});
        setReady(!ready);
    }

    const playersList = players.map((player, index) => {
        return (
            <li key={index}>
                <span>{player.name} : {player.readyStatus ? "Ready" : "Not Ready"}</span>
            </li>
        )
    });

    useEffect(() => {
        socket.on("player-status", (data) => {
            setPlayers([...data.players]);
        })
    });

    return (
        <div className="game-page">
            <div className="players-section">
                <span className='players-title'>
                        Players in Lobby: {name}
                    </span>
                    <ol type="I" className="player-list">
                        {playersList}
                    </ol>
            </div>
            <div className="game-section">
                <h1>{gameObject.category}</h1>
                <h1>{gameObject.word}</h1>
                <h1>{gameObject.imagePath}</h1>
                <button onClick={() => toggleGameStatus()} className={ready ? "ready" : "not-ready"}>
                {ready ? "Ready to Go" : "New Game?"}
                </button>
                <button className='default-button'>
                <Link to={"/"} className="link-button">
                    Exit
                </Link>
                </button>
            </div>
            <div className="chat-section">
                <p>This is Chat</p>
            </div>
        </div>
    )
}