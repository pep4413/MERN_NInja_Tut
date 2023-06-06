const { json } = require('express')
const Workout = require('../models/workoutModel')
const { default: mongoose } = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'No such workout'})
    }
    const workout = await Workout.findById(id)    

    res.status(200).json(workout)
}


// create new workout
const createWorkout  = async (req, res) => {
    const {title, load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout

// updtate a workout


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout
}