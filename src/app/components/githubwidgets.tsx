"use client";

import RepoList from "./github/repository";
import GitHubCalendar from "./github/calendar";

export default function GitHubWidget() {
    return (
        <div className="relative p-3 max-w-md mx-auto">
            {/* Contribution Graph */}
            <GitHubCalendar />
            {/* <div>
                <a href={profile.html_url}>
                    <div className="flex items-center gap-4 mb-4 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-gray-50 cursor-pointer">
                        <img src={profile.avatar_url} alt={profile.name} className="w-16 h-16 rounded-full" />
                        <div>
                            <p className="text-lg font-bold">{profile.name}</p>
                            <p className="text-sm text-gray-600">{profile.bio}</p>
                        </div>
                    </div>
                </a>
            </div> */}
            
            {/* Repos List */}
            <RepoList />
        </div>
    );
}   