//jshint esversion: 6
import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p>ⓒ {year} with ❤️ by Kyiakyia </p>
    </footer>
  );
}

export default Footer;