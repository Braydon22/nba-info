import React from 'react';

const convertTime = (startTime) => {
    // convert time zone
    if (startTime === "Final" || startTime.split(" ").length < 3) {
        return startTime
    }
    const time = startTime.split(" ")[0]
    const amPm = startTime.split(" ")[1]

    if (amPm === "PM") {
        const takeAway = 12 - parseInt(time.split(":")[0])
        const auTime = (14 - takeAway) + ":" + time.split(":")[1] + " AM"

        return auTime
    }

    if (amPm === "PM") {
        const hr = parseInt(time.split(":")[0]) + 14
        if (hr >= 24) {
            const auTime = (hr - 24) + ":" + time.split(":")[1] + " AM"

            return auTime
        } else {
            const auTime = hr + ":" + time.split(":")[1] + " PM"

            return auTime
        }

    }


}


function BriefGameInfo({ date, home_team, home_team_score, visitor_team, visitor_team_score, status }) {
    const strDate = date.split("T")[0]
    const newStatus = convertTime(status)
    const dateArr = strDate.split("-")
    let newDate = strDate

    // convert date
    if (status.split(" ").length > 2) {
        const initialStatus = status.split(" ")

        if (initialStatus[1] === "PM" || parseInt(initialStatus[0].split(" ")[0].split(":")[0]) > 9) {
            newDate = dateArr[0] + "-" + dateArr[1] + "-" + (parseInt(dateArr[2]) + 1)
        }
    }

    return (
        <div className='single-game-info'>
            <div className="info-header">
                <div className="game-date">
                    <h5>{newDate}</h5>
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
                <p>Status: {newStatus} </p>
            </div>

        </div>
    );
}

export default BriefGameInfo;