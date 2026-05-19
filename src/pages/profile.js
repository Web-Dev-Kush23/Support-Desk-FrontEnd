import { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";

export default function Profile() {
  const [contact, setContact] = useState("");
  const [tickets, setTickets] = useState([]);
  const router = useRouter();
  const { query } = useRouter();

  const fetchTickets = async () => {
    const res = await API.get(`/tickets/user/${contact}`);
    setTickets(res.data);
  };
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-xl font-bold">My Tickets</h2>
      <div className="mt-4 flex gap-4 mt-2">
        <input
          placeholder="Enter contact no"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="p-2 border"
        />
        <button
          onClick={fetchTickets}
          className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => router.push("/")}
        >
          Home
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {tickets.map((t) => (
          <div key={t._id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">
                  {t.ticketNumber} —{t.serviceType}
                </div>
                <div className="text-sm">{t.issue}</div>
              </div>
              <div>
                <div className="text-sm">
                  {new Date(t.createdAt).toLocaleString()}
                </div>
                <div className="mt-1">
                  Status: <strong>{t.status}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
