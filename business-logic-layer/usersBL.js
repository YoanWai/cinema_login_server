const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtSign = promisify(jwt.sign);

const { JWT_SECRET } = process.env;

const UserModel = require("../data-access-layer/models/userModel");

/**
 * find user in database, optionally checking if password matches
 * @param {string} username
 * @param {string|false} [rawPassword=false]
 */
async function findUser(username, rawPassword = false) {
  const user = await UserModel.findOne({ username });
  if (!user) {
    return "User not found";
  }

  if (rawPassword === false) {
    return withoutPassword(user);
  }

  const passwordMatch = await passwordCompare(rawPassword, user.password);
  if (!passwordMatch) {
    return "Invalid password";
  }

  return withoutPassword(user);
}

async function createUser(userParameters, rawPassword) {
  const password = await passwordHash(rawPassword);
  const user = await UserModel.create({
    ...userParameters,
    password,
  });
  return withoutPassword(user);
}

function createUserToken(user) {
  const payload = {
    userId: user.id,
  };
  return jwtSign(payload, JWT_SECRET);
}

async function passwordHash(rawPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(rawPassword, salt);
}

function withoutPassword(user) {
  delete user.password;
  return user;
}

function passwordCompare(rawPassword, hashedPassword) {
  return bcrypt.compare(rawPassword, hashedPassword);
}

function isValidUsername(test) {
  // username must be at least 4 characters long
  return test.length > 3;
}

function isValidPassword(test) {
  // password must be at least 4 characters long
  return test.length >= 4;
}

module.exports = {
  findUser,
  createUser,
  createUserToken,

  isValidUsername,
  isValidPassword,
};
