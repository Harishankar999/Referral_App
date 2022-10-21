const express = require("express");
const cors = require("cors");
const connection = require("./config/connection");
const userManage = require("./routes/user.Routes");
const UserModel = require("./model/User.model");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is an API for referral");
});

app.get("/alluser/:id", async (req, res) => {
  let { id } = req.params;
  let userDeatils = await UserModel.find({ _id: id });
  res.send(userDeatils);
});

app.get("/referral", async (req, res) => {
  let query = req.query;
  if (query) {
    let referalCount = await UserModel.find(query);
    res.send(referalCount);
  }
});

app.use("/user", userManage);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Server Connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server Running on port no 8080");
});
