export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">Bienvenido a Strike Mobile Service🚀</h1>
      <p className="mt-4 text-lg text-gray-600">
        Encuentra tu próximo empleo fácilmente.
      </p>
      <a
        href="/login"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Inicia sesión
      </a>
      <a
        href="/register"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Registrate
      </a>
    </main>
  );
}
