const { postResponse } = require("../features/communication");
const { findUser, createUserToken } = require("../features/users");

module.exports = {
  authenticate,
};

async function authenticate(req, res) {
  const { email, password } = req.body;
  if (!(isEmail(email) && isValidPassword(password))) {
    return postResponse(res, false, "invalid request payload");
  }

  const user = await findUser(email, password);
  if (!user) {
    return postResponse(res, false, "invalid credentials");
  }

  const token = await createUserToken(user);
  return postResponse(res, true, "authenticated successfully", { token });
}

function isEmail(test) {
  // make sure test is a real email syntax
  return true;
}

function isValidPassword(test) {
  // make sure test is a valid password syntax
  return true;
}
