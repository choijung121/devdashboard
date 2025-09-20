import GitHubWidget from '../components/githubwidgets';
import WeatherWidget from '../components/weatherwidgets';
import AboutMe from '../components/aboutme';

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">🧑‍💻 My Dev Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <div className="bg-white p-4 rounded-lg shadow">
                    <WeatherWidget />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <GitHubWidget />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <AboutMe />
                </div>
            </div>
        </main>
    )
}