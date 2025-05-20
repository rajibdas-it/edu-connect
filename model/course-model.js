import mongoose, { Schema } from "mongoose";


const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    modules: [{ type: Schema.ObjectId, ref: "Module" }], //property ta ekta array of string
    price: { type: Number, required: true },
    active: { type: Boolean, required: true },
    category: { type: Schema.ObjectId, ref: "Category", required: false },
    instructor: { type: Schema.ObjectId, ref: "User", required: false },
    testimonials: [{ type: Schema.ObjectId, ref: "Testimonial" }],
    quizSet: { type: Schema.ObjectId, required: false }

})


export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema)