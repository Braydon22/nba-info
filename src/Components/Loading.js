import React from "react";
import logo from "../Image/logo.png";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading">
        <img src={logo} alt="" />
      </div>
    </div>
  );
}
