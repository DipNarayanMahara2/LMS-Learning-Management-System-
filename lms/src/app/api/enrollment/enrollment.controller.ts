import dbConnect from "@/database/connection"
import Enrollment from "@/database/models/enrollment.schema"


export async function enrollCourse(req:Request){

}


export async function fetchEnrollments() {
   try {
        await dbConnect()
        const data = await Enrollment.find().populate("course").populate("student") // return array []
        if(data.length === 0){
            return Response.json({
                message : "no enrollment found"
            },{status:404})
        }
        return Response.json({
            message : "Enrollments fetched!!", 
            data
        },{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({
            message : "Something went wrong"
        },{status : 500})
    }
}

export async function fetchEnrollment(id: string) {
  try {
    await dbConnect();
    const data = await Enrollment.findById(id)
      .populate("course")
      .populate("student"); // returns in object
    if (!data) {
      return Response.json(
        {
          message: "no enrollment with that id found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "enrollment fetched!!",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function changeEnrollmentStatus(req:Request, id: string){
   try {
     await dbConnect();
     const { status } = await req.json();
     const data = await Enrollment.findByIdAndUpdate(id, {
       enrollmentStatus: status,
     });
     return Response.json(
       {
         message: "enrollment status updated!!",
         data,
       },
       { status: 200 }
     );
   } catch (error) {
     console.log(error);
     return Response.json(
       {
         message: "Something went wrong",
       },
       { status: 500 }
     );
   }
}

export async function deleteEnrollment(id: string) {
  try {
    await dbConnect();
    await Enrollment.findByIdAndDelete(id); // returns in object
    return Response.json(
      {
        message: "enrollment deleted!!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}