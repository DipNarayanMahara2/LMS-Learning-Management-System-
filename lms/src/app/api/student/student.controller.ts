import User, { Role } from "@/database/models/user.schema";




export async function fetchStudents()
{
  try {
    const students = await User.find({role:Role.Student})
    if(students.length ===0){
      return Response.json({
        message:"No student found",
        data : []
      })
    }
    return Response.json({
      message:"Students found",
      data : students
    })
  } catch (error) {
    console.log(error)
    return Response.json({
      message: "something went wrong"
    })
    
  }
}