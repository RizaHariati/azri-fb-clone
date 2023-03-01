import React from "react";

const Footer = () => {
  return (
    <div className=" w-full h-6 bg-accentMain text-textPrimary hover:text-white z-50 fixed bottom-0 text-center">
      <a href="https://www.ichacodes.com/">
        <p className="text-xs p-1">
          IchaCodes copyright &copy;{new Date().getFullYear()}
        </p>
      </a>
    </div>
  );
};

export default Footer;
