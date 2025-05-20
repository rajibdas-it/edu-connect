import Test from "@/components/ui/Test";
import { getCourses } from "@/queries/courses";


export default async function Home() {
  const allCourses = await getCourses()
  // console.log(allCourses);
  console.log(allCourses[0].instructor?.socialMedia);
  console.log(allCourses[0]?.modules);
  console.log(allCourses[0]?.testimonials);

  return (
    <Test />

  );
}
