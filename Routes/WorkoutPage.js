const express = require('express');
const router = express.Router();
const UserWorkout = require('../models/WorkoutModel'); // Import the Workout model

router.post('/workouts', async (req, res) => {
    try {
        const { exerciseType, duration, intensity, userId } = req.body;
        const workout = new UserWorkout({ exerciseType, duration, intensity, userId });
        await workout.save();
        res.json(workout);
    } catch (err) {
        console.error('fail to logging workout:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/workouts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const workouts = await UserWorkout.find({ userId });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/workouts/:workoutId', async (req, res) => {
    const { workoutId } = req.params;
    const { exerciseType, duration, intensity } = req.body;
    
    try {
        
        const updatedWorkout = await UserWorkout.findByIdAndUpdate(workoutId, {
            exerciseType,
            duration,
            intensity
        }, { new: true });
        
        res.json(updatedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete('/workouts/:workoutId', async (req, res) => {
    const { workoutId } = req.params;

    try {
        
        await UserWorkout.findByIdAndDelete(workoutId);
        
        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
