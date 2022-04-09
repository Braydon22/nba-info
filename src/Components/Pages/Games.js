import React, { useState } from 'react';
import Navbar from '../Navbar'

import BriefGameInfo from '../BriefGameInfo';
import { useGlobalContext } from '../../Context'

function Games() {
    const { games, gameLoading, setCurrentGamesPage, currentGamesPage, totalPages } = useGlobalContext()

    const handleLoadMore = () => {
        if (currentGamesPage !== totalPages) {
            setCurrentGamesPage(prevPg => prevPg += 1)
        }
    }
    const gameElem = games.map(game => {
        return (
            <BriefGameInfo key={game.id} {...game} />
        )
    })
    return (
        <section>
            <Navbar />


            <div className="game-info-grid"> {gameElem} </div>

            {gameLoading
                ? <div className="div-center" style={{ margin: "40px" }}><h1>Loading ...</h1></div>
                : <div className="div-center" style={{ margin: "40px" }}>
                    <button className='medium-btn btn' onClick={handleLoadMore}> {currentGamesPage !== totalPages ? "Load More" : "No More Games To Load"}
                    </button>
                </div>
            }
        </section>
    );
}

export default Games;