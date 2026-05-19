import Link from "next/link";
export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold items-stretch ">Support Desk</h1>
      <p className="mt-4">Raise a ticket or view your tickets.</p>
      <div className="mt-6 space-x-4">
        <Link href="/raise-ticket">
          <button className="px-4 py-2 rounded bg-blue-600 text-white">
            Raise Ticket
          </button>
        </Link>
        <Link href="/profile">
          <button className="px-4 py-2 bg-blue-600 rounded border">My Tickets</button>
        </Link>
        {/* <Link href="/admin/dashboard">
          <button className="px-4 py-2  bg-blue-600 rounded border">Admin Dashboard</button>
        </Link> */}
      </div>
    </div>
  );
}
