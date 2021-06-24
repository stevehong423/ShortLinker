const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//Import URL Schema
const URL = require("./models/urlSchema");

//Import MongoDB Key
const db = require("./config/databaseKey").mongoURI;

//Data Parser
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Connect To MongoDB & Invoke connectDB Function
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

//Routes
app.use("/api/shorten", require("./routes/api/shortenURL"));
app.use("/api/redirect", require("./routes/api/redirect"));

//Get All URLs
app.get("/", (req, res) => {
  URL.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get Specific URL
app.get("/:hash", (req, res) => {
  const hashId = req.params.hash;
  URL.findOne({ id: hashId }, (error, data) => {
    if (data) {
      console.log(data);
      res.redirect(`http://${data.url}`);
    } else {
      res.redirect("/");
    }
  });
});

//Port
const PORT = process.env.PORT || 5000;

//Port Listener
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
