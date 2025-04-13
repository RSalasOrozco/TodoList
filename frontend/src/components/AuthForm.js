"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await fetch(`http://localhost:3000/api/auth/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      // Guardar token y redirigir
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Auth error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500 mb-4">{error}</div>}

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
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
