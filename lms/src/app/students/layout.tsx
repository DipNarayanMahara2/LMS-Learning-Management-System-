"use client";

import StudentDashboard from "@/components/dashboard/studetnDashboard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  useEffect(() => {
    // console.log(status, "STATUS");
    if (status === "loading") return;

    if (!session) {
      redirect("/home");
    }
  }, [session, status]);
  if (status === "loading" || status === "unauthenticated")
    return <p>loading...</p>;

  return <StudentDashboard>{children}</StudentDashboard>;
}

export default AdminLayout;
