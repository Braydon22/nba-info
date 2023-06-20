import React from "react";

import { useGlobalContext } from "../../Context";
import Navbar from "../Navbar";
import backgroundImg from "../../Image/background.png";
import BriefGameInfo from "../BriefGameInfo";
import Loading from "../Loading";

function Home() {
  const { todaysGame, todaysGameLoading } = useGlobalContext();

  const gameInfoElem = todaysGame.map((game) => {
    return <BriefGameInfo key={game.id} {...game} />;
  });

  if (todaysGameLoading) {
    return <Loading />;
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="page-header">
        {todaysGame.length === 0 ? (
          <h1>No recent or upcoming games</h1>
        ) : (
          <h1>Recent / Upcoming NBA Games</h1>
        )}
      </div>
      <div className="game-info-grid">{gameInfoElem}</div>
      <img
        className="home-background"
        src={backgroundImg}
        alt="background image"
      />
    </div>
  );
}

export default Home;
