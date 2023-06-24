import axios from "axios";
import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { v4 as uuid } from "uuid";

export const MathExpression = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState([]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const array = text.trim().split("\n");
      if (array[array.length - 1] === "end") {
        array.pop();
      }
      console.log(array, "array");
      const { data } = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/math-expression`,
        {
          inputData: array,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      setLoading(false);
      setShowData(data.results);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div>
      <p className="font-bold text-2xl text-center">Mathematical Expression</p>

      <p className="font-bold">Task-2</p>
      <p className="mt-5">
        <span className="font-bold block">Problem Statement</span> Write a
        program that accepts multiple mathematical expressions in bulk and
        evaluates each of them using any public Web API available. The program
        should display the result of each expression on the console. Let’s
        assume that the API only supports{" "}
        <span className="font-bold underline">50</span> requests per second per
        client whereas your application is expected to evaluate at least{" "}
        <span className="font-bold underline">500</span> expressions per second.
        Also, the user may initiate more concurrent requests than your
        application can handle. Suggest an approach to handle this along with
        the reasoning and implementation of the same.
      </p>

      <p className="font-bold mt-5">Rules</p>
      <p className="pl-5">
        1. No expressions should be evaluated in the code. All evaluations
        should be using the Web API.
      </p>
      <p className="pl-5">
        2. You can assume different expressions/operators that are compatible
        with the API you choose.
      </p>
      <p className="pl-10">
        a. Example: Some API might use ^ operator for power some might use pow()
      </p>

      <p className="font-bold mt-5">Example</p>
      <p className="pl-5">
        - Input (every line is an expression, evaluate when "end" is provided as
        an expression)
      </p>

      <p className="pl-10">- 2 * 4 * 4</p>
      <p className="pl-10">- 5 / (7 - 5)</p>
      <p className="pl-10">- sqrt(5^2 - 4^2)</p>
      <p className="pl-10">- sqrt(-3^2 - 4^2)</p>
      <p className="pl-10">- end</p>

      <p className="pl-5">- Output</p>

      <p className="pl-10">{`- 2 * 4 * 4 => 32`}</p>
      <p className="pl-10">{`- 5 / (7 - 5) => 2.5`}</p>
      <p className="pl-10">{`- sqrt(5^2 - 4^2) => 3`}</p>
      <p className="pl-10">{`- sqrt(-3^2 - 4^2) = 5i`}</p>

      <label>Enter the expression</label>
      <div className="text-red-500">
        <FiAlertTriangle />
        <p>Write each expression in one single line.</p>
        <p>Put an end word at the last.</p>
        <p>This method will give error to the 51th expression</p>
      </div>
      <br />
      <textarea
        className="border border-black w-full max-w-md h-[20vh] ml-5"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={handleSubmit}
        className={`bg-green-500 ml-5 text-white px-4 py-2 rounded w-5/12 max-w-sm ${
          loading ? "cursor-wait" : "cursor-pointer"
        }`}
      >
        Submit
      </button>

      {showData.map((el) => (
        <p key={uuid()}>{el}</p>
      ))}

      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/kundusaikat/onlinesales.ai/blob/master/backend/routes/math-expression.js"
      >
        Github code
      </a>
    </div>
  );
};
