import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Error from "./Error";
import Loading from "../Loading";

const avgUrl =
  "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
const playerUrl = "https://www.balldontlie.io/api/v1/players/";
function SinglePlayer() {
  const { playerId } = useParams();
  const [playerAvg, setPlayerAvg] = useState({});
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(false);

  const year = new Date().getFullYear();

  const fetchPlayerAvg = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${avgUrl}${playerId}`);
      const data = await response.json();
      if (data) {
        setPlayerAvg(data.data[0]);
      } else {
        setPlayerAvg(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlayer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${playerUrl}${playerId}`);
      const data = await response.json();
      if (data) {
        const playerData = {
          first_name: data.first_name,
          last_name: data.last_name,
          height_feet: data.height_feet ? data.height_feet : "N/A",
          height_inches: data.height_inches ? data.height_inches : "N/A",
          position: data.position === "" ? "N/A" : data.position,
          team_name: data.team.name,
          team_conference: data.team.conference,
          team_abbreviation: data.team.abbreviation,
          weight_pounds: data.weight_pounds ? data.weight_pounds : "N/A",
        };

        setPlayer(playerData);
      } else {
        setPlayer(null);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlayerAvg();
    fetchPlayer();
  }, [playerId]);

  if (loading) {
    return <Loading />;
  }

  if (!player) {
    return <Error />;
  }

  return (
    <div className="single-player-container">
      <div className="page-header">
        <Link to="/players">
          <FontAwesomeIcon
            icon="arrow-left-long"
            className="back-icon"
            color="white"
            size="2x"
          />
        </Link>
        <div>
          <h1>
            {player.first_name} {player.last_name}
          </h1>
        </div>
      </div>
      <div className="div-center">
        <h3>Position: {player.position}</h3>
        <h3>
          Height: {player.height_feet}-Foot-{player.height_inches}
        </h3>
        <h3>Weight: {player.weight_pounds} Pounds</h3>
      </div>
      {playerAvg ? (
        <div className="player-average-container">
          <div className="div-center" style={{ marginBottom: "50px" }}>
            <h2>
              Season {year - 1} - {year} Averages
            </h2>
          </div>
          <div className="player-average">
            <p>Assist: {playerAvg.ast}</p>
            <p>Block: {playerAvg.blk}</p>
            <p>Points: {playerAvg.pts}</p>
            <p>Field Goals Made: {playerAvg.fgm}</p>
            <p>Field Goals Attempted: {playerAvg.fga}</p>
            <p>3-point Field Goals Made: {playerAvg.fg3m}</p>
            <p>3-point Field Goals Attempt: {playerAvg.fg3a}</p>
            <p>Steal: {playerAvg.stl}</p>
            <p>Offensive Rebound: {playerAvg.oreb}</p>
            <p>Defenive Rebound: {playerAvg.dreb}</p>
            <p>Trunover: {playerAvg.turnover}</p>
            <p>Minutes Played: {playerAvg.min}</p>
            <p>Games Played: {playerAvg.games_played}</p>
          </div>
        </div>
      ) : (
        <div className="div-center">
          <h2>No Records For Current Season </h2>
        </div>
      )}
      <div
        className="background-text"
        style={{
          color: player.team_conference === "East" ? "#3246abba" : "#ab323249",
        }}
      >
        <h6>{player.team_abbreviation}</h6>
        <h1>{player.team_name}</h1>
      </div>
    </div>
  );
}

export default SinglePlayer;
