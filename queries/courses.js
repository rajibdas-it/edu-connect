import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";



export async function getCourses() {
    const courses = await Course.find({}).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",//course model er kon field hobe.
        model: User
    })
    return courses
}