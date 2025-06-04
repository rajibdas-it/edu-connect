import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentsForCourse } from "./enrollment";



export async function getCourseList() {
    const courses = await Course.find({}).select(["title", "subtitle",
        "thumbnail", "modules", "price",
        "category", "instructor", "testimonials"]).populate({
            path: "category",
            model: Category
        }).populate({
            path: "instructor",//course model er kon field hobe.
            model: User
        }).populate({
            path: "testimonials",//course model er kon field hobe.
            model: Testimonial
        }).populate({
            path: "modules",//course model er kon field hobe.
            model: Module
        }).sort({ createdAt: -1 }).lean()
    return replaceMongoIdInArray(courses)
}

export async function getCourseDetails(id) {
    const course = await Course.findById(id)
        .populate({
            path: "category",
            model: Category
        }).populate({
            path: "instructor",
            model: User
        }).populate({
            path: "modules",
            model: Module
        }).populate({
            path: "testimonials",
            model: Testimonial,
            populate: {
                path: "user",
                model: User
            }
        })
        .lean()
    return replaceMongoIdInObject(course)
}


export async function getCourseDetailsByInstructor(insId) {
    const courses = await Course.find({ instructor: insId }).lean()
    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course._id.toString())
            return enrollment
        })
    )
    console.log(enrollments);
    return {
        totalCourse: courses.length,

    }
}