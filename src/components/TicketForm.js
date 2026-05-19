import { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";
export default function TicketForm({ initialContact }) {
  const [form, setForm] = useState({
    name: "",
    contactNo: initialContact || "",
    serviceType: "Storage",
    issue: "",
    email: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("contactNo", form.contactNo);
      fd.append("email", form.email);
      fd.append("serviceType", form.serviceType);
      fd.append("issue", form.issue);
      if (file) fd.append("image", file);
      const res = await API.post("/tickets", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/thankyou?ticket=${res.data.ticketNumber}`);
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Something went wrong while submitting the ticket."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="ticketForm space-y-2 p-2">
      <div className="field gap-4 flex justify-start items-center">
        <label className="w-full">Enter Name</label>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2
border"
        />
      </div>
      <div className="field gap-4 flex justify-start items-center">
        <label className="flex justify-start items-center">
          Enter Contact No.
        </label>
        <input
          required
          placeholder="Contact No"
          value={form.contactNo}
          onChange={(e) => setForm({ ...form, contactNo: e.target.value })}
          className="w-full p-2 border"
        />
      </div>
      <div className="field gap-4 flex justify-start items-center">
        <label className="flex justify-start items-center">Enter Email</label>
        <input
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border"
        />
      </div>
      <div className="field gap-4 flex justify-start items-center">
        <label className="flex justify-start items-center">
          Select Service Type
        </label>
        <select
          value={form.serviceType}
          onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
          className="w-full p-2 border"
        >
          <option>Storage</option>
          <option>Relocation</option>
        </select>
      </div>
      <div className="field gap-4 flex justify-start items-center">
        <label className="flex justify-start items-center">
          Issue Details:
        </label>
        <textarea
          required
          placeholder="Describe issue"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          className="w-full p-2border"
        />
      </div>
      <div className="field gap-4 flex justify-start itemds-center">
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        /> */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bgblue-600 text-white rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
