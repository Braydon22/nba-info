import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaBasketballBall } from "react-icons/fa";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  return (
    <div className="App">
      <nav>
        <div className="nav-header">
          <Link to="/">
            <FaBasketballBall color="white" className="logo" />
          </Link>
        </div>
        <div className="link-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/players">
              <li>Players</li>
            </Link>
            <Link to="/teams">
              <li>Teams</li>
            </Link>
            <Link to="/games">
              <li>Games</li>
            </Link>
          </ul>
        </div>
        {!showLinks ? (
          <BiMenuAltRight className="menuBar" onClick={toggleLinks} />
        ) : (
          <AiOutlineClose className="menuBar" onClick={toggleLinks} />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
