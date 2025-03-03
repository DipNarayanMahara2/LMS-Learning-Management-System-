"use client";

import Dashboard from "@/components/dashboard/dashboard";
import { stat } from "fs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(status, "STATUS");
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      redirect("/home");
    }
  }, [session, status]);
  if(status === "loading" || status==="unauthenticated") return <p>loading...</p>

  return <Dashboard>{children}</Dashboard>;
}

export default AdminLayout;
