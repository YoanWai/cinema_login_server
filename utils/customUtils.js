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

module.exports = {
  postResponse,
};
