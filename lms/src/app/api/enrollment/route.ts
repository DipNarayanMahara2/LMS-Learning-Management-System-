import { enrollCourse, fetchEnrollments } from "./enrollment.controller"




export async function POST(req:Request){
  return enrollCourse(req)
}

export async function Get(){
  return fetchEnrollments()
}