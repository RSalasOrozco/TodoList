"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya está logueado
    const token = localStorage.getItem("token");
    if (token) {
      // Mostrar mensaje y redirigir
      alert("Ya estás logueado. Serás redirigido al dashboard.");
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password")
        })
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded shadow-md w-96 text-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded text-white"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border rounded text-white"
        />
        <button
          type="submit"
          className="w-full bg-white text-black p-2 rounded hover:bg-gray-200 font-medium"
        >
          Login
        </button>
        <p className="mt-4 text-center text-white">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-white hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
