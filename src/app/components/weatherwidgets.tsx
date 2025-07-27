'use client'; 

import { useState, useEffect } from 'react';

type WeatherData = {
    name: string; 
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    const city = 'Los Angeles'; 

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch (`/api/weather?city=${city}`);
                const data = await response.json();
                setWeather(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        }

        fetchWeather();
    }, [city]);

    if (loading) return <div>Loading weather data...</div>;
    if(!weather) return <div>Weather data not available.</div>;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">🌤️ Weather in {weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>🌡️ Temp: {Math.round(weather.main.temp)}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
    )
};