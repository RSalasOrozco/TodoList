"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
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
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password")
        })
      });

      if (res.ok) {
        alert("Registro exitoso. Por favor inicia sesión.");
        router.push("/login");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Error en el registro");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Error al procesar el registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded shadow-md w-96 text-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Registro
        </h1>

        {/* Campo Nombre (solo para registro) */}
        <input
          name="name"
          type="text"
          placeholder="Nombre completo"
          required
          className="w-full p-2 mb-4 border rounded text-white"
        />

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
          placeholder="Contraseña"
          required
          className="w-full p-2 mb-4 border rounded text-white"
        />
        <button
          type="submit"
          className="w-full bg-white text-black p-2 rounded hover:bg-gray-200 font-medium"
        >
          Registrarse
        </button>
        <p className="mt-4 text-center text-white">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-white hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
