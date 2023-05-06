function logReqs(req, res, next) {
  console.log(
    `[${req.method}] ${req.url} - ${new Date().toLocaleString()} - ${
      req.ip
    } - ${req.headers["user-agent"]}`
  );
  next();
}

module.exports = logReqs;
