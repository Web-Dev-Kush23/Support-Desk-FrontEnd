import { useState } from "react";
import API from "../../utils/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/signup", form);
      alert("Signup successful! Please login now.");
      window.location.href = "/admin/login";
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again with different credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md space-y-3 w-80"
      >
        <h2 className="text-lg font-bold text-center">Admin Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <a href="/admin/login" className="text-blue-500">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
