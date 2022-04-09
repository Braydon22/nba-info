import React from 'react';
import { Link } from 'react-router-dom';

function BriefPlayerInfo({ id, first_name, last_name, team, position }) {
    return (
        <Link to={`/players/${id}`}>
            <div className='player-card'>
                <div className="div-center">
                    <h2>{first_name} {last_name}</h2>
                    <h4>{position}</h4>
                </div>
                <h5>{team.name}</h5>
            </div>
        </Link>
    );
}

export default BriefPlayerInfo;