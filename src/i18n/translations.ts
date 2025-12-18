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
  uvAdviceLow: string;
  uvAdviceModerate: string;
  uvAdviceHigh: string;
  uvAdviceVeryHigh: string;
  uvAdviceExtreme: string;

  // AQI
  aqiGood: string;
  aqiFair: string;
  aqiModerate: string;
  aqiPoor: string;
  aqiVeryPoor: string;
  airQualityIndex: string;
  aqiGoodAdvice: string;
  aqiFairAdvice: string;
  aqiModerateAdvice: string;
  aqiPoorAdvice: string;
  aqiVeryPoorAdvice: string;

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
  sunAndUv: string;

  // Wind
  windSpeed: string;
  gusts: string;
  windDirection: string;
  intensity: string;
  windCalm: string;
  windBreeze: string;
  windModerate: string;
  windStrong: string;
  windVeryStrong: string;

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
  alertSingular: string;
  alertPlural: string;
  loadingAlerts: string;
  noAlertsDescription: string;
  start: string;
  end: string;
  magnitude: string;
  distance: string;
  source: string;
  moreInfo: string;
  severityExtreme: string;
  severitySevere: string;
  severityModerate: string;
  severityMinor: string;
  severityInfo: string;
  severityUnknown: string;

  // Historical
  historicalData: string;
  last7Days: string;
  average: string;
  viewHistory: string;
  close: string;
  days: string;
  loadingHistory: string;
  minLabel: string;
  maxLabel: string;
  trend: string;

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
  wavePeriod: string;
  swellHeight: string;
  swellDirection: string;
  seaTemperature: string;
  from: string;
  seaCalm: string;
  seaRippled: string;
  seaSlight: string;
  seaModerate: string;
  seaRough: string;
  seaVeryRough: string;

  // Radar
  radar: string;
  rainRadar: string;
  past: string;
  forecast: string;

  // UI Elements
  large: string;
  small: string;
  expand: string;
  collapse: string;
  screenMobile: string;
  screenTablet: string;
  screenDesktop: string;
  screenLarge: string;
  touch: string;
  portrait: string;
  landscape: string;
  customizeDashboard: string;
  dragToReorder: string;
  resetLayout: string;
  landscapes3D: string;
  realTimeAlerts: string;
  noMarineData: string;
  useCurrentLocation: string;
  currentLocation: string;

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
    uvAdviceLow: 'No se requiere protección',
    uvAdviceModerate: 'Use protección solar',
    uvAdviceHigh: 'Protección solar necesaria',
    uvAdviceVeryHigh: 'Evite exposición prolongada',
    uvAdviceExtreme: 'Evite salir al sol',

    // AQI
    aqiGood: 'Buena',
    aqiFair: 'Aceptable',
    aqiModerate: 'Moderada',
    aqiPoor: 'Mala',
    aqiVeryPoor: 'Muy Mala',
    airQualityIndex: 'Índice AQI Europeo',
    aqiGoodAdvice: 'Ideal para actividades al aire libre',
    aqiFairAdvice: 'Aceptable para la mayoría de personas',
    aqiModerateAdvice: 'Grupos sensibles pueden verse afectados',
    aqiPoorAdvice: 'Evite actividades intensas al exterior',
    aqiVeryPoorAdvice: 'Permanezca en interiores si es posible',

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
    sunAndUv: 'Sol y UV',

    // Wind
    windSpeed: 'Velocidad del Viento',
    gusts: 'Ráfagas',
    windDirection: 'Dirección',
    intensity: 'Intensidad',
    windCalm: 'Calmado',
    windBreeze: 'Brisa',
    windModerate: 'Moderado',
    windStrong: 'Fuerte',
    windVeryStrong: 'Muy fuerte',

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
    alertSingular: 'alerta',
    alertPlural: 'alertas',
    loadingAlerts: 'Cargando alertas...',
    noAlertsDescription: 'No hay alertas meteorológicas o de desastres naturales para tu ubicación.',
    start: 'Inicio',
    end: 'Fin',
    magnitude: 'Magnitud',
    distance: 'Distancia',
    source: 'Fuente',
    moreInfo: 'Más info',
    severityExtreme: 'Extremo',
    severitySevere: 'Severo',
    severityModerate: 'Moderado',
    severityMinor: 'Menor',
    severityInfo: 'Informativo',
    severityUnknown: 'Desconocido',

    // Historical
    historicalData: 'Datos Históricos',
    last7Days: 'Últimos 7 días',
    average: 'Promedio',
    viewHistory: 'Ver historial',
    close: 'Cerrar',
    days: 'días',
    loadingHistory: 'Cargando historial...',
    minLabel: 'Mínimo',
    maxLabel: 'Máximo',
    trend: 'Tendencia',

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
    wavePeriod: 'Período',
    swellHeight: 'Oleaje fondo',
    swellDirection: 'Dirección del oleaje',
    seaTemperature: 'Temp. del mar',
    from: 'Desde',
    seaCalm: 'Calma',
    seaRippled: 'Mar rizada',
    seaSlight: 'Marejadilla',
    seaModerate: 'Marejada',
    seaRough: 'Fuerte marejada',
    seaVeryRough: 'Mar gruesa',

    // Radar
    radar: 'Radar',
    rainRadar: 'Radar de Lluvia',
    past: 'Pasado',
    forecast: 'Pronóstico',

    // UI Elements
    large: 'Grande',
    small: 'Pequeño',
    expand: 'Ampliar',
    collapse: 'Reducir',
    screenMobile: 'Móvil',
    screenTablet: 'Tablet',
    screenDesktop: 'Escritorio',
    screenLarge: 'Grande',
    touch: 'Táctil',
    portrait: 'Retrato',
    landscape: 'Paisaje',
    customizeDashboard: 'Personalizar Dashboard',
    dragToReorder: 'Arrastra las tarjetas para reordenarlas',
    resetLayout: 'Restablecer Layout',
    landscapes3D: 'Paisajes 3D',
    realTimeAlerts: 'Alertas en Tiempo Real',
    noMarineData: 'Datos marinos no disponibles',
    useCurrentLocation: 'Usar ubicación actual',
    currentLocation: 'Mi ubicación',

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
    uvAdviceLow: 'No protection required',
    uvAdviceModerate: 'Use sun protection',
    uvAdviceHigh: 'Sun protection needed',
    uvAdviceVeryHigh: 'Avoid prolonged exposure',
    uvAdviceExtreme: 'Avoid going out in the sun',

    // AQI
    aqiGood: 'Good',
    aqiFair: 'Fair',
    aqiModerate: 'Moderate',
    aqiPoor: 'Poor',
    aqiVeryPoor: 'Very Poor',
    airQualityIndex: 'European AQI Index',
    aqiGoodAdvice: 'Ideal for outdoor activities',
    aqiFairAdvice: 'Acceptable for most people',
    aqiModerateAdvice: 'Sensitive groups may be affected',
    aqiPoorAdvice: 'Avoid strenuous outdoor activities',
    aqiVeryPoorAdvice: 'Stay indoors if possible',

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
    sunAndUv: 'Sun & UV',

    // Wind
    windSpeed: 'Wind Speed',
    gusts: 'Gusts',
    windDirection: 'Direction',
    intensity: 'Intensity',
    windCalm: 'Calm',
    windBreeze: 'Breeze',
    windModerate: 'Moderate',
    windStrong: 'Strong',
    windVeryStrong: 'Very strong',

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
    alertSingular: 'alert',
    alertPlural: 'alerts',
    loadingAlerts: 'Loading alerts...',
    noAlertsDescription: 'No weather or disaster alerts for your location.',
    start: 'Start',
    end: 'End',
    magnitude: 'Magnitude',
    distance: 'Distance',
    source: 'Source',
    moreInfo: 'More info',
    severityExtreme: 'Extreme',
    severitySevere: 'Severe',
    severityModerate: 'Moderate',
    severityMinor: 'Minor',
    severityInfo: 'Info',
    severityUnknown: 'Unknown',

    // Historical
    historicalData: 'Historical Data',
    last7Days: 'Last 7 days',
    average: 'Average',
    viewHistory: 'View history',
    close: 'Close',
    days: 'days',
    loadingHistory: 'Loading history...',
    minLabel: 'Minimum',
    maxLabel: 'Maximum',
    trend: 'Trend',

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
    wavePeriod: 'Period',
    swellHeight: 'Swell height',
    swellDirection: 'Swell direction',
    seaTemperature: 'Sea temperature',
    from: 'From',
    seaCalm: 'Calm',
    seaRippled: 'Ripples',
    seaSlight: 'Slight',
    seaModerate: 'Moderate',
    seaRough: 'Rough',
    seaVeryRough: 'Very rough',

    // Radar
    radar: 'Radar',
    rainRadar: 'Rain Radar',
    past: 'Past',
    forecast: 'Forecast',

    // UI Elements
    large: 'Large',
    small: 'Small',
    expand: 'Expand',
    collapse: 'Collapse',
    screenMobile: 'Mobile',
    screenTablet: 'Tablet',
    screenDesktop: 'Desktop',
    screenLarge: 'Large',
    touch: 'Touch',
    portrait: 'Portrait',
    landscape: 'Landscape',
    customizeDashboard: 'Customize Dashboard',
    dragToReorder: 'Drag cards to reorder them',
    resetLayout: 'Reset Layout',
    landscapes3D: '3D Landscapes',
    realTimeAlerts: 'Real-Time Alerts',
    noMarineData: 'Marine data not available',
    useCurrentLocation: 'Use current location',
    currentLocation: 'My location',

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
    uvAdviceLow: 'Aucune protection nécessaire',
    uvAdviceModerate: 'Utilisez une protection solaire',
    uvAdviceHigh: 'Protection solaire nécessaire',
    uvAdviceVeryHigh: 'Évitez l\'exposition prolongée',
    uvAdviceExtreme: 'Évitez de sortir au soleil',

    // AQI
    aqiGood: 'Bonne',
    aqiFair: 'Acceptable',
    aqiModerate: 'Modérée',
    aqiPoor: 'Mauvaise',
    aqiVeryPoor: 'Très mauvaise',
    airQualityIndex: 'Indice AQI européen',
    aqiGoodAdvice: 'Idéal pour les activités en plein air',
    aqiFairAdvice: 'Acceptable pour la plupart des personnes',
    aqiModerateAdvice: 'Les personnes sensibles peuvent être affectées',
    aqiPoorAdvice: 'Évitez les activités intenses en extérieur',
    aqiVeryPoorAdvice: 'Restez à l\'intérieur si possible',

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
    sunAndUv: 'Soleil & UV',

    // Wind
    windSpeed: 'Vitesse du Vent',
    gusts: 'Rafales',
    windDirection: 'Direction',
    intensity: 'Intensité',
    windCalm: 'Calme',
    windBreeze: 'Brise',
    windModerate: 'Modéré',
    windStrong: 'Fort',
    windVeryStrong: 'Très fort',

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
    alertSingular: 'alerte',
    alertPlural: 'alertes',
    loadingAlerts: 'Chargement des alertes...',
    noAlertsDescription: 'Aucune alerte météo ou catastrophe naturelle pour votre localisation.',
    start: 'Début',
    end: 'Fin',
    magnitude: 'Magnitude',
    distance: 'Distance',
    source: 'Source',
    moreInfo: 'Plus d\'infos',
    severityExtreme: 'Extrême',
    severitySevere: 'Sévère',
    severityModerate: 'Modérée',
    severityMinor: 'Mineure',
    severityInfo: 'Info',
    severityUnknown: 'Inconnu',

    // Historical
    historicalData: 'Données Historiques',
    last7Days: '7 derniers jours',
    average: 'Moyenne',
    viewHistory: 'Voir l\'historique',
    close: 'Fermer',
    days: 'jours',
    loadingHistory: 'Chargement de l\'historique...',
    minLabel: 'Minimum',
    maxLabel: 'Maximum',
    trend: 'Tendance',

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
    wavePeriod: 'Période',
    swellHeight: 'Houle',
    swellDirection: 'Direction de la houle',
    seaTemperature: 'Temp. de la mer',
    from: 'De',
    seaCalm: 'Calme',
    seaRippled: 'Ridée',
    seaSlight: 'Peu agitée',
    seaModerate: 'Modérée',
    seaRough: 'Forte',
    seaVeryRough: 'Très forte',

    // Radar
    radar: 'Radar',
    rainRadar: 'Radar de Pluie',
    past: 'Passé',
    forecast: 'Prévision',

    // UI Elements
    large: 'Grand',
    small: 'Petit',
    expand: 'Agrandir',
    collapse: 'Réduire',
    screenMobile: 'Mobile',
    screenTablet: 'Tablette',
    screenDesktop: 'Bureau',
    screenLarge: 'Grand',
    touch: 'Tactile',
    portrait: 'Portrait',
    landscape: 'Paysage',
    customizeDashboard: 'Personnaliser le tableau de bord',
    dragToReorder: 'Faites glisser les cartes pour les réorganiser',
    resetLayout: 'Réinitialiser la mise en page',
    landscapes3D: 'Paysages 3D',
    realTimeAlerts: 'Alertes en temps réel',
    noMarineData: 'Données marines non disponibles',
    useCurrentLocation: 'Utiliser la position actuelle',
    currentLocation: 'Ma position',

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
    uvAdviceLow: 'Kein Schutz erforderlich',
    uvAdviceModerate: 'Sonnenschutz verwenden',
    uvAdviceHigh: 'Sonnenschutz erforderlich',
    uvAdviceVeryHigh: 'Längere Exposition vermeiden',
    uvAdviceExtreme: 'Sonne meiden',

    // AQI
    aqiGood: 'Gut',
    aqiFair: 'Akzeptabel',
    aqiModerate: 'Mäßig',
    aqiPoor: 'Schlecht',
    aqiVeryPoor: 'Sehr schlecht',
    airQualityIndex: 'Europäischer AQI-Index',
    aqiGoodAdvice: 'Ideal für Aktivitäten im Freien',
    aqiFairAdvice: 'Für die meisten Menschen akzeptabel',
    aqiModerateAdvice: 'Empfindliche Gruppen können betroffen sein',
    aqiPoorAdvice: 'Intensive Aktivitäten im Freien vermeiden',
    aqiVeryPoorAdvice: 'Wenn möglich drinnen bleiben',

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
    sunAndUv: 'Sonne & UV',

    // Wind
    windSpeed: 'Windgeschwindigkeit',
    gusts: 'Böen',
    windDirection: 'Richtung',
    intensity: 'Intensität',
    windCalm: 'Ruhig',
    windBreeze: 'Brise',
    windModerate: 'Mäßig',
    windStrong: 'Stark',
    windVeryStrong: 'Sehr stark',

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
    alertSingular: 'Warnung',
    alertPlural: 'Warnungen',
    loadingAlerts: 'Warnungen werden geladen...',
    noAlertsDescription: 'Keine Wetter- oder Katastrophenwarnungen für deinen Standort.',
    start: 'Beginn',
    end: 'Ende',
    magnitude: 'Magnitude',
    distance: 'Entfernung',
    source: 'Quelle',
    moreInfo: 'Mehr Info',
    severityExtreme: 'Extrem',
    severitySevere: 'Schwer',
    severityModerate: 'Mäßig',
    severityMinor: 'Gering',
    severityInfo: 'Info',
    severityUnknown: 'Unbekannt',

    // Historical
    historicalData: 'Historische Daten',
    last7Days: 'Letzte 7 Tage',
    average: 'Durchschnitt',
    viewHistory: 'Verlauf anzeigen',
    close: 'Schließen',
    days: 'Tage',
    loadingHistory: 'Verlauf wird geladen...',
    minLabel: 'Minimum',
    maxLabel: 'Maximum',
    trend: 'Trend',

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
    wavePeriod: 'Periode',
    swellHeight: 'Dünung',
    swellDirection: 'Dünung-Richtung',
    seaTemperature: 'Meerestemperatur',
    from: 'Aus',
    seaCalm: 'Ruhig',
    seaRippled: 'Kräusel',
    seaSlight: 'Leicht bewegt',
    seaModerate: 'Mäßig',
    seaRough: 'Rau',
    seaVeryRough: 'Sehr rau',

    // Radar
    radar: 'Radar',
    rainRadar: 'Regenradar',
    past: 'Vergangen',
    forecast: 'Vorhersage',

    // UI Elements
    large: 'Groß',
    small: 'Klein',
    expand: 'Vergrößern',
    collapse: 'Verkleinern',
    screenMobile: 'Mobil',
    screenTablet: 'Tablet',
    screenDesktop: 'Desktop',
    screenLarge: 'Groß',
    touch: 'Touch',
    portrait: 'Hochformat',
    landscape: 'Querformat',
    customizeDashboard: 'Dashboard anpassen',
    dragToReorder: 'Karten ziehen zum Neuordnen',
    resetLayout: 'Layout zurücksetzen',
    landscapes3D: '3D-Landschaften',
    realTimeAlerts: 'Echtzeit-Warnungen',
    noMarineData: 'Meeresdaten nicht verfügbar',
    useCurrentLocation: 'Aktuellen Standort verwenden',
    currentLocation: 'Mein Standort',

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
    uvAdviceLow: 'Não é necessária proteção',
    uvAdviceModerate: 'Use proteção solar',
    uvAdviceHigh: 'Proteção solar necessária',
    uvAdviceVeryHigh: 'Evite exposição prolongada',
    uvAdviceExtreme: 'Evite sair ao sol',

    // AQI
    aqiGood: 'Boa',
    aqiFair: 'Aceitável',
    aqiModerate: 'Moderada',
    aqiPoor: 'Ruim',
    aqiVeryPoor: 'Muito Ruim',
    airQualityIndex: 'Índice AQI Europeu',
    aqiGoodAdvice: 'Ideal para atividades ao ar livre',
    aqiFairAdvice: 'Aceitável para a maioria das pessoas',
    aqiModerateAdvice: 'Grupos sensíveis podem ser afetados',
    aqiPoorAdvice: 'Evite atividades intensas ao ar livre',
    aqiVeryPoorAdvice: 'Permaneça em ambientes internos se possível',

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
    sunAndUv: 'Sol e UV',

    // Wind
    windSpeed: 'Velocidade do Vento',
    gusts: 'Rajadas',
    windDirection: 'Direção',
    intensity: 'Intensidade',
    windCalm: 'Calmo',
    windBreeze: 'Brisa',
    windModerate: 'Moderado',
    windStrong: 'Forte',
    windVeryStrong: 'Muito forte',

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
    alertSingular: 'alerta',
    alertPlural: 'alertas',
    loadingAlerts: 'Carregando alertas...',
    noAlertsDescription: 'Não há alertas meteorológicos ou de desastres naturais para sua localização.',
    start: 'Início',
    end: 'Fim',
    magnitude: 'Magnitude',
    distance: 'Distância',
    source: 'Fonte',
    moreInfo: 'Mais info',
    severityExtreme: 'Extremo',
    severitySevere: 'Severo',
    severityModerate: 'Moderado',
    severityMinor: 'Menor',
    severityInfo: 'Informativo',
    severityUnknown: 'Desconhecido',

    // Historical
    historicalData: 'Dados Históricos',
    last7Days: 'Últimos 7 dias',
    average: 'Média',
    viewHistory: 'Ver histórico',
    close: 'Fechar',
    days: 'dias',
    loadingHistory: 'Carregando histórico...',
    minLabel: 'Mínimo',
    maxLabel: 'Máximo',
    trend: 'Tendência',

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
    wavePeriod: 'Período',
    swellHeight: 'Ondulação',
    swellDirection: 'Direção da ondulação',
    seaTemperature: 'Temp. do mar',
    from: 'De',
    seaCalm: 'Calmo',
    seaRippled: 'Mar rizado',
    seaSlight: 'Mar de vaga curta',
    seaModerate: 'Marejado',
    seaRough: 'Muito marejado',
    seaVeryRough: 'Mar grosso',

    // Radar
    radar: 'Radar',
    rainRadar: 'Radar de Chuva',
    past: 'Passado',
    forecast: 'Previsão',

    // UI Elements
    large: 'Grande',
    small: 'Pequeno',
    expand: 'Ampliar',
    collapse: 'Reduzir',
    screenMobile: 'Celular',
    screenTablet: 'Tablet',
    screenDesktop: 'Desktop',
    screenLarge: 'Grande',
    touch: 'Toque',
    portrait: 'Retrato',
    landscape: 'Paisagem',
    customizeDashboard: 'Personalizar Painel',
    dragToReorder: 'Arraste os cartões para reordenar',
    resetLayout: 'Redefinir Layout',
    landscapes3D: 'Paisagens 3D',
    realTimeAlerts: 'Alertas em Tempo Real',
    noMarineData: 'Dados marinhos não disponíveis',
    useCurrentLocation: 'Usar localização atual',
    currentLocation: 'Minha localização',

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
