import Test from "@/components/ui/Test";
import { getCourses } from "@/queries/courses";


export default async function Home() {
  const allCourses = await getCourses()
  console.log(allCourses);
  return (
    <Test />

  );
}
