import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Join({socket, code, setCode, name, players, setPlayers}) {
    const [joinedGame, setJoinedGame] = useState(false);
    const navigate = useNavigate();

    //If join game was successful it'll navigate us to Lobby
    useEffect(() => {
        if (joinedGame) {
          navigate('/lobby');
        }
      }, [joinedGame, navigate]);

    useEffect(() => {
        //This is used when the server sends back success or failure while trying to join game and sends players that are in the game
        socket.on("join-success", (data) => {
            // alert("WAS SUCCESS");
            console.log(data);
            setPlayers([...data.players])
            setJoinedGame(true);
        });

        // //Handle this
        // socket.on("join-failure", () => {
        //     console.log('Failure');
        // })
    }, []);

    const joinGame = () => {
        if (code != "" && code.length != 6) {
            socket.emit("join", {code: code, name: name})
        }
    }

    return (
        <div>
        <input placeholder="Enter Code" 
            onChange={(event) => {
                setCode(event.target.value);
            }}/>
        <button  onClick={() => {joinGame()}}>
            Join Game
        </button>
        <button>
            <Link to={"/home"}>
                Back
            </Link>
        </button>
        </div>
    )
}