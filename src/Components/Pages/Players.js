import React from "react";
import Navbar from "../Navbar";

import BriefPlayerInfo from "../BriefPlayerInfo";
import FormSearch from "../FormSearch";
import { useGlobalContext } from "../../Context";
import Loading from "../Loading";

function Players() {
  const { players, playerLoading } = useGlobalContext();

  const playersElem = players.map((player) => {
    return <BriefPlayerInfo key={player.id} {...player} />;
  });

  if (playerLoading) {
    return <Loading />;
  }

  return (
    <div className="players-container">
      <Navbar />
      <FormSearch />
      <div className="player-cards-container">{playersElem}</div>
    </div>
  );
}

export default Players;
