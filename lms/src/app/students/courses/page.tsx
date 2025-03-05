"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CourseCard from "./components/courseCard";
import { useEffect } from "react";
import { fetchCourses } from "@/store/courses/courseSlice";

function Course() {
  const { courses } = useAppSelector((store) => store.courses);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly">
      {courses.length > 0 &&
        courses.map((courses) => {
          return <CourseCard key={courses?._id} course ={courses}/>;
        })}
    </div>
  );
}

export default Course;
