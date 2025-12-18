import { useState, useEffect, useCallback } from 'react';
import type { WeatherData, Location } from '../types/weather';
import { getWeatherData, searchLocations, getCurrentPosition, reverseGeocode } from '../services/weatherApi';

const STORAGE_KEY = 'meteoflow_location';
const DARK_MODE_KEY = 'meteoflow_dark_mode';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Default location (Madrid)
const DEFAULT_LOCATION: Location = {
  name: 'Madrid',
  region: 'Comunidad de Madrid',
  country: 'España',
  latitude: 40.4168,
  longitude: -3.7038,
  timezone: 'Europe/Madrid',
};

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocationState] = useState<Location>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
    } catch {
      return DEFAULT_LOCATION;
    }
  });
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [searching, setSearching] = useState(false);

  // Fetch weather data
  const fetchData = useCallback(async (loc: Location) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherData(loc);
      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Set location
  const setLocation = useCallback((loc: Location) => {
    setLocationState(loc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    setSearchResults([]);
    fetchData(loc);
  }, [fetchData]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchData(location);
  }, [fetchData, location]);

  // Search locations
  const search = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Use current location
  const useCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const loc = await reverseGeocode(latitude, longitude);
      setLocation(loc);
    } catch (err) {
      setError('No se pudo obtener tu ubicación. Por favor, permite el acceso o busca una ciudad.');
      setLoading(false);
    }
  }, [setLocation]);

  // Initial load
  useEffect(() => {
    fetchData(location);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto refresh
  useEffect(() => {
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return {
    data,
    loading,
    error,
    location,
    setLocation,
    refresh,
    searchResults,
    search,
    searching,
    useCurrentLocation,
  };
}

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const toggleDark = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem(DARK_MODE_KEY, String(newValue));
      return newValue;
    });
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      if (saved === null) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return [isDark, toggleDark];
}
