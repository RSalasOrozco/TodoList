"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"), // ✅ Añadimos el campo name
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Campo Name añadido */}
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
