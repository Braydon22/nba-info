import React from 'react';

import { useGlobalContext } from '../../Context'
import Navbar from '../Navbar'
import backgroundImg from '../../Image/background.png'
import BriefGameInfo from '../BriefGameInfo';

function Home() {
    const { todaysGame, todaysGameLoading, } = useGlobalContext()

    const gameInfoElem = todaysGame.map(game => {
        return (
            <BriefGameInfo key={game.id} {...game} />
        )
    })
    return (
        <div className='home-container'>
            <Navbar />
            <div className="page-header">
                <h1>Recent / Upcoming NBA Games</h1>
            </div>
            {todaysGameLoading
                ? <div className="loading"> <h1>Loading ... </h1></div>
                : <div className="game-info-grid">
                    {gameInfoElem}
                </div>
            }
            <img className='home-background' src={backgroundImg} alt="background image" />
        </div>
    );
}

export default Home;