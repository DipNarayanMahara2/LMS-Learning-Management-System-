"use client";

import Dashboard from "@/components/dashboard/dashboard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";


function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(status, "STATUS");
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      redirect("/");
    }
  }, [session, status]);

  return <Dashboard>{children}</Dashboard>;
}

export default AdminLayout;
