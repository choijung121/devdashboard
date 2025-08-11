"use client";

import { useEffect, useState } from "react";

interface Repo {
    id: number; 
    name: string; 
    html_url: string; 
    stargazers_count: number;
    updated_at: string;
}

interface Profile {
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
}

export default function GitHubWidget() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const username = "choijung121"; // Replace with your GitHub username

    useEffect(() => {
        async function fetchData() {
            try {
                const [profileRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
                ]);

                const profileData = await profileRes.json();
                const reposData = await reposRes.json();

                setProfile(profileData);
                setRepos(reposData);
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoading(false); 
            }
        } 
        fetchData();
    }, [])

    if (loading) return <div className="bg-white p-4 rounded-xl shadow-md">Loading...</div>;
    if (!profile) return <div className="bg-white p-4 rounded-xl shadow-md">Failed to load GitHub data</div>;

    return (
        <div className="relative p-4 max-w-md mx-auto">
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-4">
                <img src={profile.avatar_url} alt={profile.name} className="w-16 h-16 rounded-full" />
                <div>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-600">
                    {profile.name}
                </a>
                <p className="text-sm text-gray-600">{profile.bio}</p>
                </div>
            </div>

            {/* Repos List */}
            <h3 className="font-semibold mb-2">Latest Repositories</h3>
            <ul className="space-y-2">
                {repos.map(repo => (
                    <li key={repo.id} className="pb-1">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {repo.name}
                        </a>
                        <div className="text-xs text-gray-500">
                            ⭐ {repo.stargazers_count} • Updated {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}   