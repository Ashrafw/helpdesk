import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";
export const metadata = {
  title: "Community Helpdesk | tickets",
};
export default function Tickets() {
  return (
    <main className=" ">
      <div>
        <h2>Tickets</h2>
        <p>
          <small>Currently open tickets</small>
        </p>
        <Link href="/tickets/create">
          <button className="btn-primary">Create ticket</button>
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
