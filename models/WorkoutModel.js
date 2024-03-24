const mongoose = require("mongoose");


const WorkoutSchema = new mongoose.Schema({
    exerciseType: String,
    duration: Number,
    intensity: String,
    userId: String // For associating workouts with users
});

module.exports = mongoose.model("UserWorkout", WorkoutSchema);