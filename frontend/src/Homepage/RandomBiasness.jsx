import axios from "axios";
import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";

export const RandomBiasness = () => {
  const [inputData, setInputData] = useState([{ value: "", probability: "" }]);
  const [occurances, setOccurances] = useState("");
  const [showData, setShowData] = useState({});

  const handleAddPair = () => {
    setInputData((prevData) => [...prevData, { value: "", probability: "" }]);
  };

  const handleDeletePair = (index) => {
    setInputData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const newData = inputData.map((item) => {
        const { value, probability } = item;
        const updatedProbability = probability === "" ? "0" : probability;
        return { value, probability: updatedProbability };
      });

      const validData = newData.filter(
        (item) => item.value !== "" && item.probability !== ""
      );

      // perform network request here

      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_DOMAIN}/random-biasness`,
          {
            inputData: validData,
            occurrences: occurances || 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setShowData(data);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-2 text-justify">
      <p className="text-2xl text-center font-bold">Random Biasness</p>
      <p className="font-bold">Task 1</p>
      <p>Simulation of an Event that Follows Given Biasness</p>

      <p>
        <span className="font-bold">Problem Statement:</span> Write a program
        that accepts a map of all possible outcomes of an event along with their
        probabilities and every occurrence of the event would generate outcomes
        based on the given probabilities. This could be seen as a generalization
        of events like rolling of a dice (could be biased) or flipping of a coin
        (could be biased).
      </p>

      <p className="font-bold">Examples</p>

      <div className="list-decimal pl-5">
        <div>
          1. Rolling of a six-faced biased dice
          <div style={{ listStyleType: "disc" }} className="pl-5">
            <p>
              a. Input:{" "}
              {`[ {1, 10}, {2, 30}, {3, 15}, {4, 15}, {5, 30}, {6, 0} ]`}
            </p>
          </div>
        </div>
        <div>
          2. Flipping of a coin
          <div style={{ listStyleType: "disc" }} className="pl-5">
            <p>a. {`Input [ {“Head”: 35}, {“Tail”: 65} ]`}</p>
          </div>
        </div>
      </div>

      <p className="font-bold">Rules</p>
      <div>
        <p>1. Input: Probabilities given are as integers and percentages.</p>
        <p>
          2. Each occurrence of the event should only generate one of the
          outcomes given in input
        </p>
        <p>
          3. The outcome of each occurrence is independent of that of others.
        </p>
        <p>
          4. On observing a large number (say 1000) of occurrences, the
          probability distribution should roughly follow the given biasness.
        </p>
      </div>

      <p className="font-bold">Examples</p>

      <div style={{ listStyleType: "circle" }} className="pl-5">
        <p>{`- Input: [ {1: 35}, {2: 65} ]  ## 1=Head, 2=Tail`}</p>
        <div style={{ listStyleType: "disc" }} className="pl-5">
          <p>
            - On triggering the event 1000 times, Head appeared 332 times and
            Tail 668 times which is roughly inline with the biasness given.
          </p>
          <p>- This is just one of the possibilities.</p>
        </div>
      </div>

      {/* Solution starts here */}

      <div className="mb-4">
        <label className="font-bold">Add Value and Probability:</label>
        <button
          onClick={handleAddPair}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add
        </button>

        <div className="text-red-500 flex">
          <FiAlertTriangle size={20} />
          <div>
            <p>
              1. Probability of all values must be in percentages.
            </p>
            <p>2. If probability box is empty value of it is by default 0.</p>
            <p>3. If value box is empty it is not taken as valid input.</p>
            <p>4. If occurrence box is empty it's value will be 1 by default.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className=" w-5/12 text-center max-w-sm">Set occurances</p>
          <input
            type="number"
            placeholder="Set occurances"
            value={occurances}
            onChange={(e) => setOccurances(e.target.value)}
            className="border border-gray-300 px-2 py-1 my-2 rounded w-5/12 max-w-sm"
          />
        </div>

        <div className="flex items-center gap-2 ">
          <p className="w-5/12 text-center max-w-sm">Value</p>
          <p className="w-5/12 text-center max-w-sm">Probablity</p>
        </div>

        <div className="flex flex-col gap-2">
          {inputData.map((el, index) => (
            <div className="flex gap-2 " key={index}>
              <input
                type="text"
                placeholder="Value"
                value={el.value}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputData((prevData) =>
                    prevData.map((data, i) =>
                      i === index ? { ...data, value } : data
                    )
                  );
                }}
                className="border border-gray-300 px-2 py-1 rounded w-5/12 max-w-sm"
              />
              <input
                type="number"
                placeholder="Probability"
                value={el.probability}
                onChange={(e) => {
                  const probability = e.target.value;
                  setInputData((prevData) =>
                    prevData.map((data, i) =>
                      i === index ? { ...data, probability } : data
                    )
                  );
                }}
                className="border border-gray-300 px-2 py-1 rounded w-5/12 max-w-sm"
              />

              <button
                onClick={() => handleDeletePair(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded w-5/12 max-w-sm"
      >
        Submit
      </button>

      <div>
        {Object.keys(showData).length > 0 && (
          <div>
            <p>Results:</p>
            {Object.entries(showData).map(([option, count]) => (
              <div key={uuid()}>
                <p>
                  {option} {count}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-gray-100 p-2 rounded-lg border-4 border-double border-white border-opacity-25 mt-5 ">
        <pre
          className="text-xs md:text-base overflow-auto"
          style={{ autoflow: "auto" }}
        >
          <code>
            {`function biasedRandomSelection(options) {
    const totalProbability = options.reduce(
        (sum, option) => sum + Number(option.probability),0);

    const randomNum = Math.random() * totalProbability;

    let cumulativeProbability = 0;
    for (const option of options) {
    cumulativeProbability += Number(option.probability);
    if (randomNum < cumulativeProbability) {
            return option.value;
        }
    }   
    return null;
}`}
          </code>
        </pre>
      </div>

      <div className="bg-red-200 text-black p-2 rounded-lg border-4 border-double border-red-800 mt-5 border-opacity-25 text-sm md:text-base">
        <p className="font-bold">Explanation</p>
        <p>
          1. The function biasedRandomSelection takes an array of options as
          input.
        </p>
        <p>
          2. It calculates the total probability by summing up the probability
          values of all options using the reduce method.
        </p>
        <p>
          3. It generates a random number randomNum between 0 and the total
          probability.
        </p>
        <p>
          4. A variable cumulativeProbability is initialized to 0. This variable
          keeps track of the cumulative probability as we iterate through the
          options.
        </p>
        <p>5. The code then loops over each option in the options array.</p>
        <p>
          6. For each option, it adds the probability of the current option to
          the cumulativeProbability.
        </p>
        <p>
          7. If the randomNum is less than the cumulativeProbability, it means
          the random number falls within the range of the current option's
          probability.
        </p>
        <p>
          8. In that case, the function returns the value of the current option.
        </p>
        <p>
          9. If none of the options satisfy the condition, the function returns
          null as a fallback option (although it should never be reached).
        </p>
        <p>
          10. The function terminates, and the selected option value (or null)
          is returned to the calling code.
        </p>
      </div>
    </div>
  );
};
