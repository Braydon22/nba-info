import React from "react";
import { Link } from "react-router-dom";

import background from "../../Image/error-background.png";

function Error(props) {
  return (
    <div className="error-container">
      <h1>Page not found !</h1>
      <Link to="/">
        <button className="btn medium-btn"> Back to Home </button>
      </Link>
      <img
        className="error-background"
        src={background}
        alt="background image"
      />
    </div>
  );
}

export default Error;
