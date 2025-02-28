import dbConnect from "@/database/connection";
import Course from "@/database/models/courses.schema";
import Enrollment from "@/database/models/enrollment.schema";
import Lesson from "@/database/models/lesson.Schema";

export async function enrollCourse(req: Request) {
  try {
    await dbConnect();

    const { course, whatsapp } = await req.json();

    const data = await Enrollment.create({
      course,
      whatsapp,
      student: "11",
    });

    return Response.json(
      {
        message: "you enrooled the course successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchEnrollments() {
  try {
    await dbConnect();
    const data = await Enrollment.find().populate("course").populate("student");

    if (data.length == 0) {
      return Response.json(
        {
          message: "You have not enrolled in this course",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Enrollment Fetched",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchEnrollment(id: string) {
  try {
    await dbConnect();

    const data = await Enrollment.findById(id)
      .populate("course")
      .populate("student");
    if (!data) {
      return Response.json(
        {
          message: "no enrollment found found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "enrollment fetched",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function deleteEnrollment(id: string) {
  try {
    await dbConnect();

    await Enrollment.findByIdAndDelete({ id });

    return Response.json(
      {
        message: "Enrollment deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function changeEnrollmentStatus(req: Request, id: string) {
  try {
    await dbConnect();

    const { status } = await req.json();
   const data = await Enrollment.findByIdAndUpdate(id, {
      enrollmentStatus: status,
    });
    return Response.json(
      {
        message: "enrollment fetched !!",
        data
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}
