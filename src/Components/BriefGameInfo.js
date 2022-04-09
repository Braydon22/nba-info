import React from 'react';

function BriefGameInfo({ date, home_team, home_team_score, visitor_team, visitor_team_score, status }) {
    const strDate = date.split("T")[0]

    return (
        <div className='single-game-info'>
            <div className="info-header">
                <div className="game-date">
                    <h5>{strDate}</h5>
                </div>
            </div>
            <div className="info-center">
                <div className='team-info'>
                    <h6>{home_team.abbreviation}</h6>
                    <h2>{home_team.name}</h2>
                    <h6>({home_team.conference})</h6>
                </div>
                <h3>VS</h3>
                <div className='team-info'>
                    <h6>{visitor_team.abbreviation}</h6>
                    <h2>{visitor_team.name}</h2>
                    <h6>({home_team.conference})</h6>
                </div>
            </div>
            <div className="info-center">
                <h2>{home_team_score}</h2>
                <h3>:</h3>
                <h2>{visitor_team_score}</h2>
            </div>
            <div className="info-center">
                <p>Status: {status} </p>
            </div>

        </div>
    );
}

export default BriefGameInfo;