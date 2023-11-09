"use client";
import React, { useState } from "react";
import AuthForm from "../AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setFormError("");
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setFormError(error.message);
    }
    if (!error) {
      router.push("/");
    }
  };
  return (
    <div>
      <h2 className=" text-center">Login</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {formError && <div className="error">{formError}</div>}
    </div>
  );
}
