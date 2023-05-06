function logReqs(req, res, next) {
  console.log(
    `@@@@@@@@@@@@@@\n REQ: METHOD: [${req.method}] \n PATH: ${
      req.url
    } \n Date: ${new Date().toLocaleString()} \n IP: ${req.ip} \n StatusCode: ${
      res.statusCode
    } \n Body: ${JSON.stringify(req.body)} \n`
  );

  console.log();
  next();
}

module.exports = logReqs;
