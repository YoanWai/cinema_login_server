const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const promisify = require("util");

const jwtSign = promisify(jwt.sign);

const { JWT_SECRET } = process.env;

const UserModel = require("../models/userModel");

module.exports = {
  findUser,
  createUser,
  createUserToken,
};

async function findUser(email, rawPassword) {
  const password = await passwordHash(rawPassword);
  return UserModel.findOne({ email, password });
}

async function createUser(user, rawPassword) {
  user.password = await passwordHash(rawPassword);
  return UserModel.create(user);
}

function createUserToken(user) {
  const payload = {
    userId: user.id,
  };
  return jwtSign(payload, JWT_SECRET);
}

async function passwordHash(rawPassword) {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(rawPassword, salt);
}
