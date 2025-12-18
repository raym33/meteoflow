// ============================================================================
// DISASTER ALERTS API SERVICE
// Uses free public APIs: USGS (earthquakes), NWS (weather alerts), GDACS (global)
// ============================================================================

export interface Alert {
  id: string;
  type: AlertType;
  severity: 'info' | 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
  location: string;
  coordinates?: { lat: number; lon: number };
  startTime?: string;
  endTime?: string;
  source: string;
  url?: string;
  magnitude?: number;
  distance?: number; // km from user location
}

export type AlertType =
  | 'earthquake'
  | 'tsunami'
  | 'hurricane'
  | 'typhoon'
  | 'tornado'
  | 'flood'
  | 'storm'
  | 'wildfire'
  | 'volcano'
  | 'extreme_heat'
  | 'extreme_cold'
  | 'wind'
  | 'snow'
  | 'rain'
  | 'other';

// ============================================================================
// USGS EARTHQUAKE API (Free, unlimited)
// https://earthquake.usgs.gov/fdsnws/event/1/
// ============================================================================

interface USGSEarthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    url: string;
    detail: string;
    status: string;
    tsunami: number;
    sig: number;
    alert: string | null;
    title: string;
    type: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number, number]; // [lon, lat, depth]
  };
}

interface USGSResponse {
  type: string;
  metadata: {
    generated: number;
    url: string;
    title: string;
    count: number;
  };
  features: USGSEarthquake[];
}

export const fetchEarthquakes = async (
  lat: number,
  lon: number,
  radiusKm: number = 500,
  minMagnitude: number = 4.0,
  days: number = 7
): Promise<Alert[]> => {
  try {
    const endTime = new Date().toISOString();
    const startTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const params = new URLSearchParams({
      format: 'geojson',
      starttime: startTime,
      endtime: endTime,
      latitude: lat.toString(),
      longitude: lon.toString(),
      maxradiuskm: radiusKm.toString(),
      minmagnitude: minMagnitude.toString(),
      orderby: 'magnitude',
      limit: '20',
    });

    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?${params}`
    );

    if (!response.ok) throw new Error('USGS API error');

    const data: USGSResponse = await response.json();

    return data.features.map((eq): Alert => {
      const [eqLon, eqLat] = eq.geometry.coordinates;
      const distance = calculateDistance(lat, lon, eqLat, eqLon);

      let severity: Alert['severity'] = 'info';
      if (eq.properties.mag >= 7) severity = 'extreme';
      else if (eq.properties.mag >= 6) severity = 'severe';
      else if (eq.properties.mag >= 5) severity = 'moderate';
      else if (eq.properties.mag >= 4) severity = 'minor';

      return {
        id: `eq_${eq.id}`,
        type: eq.properties.tsunami ? 'tsunami' : 'earthquake',
        severity,
        title: `Terremoto M${eq.properties.mag.toFixed(1)}`,
        description: eq.properties.place,
        location: eq.properties.place,
        coordinates: { lat: eqLat, lon: eqLon },
        startTime: new Date(eq.properties.time).toISOString(),
        source: 'USGS',
        url: eq.properties.url,
        magnitude: eq.properties.mag,
        distance: Math.round(distance),
      };
    });
  } catch (error) {
    console.error('Error fetching earthquakes:', error);
    return [];
  }
};

// ============================================================================
// NWS WEATHER ALERTS API (Free, unlimited for US)
// https://api.weather.gov/alerts
// ============================================================================

interface NWSAlert {
  id: string;
  properties: {
    id: string;
    areaDesc: string;
    geocode: {
      SAME: string[];
      UGC: string[];
    };
    sent: string;
    effective: string;
    onset: string;
    expires: string;
    ends: string;
    status: string;
    messageType: string;
    category: string;
    severity: string;
    certainty: string;
    urgency: string;
    event: string;
    sender: string;
    senderName: string;
    headline: string;
    description: string;
    instruction: string;
    response: string;
  };
}

interface NWSResponse {
  type: string;
  features: NWSAlert[];
}

const mapNWSSeverity = (severity: string): Alert['severity'] => {
  switch (severity.toLowerCase()) {
    case 'extreme': return 'extreme';
    case 'severe': return 'severe';
    case 'moderate': return 'moderate';
    case 'minor': return 'minor';
    default: return 'info';
  }
};

const mapNWSEventType = (event: string): AlertType => {
  const e = event.toLowerCase();
  if (e.includes('tornado')) return 'tornado';
  if (e.includes('hurricane') || e.includes('tropical')) return 'hurricane';
  if (e.includes('typhoon')) return 'typhoon';
  if (e.includes('tsunami')) return 'tsunami';
  if (e.includes('flood')) return 'flood';
  if (e.includes('storm') || e.includes('thunder')) return 'storm';
  if (e.includes('fire') || e.includes('wildfire')) return 'wildfire';
  if (e.includes('volcano')) return 'volcano';
  if (e.includes('heat')) return 'extreme_heat';
  if (e.includes('cold') || e.includes('freeze') || e.includes('frost')) return 'extreme_cold';
  if (e.includes('wind')) return 'wind';
  if (e.includes('snow') || e.includes('blizzard') || e.includes('ice')) return 'snow';
  if (e.includes('rain')) return 'rain';
  return 'other';
};

export const fetchNWSAlerts = async (lat: number, lon: number): Promise<Alert[]> => {
  try {
    // Get the point info first
    const pointResponse = await fetch(
      `https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`,
      { headers: { 'User-Agent': 'MeteoFlow Weather App' } }
    );

    if (!pointResponse.ok) {
      // NWS only works for US locations
      return [];
    }

    const pointData = await pointResponse.json();
    const zone = pointData.properties?.forecastZone?.split('/').pop();

    if (!zone) return [];

    // Fetch alerts for the zone
    const alertsResponse = await fetch(
      `https://api.weather.gov/alerts/active?zone=${zone}`,
      { headers: { 'User-Agent': 'MeteoFlow Weather App' } }
    );

    if (!alertsResponse.ok) return [];

    const data: NWSResponse = await alertsResponse.json();

    return data.features.map((alert): Alert => ({
      id: `nws_${alert.properties.id}`,
      type: mapNWSEventType(alert.properties.event),
      severity: mapNWSSeverity(alert.properties.severity),
      title: alert.properties.event,
      description: alert.properties.headline || alert.properties.description,
      location: alert.properties.areaDesc,
      startTime: alert.properties.onset || alert.properties.effective,
      endTime: alert.properties.ends || alert.properties.expires,
      source: 'NWS',
    }));
  } catch (error) {
    console.error('Error fetching NWS alerts:', error);
    return [];
  }
};

// ============================================================================
// OPEN-METEO WEATHER ALERTS (via weather codes)
// ============================================================================

export const getWeatherAlerts = (
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  _precipitation: number
): Alert[] => {
  const alerts: Alert[] = [];

  // Extreme weather codes
  if (weatherCode >= 95 && weatherCode <= 99) {
    alerts.push({
      id: `wx_${Date.now()}_storm`,
      type: 'storm',
      severity: weatherCode === 99 ? 'extreme' : 'severe',
      title: 'Tormenta Eléctrica Severa',
      description: weatherCode >= 96 ? 'Tormenta con granizo' : 'Tormenta eléctrica intensa',
      location: 'Ubicación actual',
      source: 'Open-Meteo',
    });
  }

  // Heavy precipitation
  if (weatherCode >= 65 && weatherCode <= 67) {
    alerts.push({
      id: `wx_${Date.now()}_rain`,
      type: 'rain',
      severity: 'moderate',
      title: 'Lluvia Intensa',
      description: 'Precipitaciones fuertes previstas. Riesgo de inundaciones locales.',
      location: 'Ubicación actual',
      source: 'Open-Meteo',
    });
  }

  // Heavy snow
  if (weatherCode >= 75 && weatherCode <= 77) {
    alerts.push({
      id: `wx_${Date.now()}_snow`,
      type: 'snow',
      severity: 'moderate',
      title: 'Nevada Intensa',
      description: 'Nevadas fuertes previstas. Precaución en carreteras.',
      location: 'Ubicación actual',
      source: 'Open-Meteo',
    });
  }

  // Extreme temperatures
  if (temperature >= 40) {
    alerts.push({
      id: `wx_${Date.now()}_heat`,
      type: 'extreme_heat',
      severity: temperature >= 45 ? 'extreme' : 'severe',
      title: 'Calor Extremo',
      description: `Temperatura de ${Math.round(temperature)}°C. Evite exposición prolongada.`,
      location: 'Ubicación actual',
      source: 'Open-Meteo',
    });
  } else if (temperature <= -20) {
    alerts.push({
      id: `wx_${Date.now()}_cold`,
      type: 'extreme_cold',
      severity: temperature <= -30 ? 'extreme' : 'severe',
      title: 'Frío Extremo',
      description: `Temperatura de ${Math.round(temperature)}°C. Riesgo de congelación.`,
      location: 'Ubicación actual',
      source: 'Open-Meteo',
    });
  }

  // High winds
  if (windSpeed >= 80) {
    alerts.push({
      id: `wx_${Date.now()}_wind`,
      type: 'wind',
      severity: windSpeed >= 120 ? 'extreme' : windSpeed >= 100 ? 'severe' : 'moderate',
      title: 'Vientos Fuertes',
      description: `Vientos de ${Math.round(windSpeed)} km/h. Asegure objetos sueltos.`,
      location: 'Ubicación actual',
      source: 'Open-Meteo',
    });
  }

  return alerts;
};

// ============================================================================
// GDACS - Global Disaster Alerts (RSS Feed)
// https://www.gdacs.org/
// ============================================================================

export const fetchGDACSAlerts = async (lat: number, lon: number): Promise<Alert[]> => {
  try {
    // GDACS provides RSS feeds - we'll use a CORS proxy for client-side fetching
    // In production, this should be done server-side
    const response = await fetch(
      'https://www.gdacs.org/xml/rss_7d.xml',
      { mode: 'cors' }
    );

    if (!response.ok) {
      // Fallback: return empty if GDACS is not accessible (CORS issues)
      console.warn('GDACS not accessible from client');
      return [];
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/xml');
    const items = doc.querySelectorAll('item');

    const alerts: Alert[] = [];

    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';

      // Parse GDACS geo coordinates if available
      const geoLat = item.querySelector('geo\\:lat, lat')?.textContent;
      const geoLon = item.querySelector('geo\\:long, long')?.textContent;

      let alertLat: number | undefined;
      let alertLon: number | undefined;
      let distance: number | undefined;

      if (geoLat && geoLon) {
        alertLat = parseFloat(geoLat);
        alertLon = parseFloat(geoLon);
        distance = calculateDistance(lat, lon, alertLat, alertLon);
      }

      // Only include alerts within reasonable distance (2000km)
      if (distance !== undefined && distance > 2000) return;

      // Determine alert type from title
      let type: AlertType = 'other';
      let severity: Alert['severity'] = 'info';

      const titleLower = title.toLowerCase();
      if (titleLower.includes('earthquake')) {
        type = 'earthquake';
        if (titleLower.includes('orange') || titleLower.includes('red')) severity = 'severe';
        else if (titleLower.includes('green')) severity = 'moderate';
      } else if (titleLower.includes('tsunami')) {
        type = 'tsunami';
        severity = 'extreme';
      } else if (titleLower.includes('cyclone') || titleLower.includes('hurricane') || titleLower.includes('typhoon')) {
        type = titleLower.includes('typhoon') ? 'typhoon' : 'hurricane';
        if (titleLower.includes('cat 4') || titleLower.includes('cat 5') || titleLower.includes('red')) {
          severity = 'extreme';
        } else if (titleLower.includes('cat 3') || titleLower.includes('orange')) {
          severity = 'severe';
        } else {
          severity = 'moderate';
        }
      } else if (titleLower.includes('flood')) {
        type = 'flood';
        severity = 'moderate';
      } else if (titleLower.includes('volcano')) {
        type = 'volcano';
        severity = 'severe';
      }

      alerts.push({
        id: `gdacs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        severity,
        title: title.replace(/\[.*?\]/g, '').trim(),
        description: description.replace(/<[^>]*>/g, '').trim(),
        location: title,
        coordinates: alertLat && alertLon ? { lat: alertLat, lon: alertLon } : undefined,
        startTime: new Date(pubDate).toISOString(),
        source: 'GDACS',
        url: link,
        distance,
      });
    });

    return alerts.sort((a, b) => {
      // Sort by distance first, then severity
      if (a.distance && b.distance) return a.distance - b.distance;
      return getSeverityWeight(b.severity) - getSeverityWeight(a.severity);
    });
  } catch (error) {
    console.error('Error fetching GDACS alerts:', error);
    return [];
  }
};

// ============================================================================
// COMBINED ALERTS FETCHER
// ============================================================================

export const fetchAllAlerts = async (
  lat: number,
  lon: number,
  weatherCode: number,
  temperature: number,
  windSpeed: number,
  _precipitation: number
): Promise<Alert[]> => {
  const [earthquakes, nwsAlerts, weatherAlerts] = await Promise.all([
    fetchEarthquakes(lat, lon, 500, 4.0, 7),
    fetchNWSAlerts(lat, lon),
    Promise.resolve(getWeatherAlerts(weatherCode, temperature, windSpeed, _precipitation)),
  ]);

  // Combine and sort by severity
  const allAlerts = [...earthquakes, ...nwsAlerts, ...weatherAlerts];

  return allAlerts.sort((a, b) => {
    return getSeverityWeight(b.severity) - getSeverityWeight(a.severity);
  });
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getSeverityWeight = (severity: Alert['severity']): number => {
  switch (severity) {
    case 'extreme': return 5;
    case 'severe': return 4;
    case 'moderate': return 3;
    case 'minor': return 2;
    case 'info': return 1;
    default: return 0;
  }
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

// ============================================================================
// ALERT ICONS AND COLORS
// ============================================================================

export const getAlertIcon = (type: AlertType): string => {
  switch (type) {
    case 'earthquake': return '🌍';
    case 'tsunami': return '🌊';
    case 'hurricane': return '🌀';
    case 'typhoon': return '🌀';
    case 'tornado': return '🌪️';
    case 'flood': return '🌊';
    case 'storm': return '⛈️';
    case 'wildfire': return '🔥';
    case 'volcano': return '🌋';
    case 'extreme_heat': return '🌡️';
    case 'extreme_cold': return '❄️';
    case 'wind': return '💨';
    case 'snow': return '🌨️';
    case 'rain': return '🌧️';
    default: return '⚠️';
  }
};

export const getAlertColor = (severity: Alert['severity']): string => {
  switch (severity) {
    case 'extreme': return '#dc2626';
    case 'severe': return '#ea580c';
    case 'moderate': return '#f59e0b';
    case 'minor': return '#84cc16';
    case 'info': return '#3b82f6';
    default: return '#6b7280';
  }
};

export const getSeverityLabel = (severity: Alert['severity']): string => {
  switch (severity) {
    case 'extreme': return 'Extremo';
    case 'severe': return 'Severo';
    case 'moderate': return 'Moderado';
    case 'minor': return 'Menor';
    case 'info': return 'Informativo';
    default: return 'Desconocido';
  }
};
