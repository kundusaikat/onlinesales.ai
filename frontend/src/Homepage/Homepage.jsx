import React from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";

export const Homepage = () => {

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
        {HomeRouteList.map((el,i) => (
            <Link to={el.path} key={uuid()}>
              <div className="hover:bg-zinc-800 p-1 rounded-lg cursor-pointer hover:text-white">
                Question{i+1}. {el.title}
              </div>
            </Link>
          ))}
    </div>
  )
}
