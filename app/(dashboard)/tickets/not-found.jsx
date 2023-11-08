import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" text-center">
      <h2 className="text-3xl">We Hit a brick wall</h2>
      <p>we could not find the page you are looking for.</p>
      <p>
        Go back to the <Link href="/tickets">Tickets</Link>.
      </p>
    </main>
  );
}
