const { postResponse } = require("../features/communication");
const { findUser, createUser, createUserToken, isValidUsername, isValidPassword } = require("../features/users");

module.exports = {
  authenticate,
  register,
};

async function authenticate(req, res) {
  const { username, password } = req.body;
  if (!(isValidUsername(username) && isValidPassword(password))) {
    return postResponse(res, false, "invalid request payload");
  }

  const user = await findUser(username, password);
  if (!user) {
    return postResponse(res, false, "invalid credentials");
  }
  console.log('req.body', req.body)
  console.log('user', user)

  const token = await createUserToken(user);
  return postResponse(res, true, "authenticated successfully", { token });
}

async function register(req, res) {
  const { username, password } = req.body;
  if (!(isValidUsername(username) && isValidPassword(password))) {
    return postResponse(res, false, "invalid request payload");
  }
  const existingUser = await findUser(username);
  if (existingUser) {
    // user exists
    return postResponse(res, false, "invalid request");
  }

  const user = await createUser({ username }, password);
  if (!user) {
    return postResponse(res, false, "server error");
  }

  return postResponse(res, true, "user created", {
    userId: user.id,
  });
}