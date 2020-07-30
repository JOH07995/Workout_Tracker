"use strict";

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now,
            unique: true
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Please enter exercise type."
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Please enter exercise name."
                },
                duration: {
                    type: Number,
                    required: "Duration of the excercise is required."
                },
                weight: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

module.exports = mongoose.model(`Workout`, workoutSchema);