"use client";

import RepoList from "./github/repository";

export default function GitHubWidget() {
    return (
        <div className="relative p-3 max-w-md mx-auto">
            <RepoList />
        </div>
    );
}   