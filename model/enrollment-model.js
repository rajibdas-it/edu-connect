import mongoose, { Schema } from "mongoose"

const enrollmentSchema = new Schema({
    enrollment_date: { type: Date, required: true },
    status: { required: true, type: String },
    completion_date: { required: true, type: Date },
    method: { required: true, type: String },
    course: { type: Schema.ObjectId, ref: "Course" },
    student: { type: Schema.ObjectId, ref: "User" }
})


export const Enrollment = mongoose.models.Enrollment ?? mongoose.model('Enrollment', enrollmentSchema)