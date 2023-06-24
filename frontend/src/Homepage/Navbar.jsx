import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const HomeRouteList = [
    {
      title: "Random Biasness",
      path: "/random-biasness",
    },
    {
      title: "Mathematical Expression",
      path: "/math-expression",
    },
    {
      title: "Debug",
      path: "/debug",
    },
  ];

  return (
    <div>
      <div className="sticky top-0 left-0 bg-blue-800 p-2 text-white flex justify-between">
        <Link to="/" className="m-auto md:m-0">
          <p className="font-serif text-2xl font-bold  ">OnlineSales.ai</p>
        </Link>
        <div className="hidden md:flex gap-2 justify-center items-center">
          {HomeRouteList.map((el) => (
            <Link to={el.path} key={uuid()}>
              <div className="hover:bg-zinc-800 p-1 rounded-lg cursor-pointer">
                {el.title}
              </div>
            </Link>
          ))}
          <a href="https://saikatkundu.online" target="_blank" rel="noreferrer">
            <p>Portfolio</p>
          </a>
        </div>

        <div
          className="absolute top-[20%] right-[2%] md:hidden border border-white p-1"
          onClick={() => setShowMenu(true)}
        >
          <RxHamburgerMenu />
        </div>
      </div>

      {showMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-blue-800 flex flex-col items-center justify-center text-white font-mono">
          {HomeRouteList.map((el) => (
            <Link to={el.path} key={uuid()} onClick={() => setShowMenu(false)}>
              <div className="hover:bg-zinc-800 p-1 rounded-lg cursor-pointer">
                {el.title}
              </div>
            </Link>
          ))}
          <a href="https://saikatkundu.online" rel="noreferrer" target="_blank">
            <p>Portfolio</p>
          </a>

          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setShowMenu(false)}
          >
            <GiSplitCross />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};
