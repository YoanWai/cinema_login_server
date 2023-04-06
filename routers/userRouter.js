const express = require("express");
const router = express.Router();

const {
  findUser,
  createUser,
  createUserToken,
  isValidUsername,
  isValidPassword,
} = require("../business-logic-layer/usersBL");

const { postResponse } = require("../customUtils");

// login
router.post("/authenticate", async function authenticate(req, res) {
  const { username, password } = req.body;


  const user = await findUser(username, password);
  console.log(user);
  if (user === "User not found") {
    return postResponse(res, false, user);
  }
  if (user === "Invalid password") {
    return postResponse(res, false, user);
  }

  const token = await createUserToken(user);
  return postResponse(res, true, "authenticated successfully", { token });
});

// signup
router.post("/register", async function register(req, res) {
  const { fullname, username, password } = req.body;

  if (!isValidUsername(username)) {
    return postResponse(
      res,
      false,
      "username needs to be 3-20 characters long"
    );
  }

  if (!isValidPassword(password)) {
    return postResponse(
      res,
      false,
      "password needs to be 4-20 characters long"
    );
  }

  const existingUser = await findUser(username);
  if (existingUser ) {
    // user exists
    return postResponse(res, false, "Username already exists");
  }

  const user = await createUser({ fullname, username }, password);
  if (!user) {
    return postResponse(res, false, "server error");
  }

  return postResponse(res, true, "user created", {
    userId: user.id,
  });
});

module.exports = router;

/**
 * @param {import('express').Response} res
 * @param {boolean} success true = 200, false = 403
 * @param {string} message
 * @param {any} data
 */
