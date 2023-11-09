import React from "react";
import Logo from "../components//dojo-logo.png";
import Image from "next/image";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    redirect("/");
  }
  return (
    <>
      <nav>
        <Image
          src={Logo}
          alt="Community Helpdesk logo"
          width={70}
          placeholder="blur"
          quality={100}
        />
        <h1>Community Helpdesk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
