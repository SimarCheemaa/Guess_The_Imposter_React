import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Lobby({socket, code, players, setPlayers, name}) {
    const [ready, setReady] = useState(false);

    const playersList = players.map((player, index) => {
        return (
            <li key={index}>
                <span>{player}</span>
            </li>
        )
    });

    const toggleReady = () => {
        socket.emit("ready-up", {code: code, ready: !ready});
        setReady(!ready);
    }

    useEffect(() => {
        socket.on("join-success", (data) => {
            setPlayers([...data.players])
        });
    }, []);

    useEffect(() => {
        socket.on("all-ready", (data) => {
            alert(data);
        })
      }, []);

    return (
        <>
        <h1 className='code'>
            Code: {code}
        </h1>
        <div>
            <span className='players-title'>
                Players in Lobby: {name}
            </span>
            <ol type="I" className="player-list">
                {playersList}
            </ol>
        </div>
        <button onClick={() => toggleReady()} className={ready ? "ready" : "not-ready"}>
            {ready ? "Ready to Go" : "Get Ready"}
        </button>
        <button className='default-button'>
        <Link to={"/"} className="link-button">
            Back
        </Link>
        </button>
        </>
    )
}