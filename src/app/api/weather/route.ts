import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get('lat');
    const lon = request.nextUrl.searchParams.get('lon');
    const city = request.nextUrl.searchParams.get('city') || 'Los Angeles'; // Default city
    const apiKey = process.env.OPENWEATHER_API_KEY; 
    const units = request.nextUrl.searchParams.get('units') || 'imperial';

    const url = lat && lon 
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache', // Disable caching for fresh data
        }
    });
}