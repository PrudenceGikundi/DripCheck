import React from "react";

const Footer = () => {
  return (
    <footer className="bg-midnight-black text-white text-center p-4">
      <p className="text-gray-400">&copy; {new Date().getFullYear()} DripCheck. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
