type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
};

const jobs: Job[] = [
  { id: 1, title: "Desarrollador Frontend", company: "TechCorp", location: "Remoto" },
  { id: 2, title: "Diseñador UI/UX", company: "Designify", location: "Ciudad de México" },
  { id: 3, title: "Ingeniero Backend", company: "DataWorks", location: "Buenos Aires" },
];

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Ofertas de empleo</h1>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Ver más
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
