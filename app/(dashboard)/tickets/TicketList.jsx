import Link from "next/link";
import React from "react";

async function getTickets() {
  const response = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });
  return response.json();
}

export default async function TicketList() {
  const tickets = await getTickets();
  console.log("tickets", tickets);
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className=" card ">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}</p>
            <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && <p>There are no open tickets</p>}
    </>
  );
}