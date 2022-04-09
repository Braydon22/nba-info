import React from 'react';
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import BriefPlayerInfo from '../BriefPlayerInfo';
import FormSearch from '../FormSearch';
import { useGlobalContext } from '../../Context'

function Players() {
    const { players, playerLoading } = useGlobalContext()

    const playersElem = players.map(player => {
        return (
            <BriefPlayerInfo key={player.id} {...player} />
        )
    })
    return (
        <div className='players-container'>
            <Navbar />
            <FormSearch />
            {playerLoading
                ? <div className="loading">
                    <h1>Loading ...</h1>
                </div>
                : <div className="player-cards-container">
                    {playersElem}
                </div>
            }
        </div>
    );
}

export default Players;