import type {
  WeatherData,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  AirQuality,
  MarineData,
  Location,
  OpenMeteoCurrentResponse,
  OpenMeteoAirQualityResponse,
  OpenMeteoMarineResponse,
} from '../types/weather';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1';
const AIR_QUALITY_BASE = 'https://air-quality-api.open-meteo.com/v1';
const MARINE_BASE = 'https://marine-api.open-meteo.com/v1';
const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1';

// Weather code to description mapping
export const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: 'Despejado', icon: 'sun' },
  1: { description: 'Mayormente despejado', icon: 'sun' },
  2: { description: 'Parcialmente nublado', icon: 'cloud-sun' },
  3: { description: 'Nublado', icon: 'cloud' },
  45: { description: 'Niebla', icon: 'fog' },
  48: { description: 'Niebla helada', icon: 'fog' },
  51: { description: 'Llovizna ligera', icon: 'cloud-drizzle' },
  53: { description: 'Llovizna moderada', icon: 'cloud-drizzle' },
  55: { description: 'Llovizna intensa', icon: 'cloud-drizzle' },
  56: { description: 'Llovizna helada ligera', icon: 'cloud-drizzle' },
  57: { description: 'Llovizna helada intensa', icon: 'cloud-drizzle' },
  61: { description: 'Lluvia ligera', icon: 'cloud-rain' },
  63: { description: 'Lluvia moderada', icon: 'cloud-rain' },
  65: { description: 'Lluvia intensa', icon: 'cloud-rain' },
  66: { description: 'Lluvia helada ligera', icon: 'cloud-rain' },
  67: { description: 'Lluvia helada intensa', icon: 'cloud-rain' },
  71: { description: 'Nevada ligera', icon: 'cloud-snow' },
  73: { description: 'Nevada moderada', icon: 'cloud-snow' },
  75: { description: 'Nevada intensa', icon: 'cloud-snow' },
  77: { description: 'Granizo', icon: 'cloud-snow' },
  80: { description: 'Chubascos ligeros', icon: 'cloud-rain' },
  81: { description: 'Chubascos moderados', icon: 'cloud-rain' },
  82: { description: 'Chubascos violentos', icon: 'cloud-rain' },
  85: { description: 'Nevadas ligeras', icon: 'cloud-snow' },
  86: { description: 'Nevadas intensas', icon: 'cloud-snow' },
  95: { description: 'Tormenta', icon: 'cloud-lightning' },
  96: { description: 'Tormenta con granizo ligero', icon: 'cloud-lightning' },
  99: { description: 'Tormenta con granizo intenso', icon: 'cloud-lightning' },
};

// AQI category mapping
function getAQICategory(aqi: number): AirQuality['category'] {
  if (aqi <= 20) return 'good';
  if (aqi <= 40) return 'moderate';
  if (aqi <= 60) return 'unhealthy-sensitive';
  if (aqi <= 80) return 'unhealthy';
  if (aqi <= 100) return 'very-unhealthy';
  return 'hazardous';
}

export const aqiCategoryLabels: Record<AirQuality['category'], { label: string; color: string }> = {
  'good': { label: 'Bueno', color: '#22c55e' },
  'moderate': { label: 'Moderado', color: '#eab308' },
  'unhealthy-sensitive': { label: 'Dañino para sensibles', color: '#f97316' },
  'unhealthy': { label: 'Dañino', color: '#ef4444' },
  'very-unhealthy': { label: 'Muy dañino', color: '#a855f7' },
  'hazardous': { label: 'Peligroso', color: '#7f1d1d' },
};

// Search locations
export async function searchLocations(query: string): Promise<Location[]> {
  const response = await fetch(
    `${GEOCODING_BASE}/search?name=${encodeURIComponent(query)}&count=10&language=es&format=json`
  );

  if (!response.ok) throw new Error('Error buscando ubicaciones');

  const data = await response.json();

  if (!data.results) return [];

  return data.results.map((result: { name: string; admin1?: string; country?: string; latitude: number; longitude: number; timezone?: string }) => ({
    name: result.name,
    region: result.admin1 || '',
    country: result.country || '',
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone || 'Europe/Madrid',
  }));
}

// Fetch weather data from Open-Meteo
async function fetchWeatherData(lat: number, lon: number, timezone: string): Promise<OpenMeteoCurrentResponse> {
  const currentParams = [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation',
    'rain',
    'weather_code',
    'pressure_msl',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
    'uv_index',
    'cloud_cover',
    'visibility',
    'dew_point_2m',
    'is_day',
  ].join(',');

  const hourlyParams = [
    'temperature_2m',
    'precipitation',
    'precipitation_probability',
    'weather_code',
    'wind_speed_10m',
    'relative_humidity_2m',
  ].join(',');

  const dailyParams = [
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_sum',
    'precipitation_probability_max',
    'weather_code',
    'wind_speed_10m_max',
    'sunrise',
    'sunset',
    'uv_index_max',
  ].join(',');

  const url = `${OPEN_METEO_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=${currentParams}&hourly=${hourlyParams}&daily=${dailyParams}&timezone=${timezone}&forecast_days=10`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Error obteniendo datos meteorológicos');
  return response.json();
}

// Fetch air quality data
async function fetchAirQuality(lat: number, lon: number, timezone: string): Promise<OpenMeteoAirQualityResponse> {
  const currentParams = [
    'european_aqi',
    'pm2_5',
    'pm10',
    'nitrogen_dioxide',
    'ozone',
    'sulphur_dioxide',
    'carbon_monoxide',
  ].join(',');

  const url = `${AIR_QUALITY_BASE}/air-quality?latitude=${lat}&longitude=${lon}&current=${currentParams}&timezone=${timezone}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Error obteniendo calidad del aire');
  return response.json();
}

// Fetch marine data (for coastal locations)
async function fetchMarineData(lat: number, lon: number, timezone: string): Promise<OpenMeteoMarineResponse | null> {
  try {
    const currentParams = [
      'wave_height',
      'wave_period',
      'wave_direction',
      'swell_wave_height',
      'swell_wave_direction',
    ].join(',');

    const url = `${MARINE_BASE}/marine?latitude=${lat}&longitude=${lon}&current=${currentParams}&timezone=${timezone}`;

    const response = await fetch(url);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

// Parse weather response to CurrentWeather
function parseCurrentWeather(data: OpenMeteoCurrentResponse['current']): CurrentWeather {
  return {
    temperature: data.temperature_2m,
    apparentTemperature: data.apparent_temperature,
    humidity: data.relative_humidity_2m,
    pressure: data.pressure_msl,
    windSpeed: data.wind_speed_10m,
    windDirection: data.wind_direction_10m,
    windGusts: data.wind_gusts_10m,
    precipitation: data.precipitation,
    rain: data.rain,
    weatherCode: data.weather_code,
    uvIndex: data.uv_index,
    cloudCover: data.cloud_cover,
    visibility: data.visibility,
    dewPoint: data.dew_point_2m,
    isDay: data.is_day === 1,
  };
}

// Parse hourly forecast
function parseHourlyForecast(data: OpenMeteoCurrentResponse['hourly']): HourlyForecast[] {
  return data.time.slice(0, 48).map((time, i) => ({
    time,
    temperature: data.temperature_2m[i],
    precipitation: data.precipitation[i],
    precipitationProbability: data.precipitation_probability[i],
    weatherCode: data.weather_code[i],
    windSpeed: data.wind_speed_10m[i],
    humidity: data.relative_humidity_2m[i],
  }));
}

// Parse daily forecast
function parseDailyForecast(data: OpenMeteoCurrentResponse['daily']): DailyForecast[] {
  return data.time.map((date, i) => ({
    date,
    temperatureMax: data.temperature_2m_max[i],
    temperatureMin: data.temperature_2m_min[i],
    precipitationSum: data.precipitation_sum[i],
    precipitationProbability: data.precipitation_probability_max[i],
    weatherCode: data.weather_code[i],
    windSpeedMax: data.wind_speed_10m_max[i],
    sunrise: data.sunrise[i],
    sunset: data.sunset[i],
    uvIndexMax: data.uv_index_max[i],
  }));
}

// Parse air quality
function parseAirQuality(data: OpenMeteoAirQualityResponse['current']): AirQuality {
  const aqi = data.european_aqi;
  return {
    aqi,
    pm25: data.pm2_5,
    pm10: data.pm10,
    no2: data.nitrogen_dioxide,
    o3: data.ozone,
    so2: data.sulphur_dioxide,
    co: data.carbon_monoxide,
    category: getAQICategory(aqi),
  };
}

// Parse marine data
function parseMarineData(data: OpenMeteoMarineResponse['current']): MarineData {
  return {
    waveHeight: data.wave_height,
    wavePeriod: data.wave_period,
    waveDirection: data.wave_direction,
    seaTemperature: data.sea_surface_temperature || 0,
    swellHeight: data.swell_wave_height,
    swellDirection: data.swell_wave_direction,
  };
}

// Main function to get all weather data
export async function getWeatherData(location: Location): Promise<WeatherData> {
  const { latitude, longitude, timezone } = location;

  const [weatherResponse, airQualityResponse, marineResponse] = await Promise.all([
    fetchWeatherData(latitude, longitude, timezone),
    fetchAirQuality(latitude, longitude, timezone),
    fetchMarineData(latitude, longitude, timezone),
  ]);

  return {
    location,
    current: parseCurrentWeather(weatherResponse.current),
    hourly: parseHourlyForecast(weatherResponse.hourly),
    daily: parseDailyForecast(weatherResponse.daily),
    airQuality: parseAirQuality(airQualityResponse.current),
    marine: marineResponse ? parseMarineData(marineResponse.current) : undefined,
    lastUpdated: new Date().toISOString(),
  };
}

// Get current location
export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}

// Reverse geocoding
export async function reverseGeocode(lat: number, lon: number): Promise<Location> {
  // Open-Meteo doesn't support reverse geocoding directly
  // We'll use a simple approach with the coordinates
  return {
    name: 'Mi ubicación',
    region: '',
    country: '',
    latitude: lat,
    longitude: lon,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

// Wind direction to cardinal
export function windDirectionToCardinal(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// Format date
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(dateStr).toLocaleDateString('es-ES', options);
}

// Format time
export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
