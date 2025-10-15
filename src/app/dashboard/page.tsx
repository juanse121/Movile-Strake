"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está logueado
    const checkAuth = () => {
      try {
        console.log("🔍 Verificando autenticación...");
        
        // Usar setTimeout para asegurar que localStorage esté disponible
        setTimeout(() => {
          const isLoggedIn = localStorage.getItem("isLoggedIn");
          const userEmail = localStorage.getItem("userEmail");
          const userName = localStorage.getItem("userName");

          console.log("🔍 Datos de sesión:", { isLoggedIn, userEmail, userName });

          if (isLoggedIn === "true" && userEmail) {
            // ✅ USUARIO LOGUEADO - Mostrar dashboard
            setUser({
              name: userName || userEmail.split('@')[0] || "Usuario",
              email: userEmail
            });
            setLoading(false);
            console.log("🔍 Acceso permitido");
          } else {
            // ❌ USUARIO NO LOGUEADO - Redirigir
            console.log("🔍 Acceso denegado, redirigiendo...");
            setAccessDenied(true);
            setTimeout(() => {
              router.push("/login");
            }, 1500);
          }
        }, 100);
        
      } catch (error) {
        console.error("Error checking auth:", error);
        setAccessDenied(true);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    };

    checkAuth();
  }, [router]);

  const userStats = {
    streak: 1,
    applications: 0,
    profileCompletion: 30,
    badges: 1
  };

  const recommendedJobs = [
    { id: 1, title: "Desarrollador Frontend", company: "Tech Solutions", match: 95 },
    { id: 2, title: "React Developer", company: "Digital Agency", match: 88 },
    { id: 3, title: "Full Stack Engineer", company: "StartUp XYZ", match: 82 }
  ];

  const handleLogout = () => {
    // Limpiar la sesión
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || "U";
  };

  // Si acceso denegado, mostrar mensaje
  if (accessDenied) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Acceso denegado. Redirigiendo al login...</p>
        </div>
      </main>
    );
  }

  // Si está cargando
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tu dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                {getInitials(user.name)}
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">{user.name}</h1>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Completa tu perfil
              </button>
              <button 
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white mb-8">
          <div className="flex items-center">
            <div className="text-4xl mr-4">🎉</div>
            <div>
              <h2 className="text-xl font-bold mb-2">¡Bienvenido {user.name}!</h2>
              <p className="opacity-90">Continúa tu búsqueda de empleo.</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Racha actual</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.streak} día</p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
            <p className="text-xs text-green-600 mt-2">¡Mantén tu racha!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Postulaciones</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.applications}</p>
              </div>
              <div className="text-2xl">📨</div>
            </div>
            <p className="text-xs text-blue-600 mt-2">¡Envia tu primera!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Perfil completo</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.profileCompletion}%</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">Completa para más matches</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Insignias</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.badges}</p>
              </div>
              <div className="text-2xl">🏆</div>
            </div>
            <p className="text-xs text-purple-600 mt-2">¡Sigue ganando!</p>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Vacantes recomendadas para ti</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
              Ver todas →
            </button>
          </div>

          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <div className="text-right">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.match}% match
                  </div>
                  <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                    Postularme
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}