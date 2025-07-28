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
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial'); // Default to metric units

    const unitSymbol = unit === 'imperial' ? '°F' : '°C'; // Celsius for metric, Fahrenheit for imperial

    useEffect(() => {
        if(!navigator.geolocation) {
            setError('Geolocation is not supported');
            setLoading(false);
            return; 
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch (`/api/weather?lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    setWeather(data);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                } finally {
                    setLoading(false);
                }
            }, 
            () => {
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        )
    }, [unit]);

    if (loading) return <div>Loading weather data...</div>;
    if(!weather) return <div>Weather data not available.</div>;

    function capitalize(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function tempConvert(temp: number, fromUnit: 'imperial' | 'metric', toUnit: 'metric' | 'imperial') {
        if (fromUnit === toUnit) return temp;
        if (fromUnit === 'metric' && toUnit === 'imperial') {
            // Celsius to Fahrenheit
            return (temp * 9/5) + 32;
        } else {
            // Fahrenheit to Celsius  
            return (temp - 32) * 5/9;
        }
    }

    return (
        <div className="relative">
            <h2 className="text-lg font-semibold mb-2">🌤️ Weather in {weather.name}</h2>
            <button
                onClick={() => 
                    setUnit((prev) => (prev === 'imperial' ? 'metric' : 'imperial'))
                } 
                className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
                °{unit === 'metric' ? 'F' : 'C'}
            </button>
            <p>{capitalize(weather.weather[0].description)}</p>
            <p>🌡️ Temp: {Math.round(tempConvert(weather.main.temp, 'imperial', unit))}{unitSymbol}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
    )
};