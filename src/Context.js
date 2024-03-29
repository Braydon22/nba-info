import React, { useState, useContext, useEffect, useCallback } from "react";

const AppContext = React.createContext();
const playerUrl = "https://www.balldontlie.io/api/v1/players";
const gameUrl = "https://www.balldontlie.io/api/v1/games";
const teamUrl = "https://www.balldontlie.io/api/v1/teams";
const gameStatsUrl = "https://www.balldontlie.io/api/v1/stats";

const AppProvider = ({ children }) => {
  const date = new Date();

  //home state
  const [todaysGameLoading, setTodaysGameLoading] = useState(false);
  const [todaysGame, setTodaysGame] = useState([]);
  const [homePageRefresh, setHomePageRefresh] = useState(false);

  //player state
  const [playerLoading, setPlayerLoading] = useState(false);
  const [playerSearchTerm, setPlayerSearchTerm] = useState("Stephen Curry");
  const [players, setPlayers] = useState([]);

  //team state
  const [teamLoading, setTeamLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  //game state
  const [gameLoading, setGameLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [currentGamesPage, setCurrentGamesPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  // Home Page
  date.setDate(date.getDate() - 15);
  const strDateStart = date.toISOString().split("T")[0];
  date.setDate(date.getDate() + 15);
  const strDateEnd = date.toISOString().split("T")[0];

  const fetchTodaysGame = useCallback(async () => {
    console.log("fetch game");
    setTodaysGameLoading(true);
    try {
      const response = await fetch(
        `${gameUrl}?start_date=${strDateStart}&end_date=${strDateEnd}`
      );
      const { data } = await response.json();
      data.length > 1 ? setTodaysGame(data) : setTodaysGame([]);
      console.log("refreshed");
    } catch (error) {
      console.log("games fetch error" + error);
    }
    setTodaysGameLoading(false);
    setHomePageRefresh(false);
  }, [strDateStart, strDateEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHomePageRefresh(true);
    }, 600000);

    fetchTodaysGame();
    return () => clearInterval(interval);
  }, [homePageRefresh, fetchTodaysGame]);

  //Player Page
  const fetchPlayer = useCallback(async () => {
    setPlayerLoading(true);
    try {
      const response = await fetch(`${playerUrl}?search=${playerSearchTerm}`);
      const { data } = await response.json();

      const playerData = data.map((item) => {
        const { id, first_name, last_name, team, position } = item;
        return {
          id: id,
          first_name: first_name,
          last_name: last_name,
          team: team,
          position: position,
        };
      });
      setPlayerLoading(false);
      setPlayers(playerData);
    } catch (error) {
      console.log("player fetch error" + error);
    }
  }, [playerSearchTerm]);

  useEffect(() => {
    fetchPlayer();
  }, [playerSearchTerm, fetchPlayer]);

  // team page
  const fetchTeams = async () => {
    setTeamLoading(true);
    try {
      const response = await fetch(teamUrl);
      const { data } = await response.json();
      setTeams(data);
    } catch (error) {
      console.log("teams fetch error: " + error);
    }
    setTeamLoading(false);
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  //game page
  const fetchTotalGamePages = async () => {
    const response = await fetch(
      `${gameUrl}?seasons[]=${date.getFullYear() - 1}`
    );
    const { meta } = await response.json();
    const { total_pages } = meta;

    setCurrentGamesPage(total_pages);
  };

  const fetchGame = useCallback(async () => {
    setGameLoading(true);
    try {
      const nextPageResponse = await fetch(
        `${gameUrl}?seasons[]=${
          date.getFullYear() - 1
        }&page=${currentGamesPage}`
      );
      const { data, meta } = await nextPageResponse.json();
      const { total_pages } = meta;

      if (currentGamesPage !== total_pages) {
        setGames((prevGames) => prevGames.concat(data));
      } else {
        setGames(data);
        setTotalPages(total_pages);
      }
    } catch (error) {
      console.log("game fetch error " + error);
    }

    setGameLoading(false);
  }, [currentGamesPage]);

  useEffect(() => {
    fetchTotalGamePages();
  }, []);

  useEffect(() => {
    fetchGame();
  }, [currentGamesPage, fetchGame]);

  return (
    <AppContext.Provider
      value={{
        playerLoading,
        playerSearchTerm,
        players,
        setPlayerSearchTerm,
        teamLoading,
        teams,
        teamUrl,
        gameLoading,
        gameUrl,
        games,
        setCurrentGamesPage,
        currentGamesPage,
        totalPages,
        todaysGame,
        todaysGameLoading,
        gameStatsUrl,
        date,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
