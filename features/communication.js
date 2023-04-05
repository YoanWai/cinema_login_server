module.exports = {
  postResponse,
};

/**
 * @param {import('express').Response} res
 * @param {boolean} success true = 200, false = 403
 * @param {string} message
 * @param {any} data
 */
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
