# MeteoFlow PRO

A modern, immersive weather application featuring real-time 3D landscapes, comprehensive weather data, and a customizable dashboard.

![MeteoFlow PRO](https://img.shields.io/badge/MeteoFlow-PRO-0066ff)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)
![Three.js](https://img.shields.io/badge/Three.js-0.160-000000)

## Features

### Real-Time Weather Data
- **Current conditions**: Temperature, humidity, pressure, visibility, UV index, and more
- **Hourly forecast**: 48-hour detailed predictions
- **10-day forecast**: Extended daily weather outlook
- **Air quality index**: European AQI with PM2.5, PM10, NO2, O3, SO2, and CO levels

### Interactive Rain Radar
- Live precipitation radar powered by RainViewer API
- Animated timeline with past observations and forecast
- Precise city location marker

### 3D Immersive Backgrounds
- Dynamic WebGL landscapes that change based on weather conditions
- Over 100 unique 3D scenes
- Powered by Three.js and React Three Fiber

### Additional Features
- **Marine conditions**: Wave height, swell, and sea temperature for coastal locations
- **Sun & UV tracking**: Sunrise/sunset times, day length, UV index with advice
- **Weather alerts**: Real-time severe weather and natural disaster warnings
- **Historical data**: 7-day temperature history with trends

### Customizable Dashboard
- Drag-and-drop card reordering
- Resizable cards (small/large)
- Toggle card visibility
- Persistent layout saved to localStorage

### Multi-Language Support
- Spanish (Espanol)
- English
- French (Francais)
- German (Deutsch)
- Portuguese (Portugues)

### Responsive Design
- Fully responsive from mobile to large desktop
- Touch-optimized for mobile devices
- Dark/Light theme support
- Glassmorphism UI with backdrop blur effects

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Build Tool**: Vite
- **Styling**: CSS-in-JS with CSS variables
- **Deployment**: Vercel-ready

## APIs Used

- [Open-Meteo](https://open-meteo.com/) - Weather forecast data
- [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api) - Air quality index
- [Open-Meteo Marine](https://open-meteo.com/en/docs/marine-weather-api) - Marine/ocean conditions
- [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) - City search
- [RainViewer](https://www.rainviewer.com/api.html) - Precipitation radar

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/raym33/meteoflow.git
cd meteoflow

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AlertsCard.tsx       # Weather & disaster alerts
│   ├── CurrentWeatherCard.tsx
│   ├── DailyForecast.tsx
│   ├── DraggableGrid.tsx    # Dashboard grid system
│   ├── HistoricalModal.tsx  # Historical data charts
│   ├── HourlyForecast.tsx
│   ├── Icons.tsx            # SVG icon components
│   ├── InfoCards.tsx        # Air quality, sun, wind, marine cards
│   ├── LandscapeEngine.tsx  # 3D background engine
│   ├── LanguageSelector.tsx
│   ├── LocationSearch.tsx
│   ├── RainRadar.tsx        # Precipitation radar
│   ├── WeatherBackground.tsx
│   ├── WeatherIcon3D.tsx
│   ├── WeatherIconAnimated.tsx
│   └── WeatherScene3D.tsx
├── hooks/
│   └── useWeather.ts        # Weather data fetching & state
├── i18n/
│   ├── LanguageContext.tsx  # Language provider
│   └── translations.ts      # 5-language translations
├── services/
│   └── weatherApi.ts        # API calls & data parsing
├── types/
│   └── weather.ts           # TypeScript interfaces
├── App.tsx                  # Main application
└── index.tsx                # Entry point
```

## Configuration

The app works out of the box with no API keys required. All weather data comes from the free Open-Meteo API.

### Default Location

The default location is Madrid, Spain. Users can:
- Search for any city worldwide
- Use their current GPS location
- The last selected location is saved in localStorage

## Deployment

### Vercel (Recommended)

The project includes a `vercel.json` configuration file. Simply connect your repository to Vercel for automatic deployments.

### Other Platforms

Build the project with `npm run build` and deploy the `dist/` folder to any static hosting service.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL support is required for 3D landscapes.

## License

MIT

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Radar data provided by [RainViewer](https://www.rainviewer.com/)
- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)
