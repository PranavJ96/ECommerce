const express = require("express");
const app = express();
const port = 5000;
const homeroute = require("./routes/auth");
var cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); 
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/api/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/api/auth", homeroute);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});