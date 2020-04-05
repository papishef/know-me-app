//jshint esversion: 6
import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{position: "relative", top: 30, textAlign: "center", color: "white", fontSize: 12, fontFamily: "Garamond", fontWeight: "bolder"}}>
      <p>ⓒ {year} with ❤️ by Kyiakyia. </p>
    </footer>
  );
}

export default Footer;