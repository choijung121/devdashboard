import { useEffect, useState } from "react";
import { getContributionData } from "@/lib/github";

export default async function GitHubCalendar() {
    const calendar = await getContributionData('choijung121');

    if (!calendar) return <div className="bg-white p-4 rounded-xl shadow-md">Loading...</div>;

    return (
        <div className="relative p-3 max-w-md mx-auto">
            {/* Contribution Graph */}
            <div>
                <div className="grid grid-cols-53 gap-1 overflow-x-auto">
                    {calendar.weeks.map((week: any, wi: number) => (
                    <div key={wi} className="flex flex-col gap-1">
                        {week.contributionDays.map((day: any, di: number) => (
                            <div
                            key={di}
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: day.color }}
                            title={`${day.date}: ${day.contributionCount} contributions`}
                            />
                        ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}   