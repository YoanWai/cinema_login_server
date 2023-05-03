const express = require("express");
const router = express.Router();

const {
  findUser,
  createUser,
  createUserToken,
  isValidUsername,
  isValidPassword,
  passwordCompare,
} = require("../business-logic-layer/usersBL");

const { postResponse } = require("../utils/customUtils");

// login
router.post("/authenticate", async function authenticate(req, res) {
  const { username, password } = req.body;

  const user = await findUser(username);

  if (!user) {
    return postResponse(res, false, "User not found");
  }

  const passwordMatch = await passwordCompare(password, user.password);

  if (!passwordMatch) {
    return postResponse(res, false, "Wrong password");
  }

  // create token
  const token = await createUserToken(user);
  return postResponse(res, true, "authenticated successfully", {
    token: token,
    user: {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      country: user.country,
      city: user.city,
      phone: user.phone,
      email: user.email,
    },
  });
});

// signup
router.post("/register", async function register(req, res) {
  const { fullname, username, password, country, city, phone, email } =
    req.body;

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
    return postResponse(res, false, "Username already exists");
  }

  const user = await createUser(
    { fullname, username, country, city, phone },
    password
  );
  if (!user) {
    return postResponse(res, false, "server error");
  }

  return postResponse(res, true, "user created", {
    userId: user.id,
  });
});

module.exports = router;
