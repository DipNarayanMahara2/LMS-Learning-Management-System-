// check if the user/request is logged in or not
// also check if the user is admin or not after logged in

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/database/models/user.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== Role.Admin) {
    return Response.json(
      {
        message: "You don't have permission to perform this action",
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
};

export default authMiddleware;
