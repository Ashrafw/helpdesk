import { notFound } from "next/navigation";
import React from "react";

//  if params does not exist, the return a 404 page
export const dynamicParams = false;

// generate all possible params to help future fetches
export async function generateStaticParams() {
  const response = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });
  const tickets = await response.json();
  return tickets.map((ticket) => ({ id: ticket.id }));
}

async function getTicket(id) {
  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    notFound();
  }
  return response.json();
}

export default async function TicketDetails({ params }) {
  const id = params.id;

  const ticket = await getTicket(id);
  console.log("ticket", ticket);
  return (
    <main className="">
      <nav>
        <h2>Ticket Details</h2>
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
