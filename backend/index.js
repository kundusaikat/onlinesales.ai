const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { RandomBiasnessRoute } = require("./routes/random-biasness");
dotenv.config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) =>
  res.send("Welcome to the onlinesales.ai assignment")
);

app.use("/random-biasness", RandomBiasnessRoute);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}/`);
});
