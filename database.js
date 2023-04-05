const mongoose = require("mongoose");
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { family: 4 })
  .catch(onMongooseError);

function onMongooseError(error) {
  console.error("mongoose failed to connect:", error);
  process.exit(1);
}
