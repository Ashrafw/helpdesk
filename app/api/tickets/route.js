import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const ticket = await request.json();
  console.log("ticket", ticket);

  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("Tickets")
    .insert({ ...ticket, user_email: session.user.email })
    .select()
    .single();
  console.log("data, error", data, error);
  return NextResponse.json({ data, error });
}
