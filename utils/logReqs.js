function logReqs(req, res, next) {
  console.log(
    `@@@@@@@@@@@@@@\n REQ: METHOD: [${req.method}] \n PATH: ${
      req.url
    } \n Date: ${new Date().toLocaleString()} \n IP: ${req.ip} \n StatusCode: ${
      res.statusCode
    } \n StatusMessage: ${res.statusMessage} \n Body: ${req} \n`
  );

  console.log();
  next();
}

module.exports = logReqs;
