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
            // setPlayers([name]);
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
        <div className='main-body'>
            <div className='text-input-container'>
                <input 
                    placeholder = {name == "" ?'Nickname' : name}
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    className='text-input'
                />
            </div>
            <div className='homepage-buttons'>
                <button onClick={() => {
                    createGame();

                    }} className='default-button'>
                    {name !== "" ? <Link to="/lobby" className="link-button">Create Game</Link> : "Create Game"}
                </button>
                {/*This button will take user to new page that will show input field and button to join game -> Same as create game once joined*/}
                <button className='default-button'>
                {name !== "" ? <Link to="/join" className="link-button">Join Game</Link> : "Join Game"}
                </button>
            </div>
        </div>
    )
}