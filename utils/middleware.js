const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan-body");

const middleware = app => {
  // Parses url-encoded data (parameters) with the querystring library when true.
  app.use(bodyParser.urlencoded({ extended: false }));
  // Parses req.body, making it readable on the request object
  app.use(bodyParser.json());
  // Enables Cross Origin Resource Sharing
  app.use(cors());
};

const developmentMiddleware = app => {
  logger(app);
};

module.exports = { middleware, developmentMiddleware };
