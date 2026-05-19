import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../../utils/api";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login"); // redirect to login if not logged in
    } else {
      router.push("/admin/signup")
      fetchAll();
    }
  }, []);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await API.get("/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err);
      alert("Session expired or invalid token");
      localStorage.removeItem("admin_token");
      router.push("/admin/login");
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("admin_token");
    await API.put(
      `/tickets/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAll();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Operations Dashboard</h2>
    
      <div className="mt-4 space-y-3">
        {tickets.map((t) => (
          <div key={t._id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">
                  {t.ticketNumber} — {t.name}
                </div>
                <div className="text-sm">{t.issue}</div>
              </div>
              <div className="text-right">
                <div>{t.status}</div>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => updateStatus(t._id, "In Progress")}
                    className="px-2 py-1 border rounded"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(t._id, "Closed")}
                    className="px-2 py-1 border rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
