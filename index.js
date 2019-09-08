require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const { middleware, developmentMiddleware } = require("./utils/middleware");

const app = express();
middleware(app);

app.use("/test", (req, res, next) => {
  res.status(200).send({ msg: "Winter is coming" });
});

// app.use("*", (req, res, next) => {
//   res.status(404).send({ err: "NOT FOUND" });
// });

if (process.env.NODE_ENV === "development") {
  console.log("dev");
  // Run development middleware
  developmentMiddleware(app);
}
// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  console.log("prod");
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
