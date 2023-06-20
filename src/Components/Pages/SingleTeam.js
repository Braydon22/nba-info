import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "./Error";
import { useGlobalContext } from "../../Context";
import BriefGameInfo from "../BriefGameInfo";
import Loading from "../Loading";

function SingleTeam(props) {
  const { teamId } = useParams();
  const { teamUrl, gameUrl } = useGlobalContext();
  const [team, setTeam] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const date = new Date();
  date.setDate(date.getDate() - 15);
  const startDateStr = date.toISOString().split("T")[0];
  date.setDate(date.getDate() + 15);
  const endDateStr = date.toISOString().split("T")[0];

  const fetchData = async () => {
    setLoading(true);
    try {
      const teamUrlResponse = await fetch(`${teamUrl}/${teamId}`);
      const teamData = await teamUrlResponse.json();
      const gameUrlResponse = await fetch(
        `${gameUrl}?team_ids[]=${teamId}&start_date=${startDateStr}&end_date=${endDateStr}`
      );
      const { data } = await gameUrlResponse.json();

      setTeam(teamData);
      setGames(data);
    } catch (error) {
      console.log("single team page data fetch error " + error);
      setTeam(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!team) {
    return <Error />;
  }

  const gameElem = games.map((game) => {
    return <BriefGameInfo key={game.id} {...game} />;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="single-team-view">
      <div className="page-header">
        <Link to="/teams">
          <FontAwesomeIcon
            icon="arrow-left-long"
            className="back-icon"
            color="white"
            size="2x"
          />
        </Link>
        <h1>{team.full_name}</h1>
        <h5>({team.abbreviation})</h5>
      </div>
      <div className="div-center">
        <h3>City: {team.city}</h3>
        <h3>Conference: {team.conference}</h3>
        <h3>Division: {team.division}</h3>
      </div>

      <div className="game-info-container" style={{ marginTop: "20vh" }}>
        <h2>
          {" "}
          {games.length > 0
            ? "Recent / Upcoming Games for"
            : "No Recent or Upcoming Games for"}{" "}
          {team.full_name}
        </h2>
        {games.length > 0 && <div className="game-info-grid">{gameElem}</div>}
      </div>
    </section>
  );
}

export default SingleTeam;
