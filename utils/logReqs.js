function logReqs(req, res, next) {
  console.log(
    `REQ: METHOD: [${req.method}]  PATH: ${
      req.url
    } - ${new Date().toLocaleString()} - ${req.ip} - ${res.statusCode}`
  );

  console.log();
  next();
}

module.exports = logReqs;
