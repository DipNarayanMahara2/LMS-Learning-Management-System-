import dbConnect from "@/database/connection";
import Course from "@/database/models/courses.schema";
import Enrollment from "@/database/models/enrollment.schema";
import Payment, {PaymentMethod} from "@/database/models/payment.schema";
import axios from "axios";
import authMiddleware from "../../../../middleware/auth..middleware";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function enrollCourse(req: Request) {
  try {
    await dbConnect();
    const response = await authMiddleware(req as NextRequest);
    if (response.status === 401) {
      return response;
    }

    const session = await getServerSession(authOptions);
    console.log(session.user, "SESSION");
    const studentId = session.user.id;
    const { course, whatsapp, paymentMethod } = await req.json();
    const enrollmentData = await Enrollment.create({
      whatsapp,
      course,
      student: studentId, // session.user.id
    });

    const courseData = await Course.findById(course);
    if (paymentMethod === paymentMethod.Esewa) {
    } else {
      // khalti

      await Payment.create({
        enrollment: enrollmentData._id,
        amount: courseData.price,
        paymentMethod: paymentMethod.Khalti,
      });
    }
    return Response.json(
      {
        message: "You enrolled the course",
        data : enrollmentData
      },
      { status: 201 }
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

export async function fetchEnrollments() {
  try {
    await dbConnect();
    const data = await Enrollment.find().populate("course").populate("student"); // return array []
    if (data.length === 0) {
      return Response.json(
        {
          message: "no enrollment found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Enrollments fetched!!",
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

export async function changeEnrollmentStatus(req: Request, id: string) {
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
