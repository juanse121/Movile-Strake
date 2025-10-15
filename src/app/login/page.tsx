"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔍 1. Botón presionado");
    setLoading(true);
    setError("");

    try {
      console.log("🔍 2. Enviando datos:", form);
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log("🔍 3. Respuesta status:", response.status);
      
      const data = await response.json();
      console.log("🔍 4. Datos recibidos:", data);

      if (response.ok) {
        console.log("🔍 5. Login EXITOSO - Guardando sesión");
        
        // ✅ GUARDAR LA SESIÓN CORRECTAMENTE
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("userName", data.user?.name || form.email.split('@')[0]);
        
        console.log("🔍 6. Sesión guardada, redirigiendo...");
        router.push("/dashboard");
      } else {
        console.log("🔍 6. Login FALLIDO:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error("🔍 7. ERROR:", error);
      setError("Error de conexión");
    } finally {
      console.log("🔍 8. Finalizando");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Iniciar sesión
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-green-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}