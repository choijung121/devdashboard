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
    const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial'); // Default to imperial units

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
    }, []);

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
        <div className="relative p-4 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold truncate pr-4">🌤️ Weather in {weather.name}</h2>
                
                {/* Toggle Switch */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                        type = "button"
                        onClick={(e) => {
                            e.preventDefault(); 
                            setUnit((prev) => (prev === 'imperial' ? 'metric' : 'imperial'))
                        }}
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                            unit === 'imperial' ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-400 hover:bg-blue-500'
                        }`}
                    >
                        <span className={`relative inline-flex h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm items-center justify-center ${
                                unit === 'imperial' ? 'translate-x-9' : 'translate-x-1'
                            }`}
                        >
                            <span className="text-xs font-medium text-gray-800">
                                {unit === 'imperial' ? '°F' : '°C'}
                            </span>
                        </span>
                    </button>
                </div>
            </div>
            
            {/* Weather Content */}
            <div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"> 
                    <div className="flex flex-col space-y-1 text-center sm:text-left">
                        <p className="font-semibold">{capitalize(weather.weather[0].description)}</p>
                        <p>🌡️ Temp: {Math.round(tempConvert(weather.main.temp, 'imperial', unit))}{unitSymbol}</p>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                    </div>
                    
                    {weather.weather && (
                        <div className="flex items-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="w-30 h-30"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};