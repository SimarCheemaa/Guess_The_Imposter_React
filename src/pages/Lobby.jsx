import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Lobby({socket, code, players, setPlayers}) {
    const [ready, setReady] = useState(false);

    const playersList = players.map((player) => {
        return (
            <li>
                {player}
            </li>
        )
    });

    const toggleReady = () => {
        setReady(!ready);
    }

    useEffect(() => {
        socket.on("join-success", (data) => {
            setPlayers([...data.players])
        });
    }, []);

    return (
        <>
        <h1>
            Code: {code}
        </h1>
        <div>
            <p>
                Players in Lobby:
            </p>
            <ol>
            {playersList}
            </ol>
        </div>
        <button onClick={() => toggleReady()} className={ready ? "ready" : "not-ready"}>
            {ready ? "Ready to Go" : "Get Ready"}
        </button>
        <button >
        <Link to={"/"}>
            Back
        </Link>
        </button>
        </>
    )
}