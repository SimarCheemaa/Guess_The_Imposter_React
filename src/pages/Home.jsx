import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home({socket, setCode, code, name, setName, setPlayers}) {

    useEffect(() => {
        socket.on("room-created", (data) => {
            console.log(data);
            setCode(data)
        })
      }, []);

    const createGame = () => {
        if (name != "") {
            socket.emit("create", {name: name});
            setPlayers([name]);
        }
    }

    return (
        <div>
            <Header />
            <Body name={name} setName={setName} createGame={createGame} code={code}/>
            <Footer />
        </div>
    )
}

function Body({name, setName, createGame, code}) {
    return (
        <div>
        <h3>
            Welcome!
        </h3>
        <h4>
        Please Create or Join Game
        </h4>
        <input 
            placeholder = {name == "" ?'Enter Name' : name}
            value={name}
            onChange={(event) => {
                setName(event.target.value);
            }}
        />
        {/*This button will take user to new page that will show code and button to start game and who all have joined*/}
        <button onClick={() => {createGame();}}>
            {name !== "" ? <Link to="/lobby">Create Game</Link> : "Create Game"}
        </button>
        {/*This button will take user to new page that will show input field and button to join game -> Same as create game once joined*/}
        <button>
        {name !== "" ? <Link to="/join">Join Game</Link> : "Join Game"}
        </button>
    </div>
    )
}