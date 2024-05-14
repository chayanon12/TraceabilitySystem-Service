const express = require("express");
const app = express();
const port = 3001;
const oracledb = require("oracledb");
const LoginService = require("./Conncetion/LoginService.cjs");


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());


app.post("/login", LoginService.login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});