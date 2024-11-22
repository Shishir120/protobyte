const express = require('express');
const cors = require("cors");
require('./database/config')
const User = require('./database/user')
const weatherRelatedTips = require("./gemini");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to agro-sphere session" });
});

// signup api
app.post('/signup', async (req, res) => {
  let data = new User(req.body);
  let response = await data.save();
  res.send(response);
})

// login api
app.post('/login', async (req, res) => {

  if (req.body.email && req.body.password) {
    let data = await User.findOne(req.body).select("-password");
    if (data) {
      res.send("User Found");
    } else{
        res.send({ result: "User not found" });
    }
  }
})


app.get('/weather/:index', async (req, res) => {
    let geminiResponse = await weatherRelatedTips(req.params.index);
    res.send(geminiResponse);
})


// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});