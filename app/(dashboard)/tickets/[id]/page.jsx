import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";

//  if params does not exist, the return a 404 page
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: ticket, error } = await supabase
    .from("Tickets")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `Ticket | ${ticket?.title || "Ticket not found"}`,
  };
}

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("Tickets").select().eq("id", id).single();

  if (!data) {
    notFound();
  }
  if (data) {
    return data;
  }
}

export default async function TicketDetails({ params }) {
  const id = params.id;
  const ticket = await getTicket(id);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <main className="">
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session.user.email === ticket.user_email && <DeleteButton id={id} />}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by: {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
      </div>
    </main>
  );
}
