import React from "react";
import Logo from "../components//dojo-logo.png";
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({ children }) {
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
        <Link href="/singup">Sign up</Link>
        <Link href="/Login">Login</Link>
      </nav>
      {children}
    </>
  );
}
