require("./config/database");


const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routers/userRouter");
const logReqs = require("./utils/logReqs");


app.use(cors());
app.use(express.json());
app.use(logReqs)
app.use(routes);


require("dotenv").config();
validateEnvironmentOrDie();

const { LISTEN_PORT } = process.env;

app.listen(LISTEN_PORT, () => {
  console.log(`Server listening on port ${LISTEN_PORT}!`);
});

/**
 * makes sure process.env object contains
 * every variables requried for the server to run
 */
function validateEnvironmentOrDie(exitCode = 1) {
  const requiredKeys = [
    "LISTEN_PORT",
    "DB_NAME",
    "DB_HOST",
    "DB_PORT",
    "JWT_SECRET",
  ];
  const missingKeys = [];
  for (const key of requiredKeys) {
    if (!(key in process.env)) {
      missingKeys.push(key);
    }
  }

  if (!missingKeys.length) {
    return true;
  }

  console.error("missing required keys at .env file:", missingKeys);
  process.exit(exitCode);
}

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
