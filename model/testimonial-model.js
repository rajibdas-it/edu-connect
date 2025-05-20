import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: { type: String, required: false },
    rating: { type: Number, required: false },
    courseId: { type: Schema.ObjectId, ref: "Course", required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true }
})


export const Testimonial = mongoose.models.Testimonial ?? mongoose.model("Testimonial", testimonialSchema)