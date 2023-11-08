import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
export const metadata = {
  title: "Tickets",
};
export default function Tickets() {
  return (
    <main className=" ">
      <div>
        <h2>Tickets</h2>
        <p>
          <small>Currently open tickets</small>
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
