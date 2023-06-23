const { Router } = require("express");

const RandomBiasnessRoute = Router();

RandomBiasnessRoute.post("/", (req, res) => {
    const { inputData, occurrences } = req.body;
    const counters = {};
    let totalProbability = 0;
  
    inputData.forEach((option) => {
      counters[option.value] = 0;
      totalProbability += Number(option.probability);
    });
  
    if (totalProbability) {
      inputData.forEach((option) => {
        option.probability = (option.probability / totalProbability) * 100;
      });
  
      totalProbability = 100;
    }
  
    for (let i = 0; i < occurrences; i++) {
      const selectedOption = biasedRandomSelection(inputData);
      counters[selectedOption]++;
    }
  
    Object.entries(counters).forEach(([option, count]) => {
      console.log(`Occurrences of ${option}:`, count);
    });
  
    res.status(201).send(counters);
  });

function biasedRandomSelection(options) {
  
  const totalProbability = options.reduce(
    (sum, option) => sum + Number(option.probability),
    0
  );

  const randomNum = Math.random() * totalProbability;

  let cumulativeProbability = 0;
  for (const option of options) {
    cumulativeProbability += Number(option.probability);
    if (randomNum < cumulativeProbability) {
      return option.value;
    }
  }

  return null;
}

module.exports = { RandomBiasnessRoute };
