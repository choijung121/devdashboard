"use client";

import { useEffect, useState } from "react";

interface Repo {
    id: number; 
    name: string; 
    html_url: string; 
    description: string | null;
}

interface Profile {
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
}

export default function RepoList() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [profileRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/choijung121`),
                    fetch(`https://api.github.com/users/choijung121/repos?sort=updated&per_page=2`)
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
        <div className="relative p-3 max-w-md mx-auto"> 
            {/* Repos List */}
            <h3 className="font-semibold mb-2 text-lg">My Repositories</h3>
            <ul className="space-y-0">
                {repos.map(repo => (
                    <a href={repo.html_url} key={repo.id}>
                        <li className="pb-3 p-1 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-gray-50 cursor-pointer">
                            <p className="text-md font-bold">{repo.name}</p>
                            <p className="text-xs text-gray-600">{repo.description} </p>
                        </li>
                    </a>
                    
                ))}
            </ul>
        </div>
    );
}   