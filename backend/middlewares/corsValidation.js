/* eslint-disable object-shorthand */
/* eslint-disable linebreak-style */
const allowedCors = require('../utils/allowedCors');

module.exports.corsOptions = {
  origin: function (origin, callback) {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports.corsValidation = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
