import mongoose, { Schema } from "mongoose";



const lessonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true },
    video_url: { type: String, required: true },
    published: { type: Boolean, required: true },
    slug: { type: String, required: true },
    access: { type: String, required: true },
})

export const Lesson = mongoose.models.Lesson ?? mongoose.model('Lesson', lessonSchema)