import { replaceMongoIdInArray } from "@/lib/convertData"
import { Enrollment } from "@/model/enrollment-model"

export const getEnrollmentsForCourse = async (courseId) => {
    const enrollments = await Enrollment.find({ course_id: courseId }).lean()
    return replaceMongoIdInArray(enrollments)
}