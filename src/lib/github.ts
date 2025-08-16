export async function getContributionData() {
    const query = `
        query {
            viewer {
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
    `

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 },
    })

    const data = await response.json();
    return data.data.viewer.contributionsCollection.contributionCalendar;
}