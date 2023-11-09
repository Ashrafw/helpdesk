import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("Tickets").select();

  if (error) {
    console.log(error.message);
  }
  if (data) {
    return data;
  }
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <>
      {tickets &&
        tickets.map((ticket) => (
          <div key={ticket.id} className=" card ">
            <Link href={`/tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)}</p>
              <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
            </Link>
          </div>
        ))}
      {tickets && tickets.length === 0 && <p>There are no open tickets</p>}
    </>
  );
}
