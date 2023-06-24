const { Router } = require("express");

const axios = require("axios");
const { RateLimiterMemory } = require("rate-limiter-flexible");

const MathExpressionRoute = Router();

MathExpressionRoute.post("/", evaluateExpressionsRouteHandler);

const rateLimiter = new RateLimiterMemory({
  points: 50,
  duration: 1,
  durationUnit: 1000,
});

async function evaluateExpressionsWithThrottling(expressions) {
  try {
    const results = [];

    for (const expression of expressions) {
      await rateLimiter.consume(1);

      const response = await axios.get("http://api.mathjs.org/v4/", {
        params: {
          expr: expression,
        },
      });

      const result = response.data;
      results.push(`${expression} => ${result}`);
    }

    return results;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function processExpressionsConcurrently(expressions) {
  try {
    const chunkSize = Math.ceil(expressions.length / 10);
    const expressionChunks = [];

    for (let i = 0; i < expressions.length; i += chunkSize) {
      expressionChunks.push(expressions.slice(i, i + chunkSize));
    }

    const resultPromises = [];

    for (const chunk of expressionChunks) {
      resultPromises.push(evaluateExpressionsWithThrottling(chunk));
    }

    const results = await Promise.all(resultPromises);
    return results.flat();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function evaluateExpressionsRouteHandler(req, res) {
  try {
    const { inputData } = req.body;
    const results = await processExpressionsConcurrently(inputData);

    res.json({ results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { MathExpressionRoute };

/*

The code imports the necessary dependencies: express for creating the router, axios for making HTTP requests, and RateLimiterMemory from the rate-limiter-flexible library for rate limiting functionality.

A new Express router is created and assigned to the MathExpressionRoute constant.

The route handler is defined for the HTTP POST request to the "/" endpoint.

An instance of RateLimiterMemory is created with a configuration that allows 50 points (requests) per second.

The evaluateExpressionsWithThrottling function is defined. It takes an array of expressions as input and evaluates each expression by making an HTTP GET request to the math API. The function uses rateLimiter.consume to ensure that the requests are rate-limited according to the configured limits. The responses are stored in the results array along with the corresponding expressions.

The processExpressionsConcurrently function is defined. It takes an array of expressions as input and splits them into chunks to be processed concurrently. Each chunk of expressions is passed to evaluateExpressionsWithThrottling as a separate promise. The function waits for all promises to resolve using Promise.all and then flattens the results into a single array.

The route handler, evaluateExpressionsRouteHandler, is defined. It extracts the inputData from the request body and calls processExpressionsConcurrently to evaluate the expressions concurrently. The results are then sent as a JSON response.
*/
