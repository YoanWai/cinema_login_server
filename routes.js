const express = require("express");
const {
  findUser,
  createUser,
  createUserToken,
  isValidUsername,
  isValidPassword,
} = require("./business-logic-layer/usersBL");

const router = new express.Router();

router.post("/authenticate", async function authenticate(req, res) {
  const { username, password } = req.body;
  if (!(isValidUsername(username) && isValidPassword(password))) {
    return postResponse(res, false, "invalid request payload");
  }

  const user = await findUser(username, password);
  if (!user) {
    return postResponse(res, false, "invalid credentials");
  }

  const token = await createUserToken(user);
  return postResponse(res, true, "authenticated successfully", { token });
});

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
  if (existingUser) {
    // user exists
    return postResponse(res, false, "User already exists");
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

function postResponse(res, success, message, data = {}) {
  if (!success) {
    res.status(403);
  }
  return res.json({
    success,
    message,
    data,
  });
}

/**
 * @param {import('express').Response} res
 * @param {boolean} success true = 200, false = 403
 * @param {string} message
 * @param {any} data
 */
