import React from "react";

export const MathExpression = () => {
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
    </div>
  );
};
