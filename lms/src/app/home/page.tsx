"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <Image
          src={session.user?.image || "/default-profile.png"}
          alt="profile image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h1>Welcome, {session.user?.name}</h1>
        <h3>{session.user?.email}</h3>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in With Google</button>
    </div>
  );
}
