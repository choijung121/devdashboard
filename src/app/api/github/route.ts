import { NextRequest, NextResponse } from "next/server";
import { getCongributionData } from "@/lib/github";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userName = searchParams.get("username") || "choijung121";

        console.log("Fetching GitHub contributions for user:", userName);

        const contributionData
    } catch (error) {

    }
}