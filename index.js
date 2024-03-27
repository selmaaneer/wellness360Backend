const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const authRoute = require("./Routes/AuthRoute");
const profileRoute = require("./Routes/ProfilePage")
const workoutRoute = require("./Routes/WorkoutPage")

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const dbURL = process.env.DB_URL;

app.use(express.json());


app.use(cors({
  origin: 'https://wellness360frondend.vercel.app', // Remove the trailing slash
  credentials: true 
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));


mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/users",workoutRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

