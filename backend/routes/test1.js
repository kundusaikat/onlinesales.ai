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
  const results = [];

  for (const expression of expressions) {
    try {
      await rateLimiter.consume(1);

      const response = await axios.get("http://api.mathjs.org/v4/", {
        params: {
          expr: expression,
        },
      });

      const result = await response.data;

      results.push(`${expression} => ${result}`);
    } catch (error) {
      console.error(`Error evaluating expression "${expression}":`, error);
      results.push(`${expression} => Error: ${error.message}`);
    }
  }

  return results;
}

async function processExpressionsConcurrently(expressions) {
  const concurrencyLimit = 50;
  const chunkSize = Math.ceil(expressions.length / concurrencyLimit);
  const expressionChunks = [];

  for (let i = 0; i < expressions.length; i += chunkSize) {
    expressionChunks.push(expressions.slice(i, i + chunkSize));
  }

  const resultPromises = [];

  for (const chunk of expressionChunks) {
    const promise = evaluateExpressionsWithThrottling(chunk);
    resultPromises.push(promise);
  }

  const results = await Promise.all(resultPromises);

  return results.flat();
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
When a request is received, the evaluateExpressionsRouteHandler function is executed.

The code uses the RateLimiterMemory class from the rate-limiter-flexible library to implement rate limiting. It allows a maximum of 50 requests per second.

The processExpressionsConcurrently function splits the input expressions into chunks based on a concurrency limit of 50. It then creates promises to evaluate each chunk concurrently using the evaluateExpressionsWithThrottling function.

The evaluateExpressionsWithThrottling function iterates through the expressions, consuming a point from the rate limiter for each expression. It makes an HTTP GET request to "http://api.mathjs.org/v4/" with the expression as a parameter. The response data is extracted, and the expression along with the result is added to the results array. If an error occurs during evaluation, it logs the error and adds an error message to the results array.

Finally, the route handler extracts the inputData from the request body and invokes processExpressionsConcurrently to evaluate the expressions concurrently. The results are returned as a JSON response.
*/
