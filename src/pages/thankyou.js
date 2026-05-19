import { useRouter } from "next/router";

export default function ThankYou() {
   const router = useRouter();
  const { query } = useRouter();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Thank you!</h2>
      <button
        className="button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => router.push("/")}
      >
        Home
      </button>
      <p className="mt-4">
        Your ticket number: <strong>{query.ticket}</strong>
      </p>
      <p className="mt-2">Our operations team will contact you soon.</p>
    </div>
  );
}
