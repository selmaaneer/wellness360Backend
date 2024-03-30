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


app.use((req, res, next) => {
    // Set headers to allow cross-origin requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        // Respond with 200 OK status for preflight requests
        res.status(200).end();
    } else {
        // Move to the next middleware
        next();
    }
});


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));

router.get("/", (req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
 });

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/users",workoutRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

