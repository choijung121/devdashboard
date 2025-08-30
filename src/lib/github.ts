export async function getContributionData(username: string) {
    if (!process.env.GITHUB_TOKEN2) {
        throw new Error("❌ Missing GITHUB_TOKEN2 in environment variables");
    }

    try {
        const response = await fetch ("https://api.github.com/graphql", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN2}`, 
                "User-Agent": "devdashboard/1.0",
            },
            body: JSON.stringify({
                query: 
                `
                    query($username: String!) {
                        user(login: $username) {
                            contributionsCollection {
                                contributionCalendar {
                                    weeks {
                                        contributionDays {
                                            color
                                            contributionCount
                                            date
                                        }
                                    }
                                }
                            }
                        }
                    }
                `, 
                variables: {
                    username: username
                },
            }),
        })

        if (!response.ok) {
            const errorText = await response.text();
            console.error("GitHub API Error:", errorText);
            
            if (response.status === 401) {
                throw new Error("❌ Invalid GitHub token - check your GITHUB_TOKEN2");
            }
            if (response.status === 403) {
                throw new Error("❌ Rate limit exceeded or insufficient permissions");
            }
            
            throw new Error(`Failed to fetch contributions: ${response.status}`);
        }
    
        const data = await response.json();
        if (data.errors) {
            console.error("GraphQL Errors:", data.errors);
            throw new Error(`GraphQL Error: ${data.errors[0].message}`);
        }
        return data.data.user.contributionsCollection.contributionCalendar;
    } catch (error) {
        console.error("Error fetching contribution data:", error);
        throw error;
    }
}