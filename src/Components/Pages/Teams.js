import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";
import { useGlobalContext } from "../../Context";
import Loading from "../Loading";

function Teams(props) {
  const { teams, date, teamLoading } = useGlobalContext();

  const teamsElem = teams.map((team) => {
    return (
      <Link to={`/teams/${team.id}`} key={team.id} className="single-team">
        <h2>{team.abbreviation}</h2>
      </Link>
    );
  });

  if (teamLoading) {
    return <Loading />;
  }

  return (
    <section className="team-page-container">
      <Navbar />
      <div className="page-header">
        <h1>
          NBA Season {date.getFullYear() - 1} - {date.getFullYear()} Teams
        </h1>
      </div>
      <div className="team-grid">{teamsElem}</div>
    </section>
  );
}

export default Teams;
