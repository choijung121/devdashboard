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

export default function AboutMe() {
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
            <h3 className="font-semibold mb-2 text-lg">📰 About Me</h3>
            <p className="space-y-0">Hi! I'm Jung, a passionate QA Engineer during the day, and tinkerer during the night. I loves building cool stuff and exploring new technologies.</p>
            <p className="space-y-0">I'm just having fun making this! Enjoy your day! 😊</p>
            <li>
                <a href="https://www.linkedin.com/in/jung-choi-4767a7172/">LinkedIn</a>
            </li>
        </div>
    );
}   