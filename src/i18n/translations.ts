// ============================================================================
// INTERNATIONALIZATION - 5 Languages
// ============================================================================

export type Language = 'es' | 'en' | 'fr' | 'de' | 'pt';

export const languageNames: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
};

export const languageFlags: Record<Language, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇧🇷',
};

export interface Translations {
  // App
  appName: string;
  loading: string;
  error: string;
  retry: string;

  // Search
  searchPlaceholder: string;
  searchButton: string;
  noResults: string;

  // Current Weather
  currentWeather: string;
  feelsLike: string;
  dewPoint: string;
  humidity: string;
  visibility: string;
  pressure: string;
  uvIndex: string;
  airQuality: string;
  wind: string;

  // UV Levels
  uvLow: string;
  uvModerate: string;
  uvHigh: string;
  uvVeryHigh: string;
  uvExtreme: string;

  // AQI
  aqiGood: string;
  aqiFair: string;
  aqiModerate: string;
  aqiPoor: string;
  aqiVeryPoor: string;

  // Forecast
  hourlyForecast: string;
  dailyForecast: string;
  next24Hours: string;
  next10Days: string;
  today: string;
  tomorrow: string;
  now: string;
  atTime: string;
  max: string;
  min: string;

  // Weather conditions
  condition: string;
  precipitation: string;
  maxWind: string;

  // Sun/Moon
  sunrise: string;
  sunset: string;
  dayLength: string;

  // Wind
  windSpeed: string;
  gusts: string;
  windDirection: string;

  // Cardinal directions
  north: string;
  south: string;
  east: string;
  west: string;
  northeast: string;
  northwest: string;
  southeast: string;
  southwest: string;

  // Alerts
  alerts: string;
  noAlerts: string;

  // Historical
  historicalData: string;
  last7Days: string;
  average: string;

  // Settings
  settings: string;
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;

  // Marine
  marine: string;
  marineConditions: string;
  waveHeight: string;
  swellDirection: string;
  seaTemperature: string;

  // Radar
  radar: string;
  rainRadar: string;
  past: string;
  forecast: string;

  // UI Elements
  large: string;
  small: string;
  customizeDashboard: string;
  dragToReorder: string;
  resetLayout: string;
  landscapes3D: string;
  realTimeAlerts: string;
  noMarineData: string;
  useCurrentLocation: string;

  // Weather descriptions
  clearSky: string;
  mainlyClear: string;
  partlyCloudy: string;
  overcast: string;
  fog: string;
  drizzle: string;
  rain: string;
  heavyRain: string;
  snow: string;
  heavySnow: string;
  thunderstorm: string;
  unknown: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // App
    appName: 'MeteoFlow',
    loading: 'Cargando...',
    error: 'Error al cargar datos',
    retry: 'Reintentar',

    // Search
    searchPlaceholder: 'Buscar ciudad...',
    searchButton: 'Buscar',
    noResults: 'No se encontraron resultados',

    // Current Weather
    currentWeather: 'Tiempo Actual',
    feelsLike: 'Sensación',
    dewPoint: 'Pto. Rocío',
    humidity: 'Humedad',
    visibility: 'Visibilidad',
    pressure: 'Presión',
    uvIndex: 'Índice UV',
    airQuality: 'Calidad Aire',
    wind: 'Viento',

    // UV Levels
    uvLow: 'Bajo',
    uvModerate: 'Moderado',
    uvHigh: 'Alto',
    uvVeryHigh: 'Muy Alto',
    uvExtreme: 'Extremo',

    // AQI
    aqiGood: 'Buena',
    aqiFair: 'Aceptable',
    aqiModerate: 'Moderada',
    aqiPoor: 'Mala',
    aqiVeryPoor: 'Muy Mala',

    // Forecast
    hourlyForecast: 'Pronóstico por Hora',
    dailyForecast: 'Pronóstico Diario',
    next24Hours: 'Próximas 24 horas',
    next10Days: 'Pronóstico 10 días',
    today: 'Hoy',
    tomorrow: 'Mañana',
    now: 'Ahora',
    atTime: 'a las',
    max: 'Max',
    min: 'Min',

    // Weather conditions
    condition: 'Condición',
    precipitation: 'Precipitación',
    maxWind: 'Viento máx.',

    // Sun/Moon
    sunrise: 'Amanecer',
    sunset: 'Atardecer',
    dayLength: 'Duración del día',

    // Wind
    windSpeed: 'Velocidad del Viento',
    gusts: 'Ráfagas',
    windDirection: 'Dirección',

    // Cardinal directions
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'O',
    northeast: 'NE',
    northwest: 'NO',
    southeast: 'SE',
    southwest: 'SO',

    // Alerts
    alerts: 'Alertas',
    noAlerts: 'Sin alertas activas',

    // Historical
    historicalData: 'Datos Históricos',
    last7Days: 'Últimos 7 días',
    average: 'Promedio',

    // Settings
    settings: 'Configuración',
    language: 'Idioma',
    theme: 'Tema',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',

    // Marine
    marine: 'Marino',
    marineConditions: 'Condiciones Marinas',
    waveHeight: 'Altura de ola',
    swellDirection: 'Dirección del oleaje',
    seaTemperature: 'Temp. del mar',

    // Radar
    radar: 'Radar',
    rainRadar: 'Radar de Lluvia',
    past: 'Pasado',
    forecast: 'Pronóstico',

    // UI Elements
    large: 'Grande',
    small: 'Pequeño',
    customizeDashboard: 'Personalizar Dashboard',
    dragToReorder: 'Arrastra las tarjetas para reordenarlas',
    resetLayout: 'Restablecer Layout',
    landscapes3D: 'Paisajes 3D',
    realTimeAlerts: 'Alertas en Tiempo Real',
    noMarineData: 'Datos marinos no disponibles',
    useCurrentLocation: 'Usar ubicación actual',

    // Weather descriptions
    clearSky: 'Despejado',
    mainlyClear: 'Mayormente despejado',
    partlyCloudy: 'Parcialmente nublado',
    overcast: 'Nublado',
    fog: 'Niebla',
    drizzle: 'Llovizna',
    rain: 'Lluvia',
    heavyRain: 'Lluvia intensa',
    snow: 'Nieve',
    heavySnow: 'Nevada intensa',
    thunderstorm: 'Tormenta',
    unknown: 'Desconocido',
  },

  en: {
    // App
    appName: 'MeteoFlow',
    loading: 'Loading...',
    error: 'Error loading data',
    retry: 'Retry',

    // Search
    searchPlaceholder: 'Search city...',
    searchButton: 'Search',
    noResults: 'No results found',

    // Current Weather
    currentWeather: 'Current Weather',
    feelsLike: 'Feels Like',
    dewPoint: 'Dew Point',
    humidity: 'Humidity',
    visibility: 'Visibility',
    pressure: 'Pressure',
    uvIndex: 'UV Index',
    airQuality: 'Air Quality',
    wind: 'Wind',

    // UV Levels
    uvLow: 'Low',
    uvModerate: 'Moderate',
    uvHigh: 'High',
    uvVeryHigh: 'Very High',
    uvExtreme: 'Extreme',

    // AQI
    aqiGood: 'Good',
    aqiFair: 'Fair',
    aqiModerate: 'Moderate',
    aqiPoor: 'Poor',
    aqiVeryPoor: 'Very Poor',

    // Forecast
    hourlyForecast: 'Hourly Forecast',
    dailyForecast: 'Daily Forecast',
    next24Hours: 'Next 24 hours',
    next10Days: '10-day forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    now: 'Now',
    atTime: 'at',
    max: 'Max',
    min: 'Min',

    // Weather conditions
    condition: 'Condition',
    precipitation: 'Precipitation',
    maxWind: 'Max wind',

    // Sun/Moon
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    dayLength: 'Day length',

    // Wind
    windSpeed: 'Wind Speed',
    gusts: 'Gusts',
    windDirection: 'Direction',

    // Cardinal directions
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'W',
    northeast: 'NE',
    northwest: 'NW',
    southeast: 'SE',
    southwest: 'SW',

    // Alerts
    alerts: 'Alerts',
    noAlerts: 'No active alerts',

    // Historical
    historicalData: 'Historical Data',
    last7Days: 'Last 7 days',
    average: 'Average',

    // Settings
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',

    // Marine
    marine: 'Marine',
    marineConditions: 'Marine Conditions',
    waveHeight: 'Wave height',
    swellDirection: 'Swell direction',
    seaTemperature: 'Sea temperature',

    // Radar
    radar: 'Radar',
    rainRadar: 'Rain Radar',
    past: 'Past',
    forecast: 'Forecast',

    // UI Elements
    large: 'Large',
    small: 'Small',
    customizeDashboard: 'Customize Dashboard',
    dragToReorder: 'Drag cards to reorder them',
    resetLayout: 'Reset Layout',
    landscapes3D: '3D Landscapes',
    realTimeAlerts: 'Real-Time Alerts',
    noMarineData: 'Marine data not available',
    useCurrentLocation: 'Use current location',

    // Weather descriptions
    clearSky: 'Clear sky',
    mainlyClear: 'Mainly clear',
    partlyCloudy: 'Partly cloudy',
    overcast: 'Overcast',
    fog: 'Fog',
    drizzle: 'Drizzle',
    rain: 'Rain',
    heavyRain: 'Heavy rain',
    snow: 'Snow',
    heavySnow: 'Heavy snow',
    thunderstorm: 'Thunderstorm',
    unknown: 'Unknown',
  },

  fr: {
    // App
    appName: 'MeteoFlow',
    loading: 'Chargement...',
    error: 'Erreur de chargement',
    retry: 'Réessayer',

    // Search
    searchPlaceholder: 'Rechercher une ville...',
    searchButton: 'Rechercher',
    noResults: 'Aucun résultat',

    // Current Weather
    currentWeather: 'Météo Actuelle',
    feelsLike: 'Ressenti',
    dewPoint: 'Point de rosée',
    humidity: 'Humidité',
    visibility: 'Visibilité',
    pressure: 'Pression',
    uvIndex: 'Indice UV',
    airQuality: 'Qualité air',
    wind: 'Vent',

    // UV Levels
    uvLow: 'Faible',
    uvModerate: 'Modéré',
    uvHigh: 'Élevé',
    uvVeryHigh: 'Très élevé',
    uvExtreme: 'Extrême',

    // AQI
    aqiGood: 'Bonne',
    aqiFair: 'Acceptable',
    aqiModerate: 'Modérée',
    aqiPoor: 'Mauvaise',
    aqiVeryPoor: 'Très mauvaise',

    // Forecast
    hourlyForecast: 'Prévisions Horaires',
    dailyForecast: 'Prévisions Quotidiennes',
    next24Hours: 'Prochaines 24 heures',
    next10Days: 'Prévisions 10 jours',
    today: "Aujourd'hui",
    tomorrow: 'Demain',
    now: 'Maintenant',
    atTime: 'à',
    max: 'Max',
    min: 'Min',

    // Weather conditions
    condition: 'Condition',
    precipitation: 'Précipitation',
    maxWind: 'Vent max.',

    // Sun/Moon
    sunrise: 'Lever du soleil',
    sunset: 'Coucher du soleil',
    dayLength: 'Durée du jour',

    // Wind
    windSpeed: 'Vitesse du Vent',
    gusts: 'Rafales',
    windDirection: 'Direction',

    // Cardinal directions
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'O',
    northeast: 'NE',
    northwest: 'NO',
    southeast: 'SE',
    southwest: 'SO',

    // Alerts
    alerts: 'Alertes',
    noAlerts: 'Aucune alerte active',

    // Historical
    historicalData: 'Données Historiques',
    last7Days: '7 derniers jours',
    average: 'Moyenne',

    // Settings
    settings: 'Paramètres',
    language: 'Langue',
    theme: 'Thème',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',

    // Marine
    marine: 'Marin',
    marineConditions: 'Conditions Marines',
    waveHeight: 'Hauteur des vagues',
    swellDirection: 'Direction de la houle',
    seaTemperature: 'Temp. de la mer',

    // Radar
    radar: 'Radar',
    rainRadar: 'Radar de Pluie',
    past: 'Passé',
    forecast: 'Prévision',

    // UI Elements
    large: 'Grand',
    small: 'Petit',
    customizeDashboard: 'Personnaliser le tableau de bord',
    dragToReorder: 'Faites glisser les cartes pour les réorganiser',
    resetLayout: 'Réinitialiser la mise en page',
    landscapes3D: 'Paysages 3D',
    realTimeAlerts: 'Alertes en temps réel',
    noMarineData: 'Données marines non disponibles',
    useCurrentLocation: 'Utiliser la position actuelle',

    // Weather descriptions
    clearSky: 'Ciel dégagé',
    mainlyClear: 'Généralement dégagé',
    partlyCloudy: 'Partiellement nuageux',
    overcast: 'Couvert',
    fog: 'Brouillard',
    drizzle: 'Bruine',
    rain: 'Pluie',
    heavyRain: 'Forte pluie',
    snow: 'Neige',
    heavySnow: 'Forte neige',
    thunderstorm: 'Orage',
    unknown: 'Inconnu',
  },

  de: {
    // App
    appName: 'MeteoFlow',
    loading: 'Laden...',
    error: 'Fehler beim Laden',
    retry: 'Wiederholen',

    // Search
    searchPlaceholder: 'Stadt suchen...',
    searchButton: 'Suchen',
    noResults: 'Keine Ergebnisse',

    // Current Weather
    currentWeather: 'Aktuelles Wetter',
    feelsLike: 'Gefühlt',
    dewPoint: 'Taupunkt',
    humidity: 'Feuchtigkeit',
    visibility: 'Sicht',
    pressure: 'Druck',
    uvIndex: 'UV-Index',
    airQuality: 'Luftqualität',
    wind: 'Wind',

    // UV Levels
    uvLow: 'Niedrig',
    uvModerate: 'Mäßig',
    uvHigh: 'Hoch',
    uvVeryHigh: 'Sehr hoch',
    uvExtreme: 'Extrem',

    // AQI
    aqiGood: 'Gut',
    aqiFair: 'Akzeptabel',
    aqiModerate: 'Mäßig',
    aqiPoor: 'Schlecht',
    aqiVeryPoor: 'Sehr schlecht',

    // Forecast
    hourlyForecast: 'Stündliche Vorhersage',
    dailyForecast: 'Tägliche Vorhersage',
    next24Hours: 'Nächste 24 Stunden',
    next10Days: '10-Tage-Vorhersage',
    today: 'Heute',
    tomorrow: 'Morgen',
    now: 'Jetzt',
    atTime: 'um',
    max: 'Max',
    min: 'Min',

    // Weather conditions
    condition: 'Zustand',
    precipitation: 'Niederschlag',
    maxWind: 'Max. Wind',

    // Sun/Moon
    sunrise: 'Sonnenaufgang',
    sunset: 'Sonnenuntergang',
    dayLength: 'Tageslänge',

    // Wind
    windSpeed: 'Windgeschwindigkeit',
    gusts: 'Böen',
    windDirection: 'Richtung',

    // Cardinal directions
    north: 'N',
    south: 'S',
    east: 'O',
    west: 'W',
    northeast: 'NO',
    northwest: 'NW',
    southeast: 'SO',
    southwest: 'SW',

    // Alerts
    alerts: 'Warnungen',
    noAlerts: 'Keine aktiven Warnungen',

    // Historical
    historicalData: 'Historische Daten',
    last7Days: 'Letzte 7 Tage',
    average: 'Durchschnitt',

    // Settings
    settings: 'Einstellungen',
    language: 'Sprache',
    theme: 'Thema',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',

    // Marine
    marine: 'Meer',
    marineConditions: 'Meeresbedingungen',
    waveHeight: 'Wellenhöhe',
    swellDirection: 'Dünung-Richtung',
    seaTemperature: 'Meerestemperatur',

    // Radar
    radar: 'Radar',
    rainRadar: 'Regenradar',
    past: 'Vergangen',
    forecast: 'Vorhersage',

    // UI Elements
    large: 'Groß',
    small: 'Klein',
    customizeDashboard: 'Dashboard anpassen',
    dragToReorder: 'Karten ziehen zum Neuordnen',
    resetLayout: 'Layout zurücksetzen',
    landscapes3D: '3D-Landschaften',
    realTimeAlerts: 'Echtzeit-Warnungen',
    noMarineData: 'Meeresdaten nicht verfügbar',
    useCurrentLocation: 'Aktuellen Standort verwenden',

    // Weather descriptions
    clearSky: 'Klarer Himmel',
    mainlyClear: 'Überwiegend klar',
    partlyCloudy: 'Teilweise bewölkt',
    overcast: 'Bedeckt',
    fog: 'Nebel',
    drizzle: 'Nieselregen',
    rain: 'Regen',
    heavyRain: 'Starker Regen',
    snow: 'Schnee',
    heavySnow: 'Starker Schneefall',
    thunderstorm: 'Gewitter',
    unknown: 'Unbekannt',
  },

  pt: {
    // App
    appName: 'MeteoFlow',
    loading: 'Carregando...',
    error: 'Erro ao carregar dados',
    retry: 'Tentar novamente',

    // Search
    searchPlaceholder: 'Buscar cidade...',
    searchButton: 'Buscar',
    noResults: 'Nenhum resultado encontrado',

    // Current Weather
    currentWeather: 'Tempo Atual',
    feelsLike: 'Sensação',
    dewPoint: 'Ponto de Orvalho',
    humidity: 'Umidade',
    visibility: 'Visibilidade',
    pressure: 'Pressão',
    uvIndex: 'Índice UV',
    airQuality: 'Qualidade do Ar',
    wind: 'Vento',

    // UV Levels
    uvLow: 'Baixo',
    uvModerate: 'Moderado',
    uvHigh: 'Alto',
    uvVeryHigh: 'Muito Alto',
    uvExtreme: 'Extremo',

    // AQI
    aqiGood: 'Boa',
    aqiFair: 'Aceitável',
    aqiModerate: 'Moderada',
    aqiPoor: 'Ruim',
    aqiVeryPoor: 'Muito Ruim',

    // Forecast
    hourlyForecast: 'Previsão por Hora',
    dailyForecast: 'Previsão Diária',
    next24Hours: 'Próximas 24 horas',
    next10Days: 'Previsão 10 dias',
    today: 'Hoje',
    tomorrow: 'Amanhã',
    now: 'Agora',
    atTime: 'às',
    max: 'Máx',
    min: 'Mín',

    // Weather conditions
    condition: 'Condição',
    precipitation: 'Precipitação',
    maxWind: 'Vento máx.',

    // Sun/Moon
    sunrise: 'Nascer do sol',
    sunset: 'Pôr do sol',
    dayLength: 'Duração do dia',

    // Wind
    windSpeed: 'Velocidade do Vento',
    gusts: 'Rajadas',
    windDirection: 'Direção',

    // Cardinal directions
    north: 'N',
    south: 'S',
    east: 'L',
    west: 'O',
    northeast: 'NE',
    northwest: 'NO',
    southeast: 'SE',
    southwest: 'SO',

    // Alerts
    alerts: 'Alertas',
    noAlerts: 'Sem alertas ativos',

    // Historical
    historicalData: 'Dados Históricos',
    last7Days: 'Últimos 7 dias',
    average: 'Média',

    // Settings
    settings: 'Configurações',
    language: 'Idioma',
    theme: 'Tema',
    darkMode: 'Modo Escuro',
    lightMode: 'Modo Claro',

    // Marine
    marine: 'Marinho',
    marineConditions: 'Condições Marinhas',
    waveHeight: 'Altura das ondas',
    swellDirection: 'Direção da ondulação',
    seaTemperature: 'Temp. do mar',

    // Radar
    radar: 'Radar',
    rainRadar: 'Radar de Chuva',
    past: 'Passado',
    forecast: 'Previsão',

    // UI Elements
    large: 'Grande',
    small: 'Pequeno',
    customizeDashboard: 'Personalizar Painel',
    dragToReorder: 'Arraste os cartões para reordenar',
    resetLayout: 'Redefinir Layout',
    landscapes3D: 'Paisagens 3D',
    realTimeAlerts: 'Alertas em Tempo Real',
    noMarineData: 'Dados marinhos não disponíveis',
    useCurrentLocation: 'Usar localização atual',

    // Weather descriptions
    clearSky: 'Céu limpo',
    mainlyClear: 'Majoritariamente limpo',
    partlyCloudy: 'Parcialmente nublado',
    overcast: 'Nublado',
    fog: 'Nevoeiro',
    drizzle: 'Chuvisco',
    rain: 'Chuva',
    heavyRain: 'Chuva forte',
    snow: 'Neve',
    heavySnow: 'Neve forte',
    thunderstorm: 'Tempestade',
    unknown: 'Desconhecido',
  },
};
