const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LandscapeEngine-DK-6Imta.js","assets/three-vendor-BJRFEZKT.js"])))=>i.map(i=>d[i]);
import{r as x,_ as ue,c as me,R as he}from"./three-vendor-BJRFEZKT.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();var oe={exports:{}},B={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ge=x,ve=Symbol.for("react.element"),fe=Symbol.for("react.fragment"),be=Object.prototype.hasOwnProperty,ye=ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,we={key:!0,ref:!0,__self:!0,__source:!0};function le(t,r,a){var i,o={},n=null,s=null;a!==void 0&&(n=""+a),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(s=r.ref);for(i in r)be.call(r,i)&&!we.hasOwnProperty(i)&&(o[i]=r[i]);if(t&&t.defaultProps)for(i in r=t.defaultProps,r)o[i]===void 0&&(o[i]=r[i]);return{$$typeof:ve,type:t,key:n,ref:s,props:o,_owner:ye.current}}B.Fragment=fe;B.jsx=le;B.jsxs=le;oe.exports=B;var e=oe.exports;const je="https://api.open-meteo.com/v1",ke="https://air-quality-api.open-meteo.com/v1",Ne="https://marine-api.open-meteo.com/v1",Me="https://geocoding-api.open-meteo.com/v1";function Ce(t){return t<=20?"good":t<=40?"moderate":t<=60?"unhealthy-sensitive":t<=80?"unhealthy":t<=100?"very-unhealthy":"hazardous"}const Se={good:{label:"Bueno",color:"#22c55e"},moderate:{label:"Moderado",color:"#eab308"},"unhealthy-sensitive":{label:"Dañino para sensibles",color:"#f97316"},unhealthy:{label:"Dañino",color:"#ef4444"},"very-unhealthy":{label:"Muy dañino",color:"#a855f7"},hazardous:{label:"Peligroso",color:"#7f1d1d"}};async function De(t){const r=await fetch(`${Me}/search?name=${encodeURIComponent(t)}&count=10&language=es&format=json`);if(!r.ok)throw new Error("Error buscando ubicaciones");const a=await r.json();return a.results?a.results.map(i=>({name:i.name,region:i.admin1||"",country:i.country||"",latitude:i.latitude,longitude:i.longitude,timezone:i.timezone||"Europe/Madrid"})):[]}async function _e(t,r,a){const i=["temperature_2m","relative_humidity_2m","apparent_temperature","precipitation","rain","weather_code","pressure_msl","wind_speed_10m","wind_direction_10m","wind_gusts_10m","uv_index","cloud_cover","visibility","dew_point_2m","is_day"].join(","),o=["temperature_2m","precipitation","precipitation_probability","weather_code","wind_speed_10m","relative_humidity_2m"].join(","),n=["temperature_2m_max","temperature_2m_min","precipitation_sum","precipitation_probability_max","weather_code","wind_speed_10m_max","sunrise","sunset","uv_index_max"].join(","),s=`${je}/forecast?latitude=${t}&longitude=${r}&current=${i}&hourly=${o}&daily=${n}&timezone=${a}&forecast_days=10`,m=await fetch(s);if(!m.ok)throw new Error("Error obteniendo datos meteorológicos");return m.json()}async function Ee(t,r,a){const i=["european_aqi","pm2_5","pm10","nitrogen_dioxide","ozone","sulphur_dioxide","carbon_monoxide"].join(","),o=`${ke}/air-quality?latitude=${t}&longitude=${r}&current=${i}&timezone=${a}`,n=await fetch(o);if(!n.ok)throw new Error("Error obteniendo calidad del aire");return n.json()}async function ze(t,r,a){try{const i=["wave_height","wave_period","wave_direction","swell_wave_height","swell_wave_direction"].join(","),o=`${Ne}/marine?latitude=${t}&longitude=${r}&current=${i}&timezone=${a}`,n=await fetch(o);return n.ok?n.json():null}catch{return null}}function Le(t){return{temperature:t.temperature_2m,apparentTemperature:t.apparent_temperature,humidity:t.relative_humidity_2m,pressure:t.pressure_msl,windSpeed:t.wind_speed_10m,windDirection:t.wind_direction_10m,windGusts:t.wind_gusts_10m,precipitation:t.precipitation,rain:t.rain,weatherCode:t.weather_code,uvIndex:t.uv_index,cloudCover:t.cloud_cover,visibility:t.visibility,dewPoint:t.dew_point_2m,isDay:t.is_day===1}}function Pe(t){return t.time.slice(0,48).map((r,a)=>({time:r,temperature:t.temperature_2m[a],precipitation:t.precipitation[a],precipitationProbability:t.precipitation_probability[a],weatherCode:t.weather_code[a],windSpeed:t.wind_speed_10m[a],humidity:t.relative_humidity_2m[a]}))}function Fe(t){return t.time.map((r,a)=>({date:r,temperatureMax:t.temperature_2m_max[a],temperatureMin:t.temperature_2m_min[a],precipitationSum:t.precipitation_sum[a],precipitationProbability:t.precipitation_probability_max[a],weatherCode:t.weather_code[a],windSpeedMax:t.wind_speed_10m_max[a],sunrise:t.sunrise[a],sunset:t.sunset[a],uvIndexMax:t.uv_index_max[a]}))}function Te(t){const r=t.european_aqi;return{aqi:r,pm25:t.pm2_5,pm10:t.pm10,no2:t.nitrogen_dioxide,o3:t.ozone,so2:t.sulphur_dioxide,co:t.carbon_monoxide,category:Ce(r)}}function $e(t){return{waveHeight:t.wave_height,wavePeriod:t.wave_period,waveDirection:t.wave_direction,seaTemperature:t.sea_surface_temperature||0,swellHeight:t.swell_wave_height,swellDirection:t.swell_wave_direction}}async function Ae(t){const{latitude:r,longitude:a,timezone:i}=t,[o,n,s]=await Promise.all([_e(r,a,i),Ee(r,a,i),ze(r,a,i)]);return{location:t,current:Le(o.current),hourly:Pe(o.hourly),daily:Fe(o.daily),airQuality:Te(n.current),marine:s?$e(s.current):void 0,lastUpdated:new Date().toISOString()}}function Re(){return new Promise((t,r)=>{if(!navigator.geolocation){r(new Error("Geolocation not supported"));return}navigator.geolocation.getCurrentPosition(t,r,{enableHighAccuracy:!0,timeout:1e4,maximumAge:3e5})})}async function Ie(t,r){return{name:"Mi ubicación",region:"",country:"",latitude:t,longitude:r,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone}}function U(t){const r=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"],a=Math.round(t/22.5)%16;return r[a]}function Q(t,r){return new Date(t).toLocaleDateString("es-ES",r)}function V(t){return new Date(t).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}const K="meteoflow_location",O="meteoflow_dark_mode",We=5*60*1e3,Z={name:"Madrid",region:"Comunidad de Madrid",country:"España",latitude:40.4168,longitude:-3.7038,timezone:"Europe/Madrid"};function Be(){const[t,r]=x.useState(null),[a,i]=x.useState(!0),[o,n]=x.useState(null),[s,m]=x.useState(()=>{try{const u=localStorage.getItem(K);return u?JSON.parse(u):Z}catch{return Z}}),[v,l]=x.useState([]),[h,j]=x.useState(!1),f=x.useCallback(async u=>{i(!0),n(null);try{const w=await Ae(u);r(w)}catch(w){n(w instanceof Error?w.message:"Error desconocido")}finally{i(!1)}},[]),p=x.useCallback(u=>{m(u),localStorage.setItem(K,JSON.stringify(u)),l([]),f(u)},[f]),d=x.useCallback(()=>{f(s)},[f,s]),c=x.useCallback(async u=>{if(u.length<2){l([]);return}j(!0);try{const w=await De(u);l(w)}catch{l([])}finally{j(!1)}},[]),b=x.useCallback(async()=>{i(!0),n(null);try{const u=await Re(),{latitude:w,longitude:y}=u.coords,g=await Ie(w,y);p(g)}catch{n("No se pudo obtener tu ubicación. Por favor, permite el acceso o busca una ciudad."),i(!1)}},[p]);return x.useEffect(()=>{f(s)},[]),x.useEffect(()=>{const u=setInterval(d,We);return()=>clearInterval(u)},[d]),{data:t,loading:a,error:o,location:s,setLocation:p,refresh:d,searchResults:v,search:c,searching:h,useCurrentLocation:b}}function Ge(){const[t,r]=x.useState(()=>{try{const i=localStorage.getItem(O);return i!==null?i==="true":window.matchMedia("(prefers-color-scheme: dark)").matches}catch{return!1}}),a=x.useCallback(()=>{r(i=>{const o=!i;return localStorage.setItem(O,String(o)),o})},[]);return x.useEffect(()=>{const i=window.matchMedia("(prefers-color-scheme: dark)"),o=n=>{localStorage.getItem(O)===null&&r(n.matches)};return i.addEventListener("change",o),()=>i.removeEventListener("change",o)},[]),[t,a]}const Oe=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("circle",{cx:"12",cy:"12",r:"5"}),e.jsx("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),e.jsx("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),e.jsx("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),e.jsx("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),e.jsx("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),e.jsx("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),e.jsx("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),e.jsx("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]}),He=({size:t=24,className:r,color:a="currentColor"})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:e.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})}),ce=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"}),e.jsx("path",{d:"M9.6 4.6A2 2 0 1 1 11 8H2"}),e.jsx("path",{d:"M12.6 19.4A2 2 0 1 0 14 16H2"})]}),W=({size:t=24,className:r,color:a="currentColor"})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:e.jsx("path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"})}),Ve=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),J=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M12 2v8"}),e.jsx("path",{d:"m4.93 10.93 1.41 1.41"}),e.jsx("path",{d:"M2 18h2"}),e.jsx("path",{d:"M20 18h2"}),e.jsx("path",{d:"m19.07 10.93-1.41 1.41"}),e.jsx("path",{d:"M22 22H2"}),e.jsx("path",{d:"m8 6 4-4 4 4"}),e.jsx("path",{d:"M16 18a4 4 0 0 0-8 0"})]}),qe=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M12 10V2"}),e.jsx("path",{d:"m4.93 10.93 1.41 1.41"}),e.jsx("path",{d:"M2 18h2"}),e.jsx("path",{d:"M20 18h2"}),e.jsx("path",{d:"m19.07 10.93-1.41 1.41"}),e.jsx("path",{d:"M22 22H2"}),e.jsx("path",{d:"m16 6-4 4-4-4"}),e.jsx("path",{d:"M16 18a4 4 0 0 0-8 0"})]}),Ue=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"})]}),ee=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),e.jsx("circle",{cx:"12",cy:"10",r:"3"})]}),Ye=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),Xe=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),e.jsx("path",{d:"M3 3v5h5"}),e.jsx("path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"}),e.jsx("path",{d:"M16 16h5v5"})]}),Qe=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}),e.jsx("path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}),e.jsx("path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"})]}),Ke=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("path",{d:"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),e.jsx("path",{d:"M6 8h12"}),e.jsx("path",{d:"M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"}),e.jsx("path",{d:"M6.6 15.6A2 2 0 1 0 10 17v-5"})]}),Ze=({size:t=24,className:r,color:a="currentColor"})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"22",y1:"12",x2:"18",y2:"12"}),e.jsx("line",{x1:"6",y1:"12",x2:"2",y2:"12"}),e.jsx("line",{x1:"12",y1:"6",x2:"12",y2:"2"}),e.jsx("line",{x1:"12",y1:"22",x2:"12",y2:"18"})]}),Je=({onSelect:t,onSearch:r,searchResults:a,searching:i,onUseCurrentLocation:o,currentLocation:n})=>{const[s,m]=x.useState(""),[v,l]=x.useState(!1),h=x.useRef(null),j=x.useRef(null),f=x.useRef();x.useEffect(()=>{const b=u=>{h.current&&!h.current.contains(u.target)&&l(!1)};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[]);const p=b=>{const u=b.target.value;m(u),l(!0),f.current&&clearTimeout(f.current),f.current=setTimeout(()=>{r(u)},300)},d=b=>{m(""),l(!1),t(b)},c=()=>{m(""),l(!1),o()};return e.jsxs("div",{className:"location-search",ref:h,children:[e.jsxs("div",{className:"search-input-container",children:[e.jsx(Ye,{size:18,className:"search-icon"}),e.jsx("input",{ref:j,type:"text",value:s,onChange:p,onFocus:()=>l(!0),placeholder:"Buscar ciudad...",className:"search-input"}),n&&e.jsx("button",{className:"current-location-btn",onClick:()=>l(!v),title:`${n.name}${n.country?`, ${n.country}`:""}`,children:e.jsx(ee,{size:18})})]}),v&&e.jsxs("div",{className:"search-dropdown",children:[e.jsxs("button",{className:"dropdown-item use-location",onClick:c,children:[e.jsx(Ze,{size:18}),e.jsx("span",{children:"Usar mi ubicación"})]}),i&&e.jsx("div",{className:"dropdown-item loading",children:e.jsx("span",{children:"Buscando..."})}),!i&&a.length===0&&s.length>=2&&e.jsx("div",{className:"dropdown-item no-results",children:e.jsx("span",{children:"No se encontraron resultados"})}),a.map((b,u)=>e.jsxs("button",{className:"dropdown-item",onClick:()=>d(b),children:[e.jsx(ee,{size:16}),e.jsxs("div",{className:"location-info",children:[e.jsx("span",{className:"location-name",children:b.name}),e.jsx("span",{className:"location-region",children:[b.region,b.country].filter(Boolean).join(", ")})]})]},`${b.latitude}-${b.longitude}-${u}`))]}),e.jsx("style",{children:`
        .location-search {
          position: relative;
          width: 100%;
          max-width: min(320px, calc(100vw - 32px));
        }

        .search-input-container {
          display: flex;
          align-items: center;
          background: var(--bg-elevated, var(--surface-elevated));
          border: 1px solid var(--border, var(--border-color));
          border-radius: var(--radius-lg, 12px);
          padding: 0 clamp(10px, 2.5vw, 12px);
          transition: all 0.2s ease;
        }

        .search-input-container:focus-within {
          border-color: var(--accent, var(--accent-color));
          box-shadow: 0 0 0 3px var(--accent-subtle, var(--accent-glow));
        }

        .search-icon {
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          height: clamp(40px, 10vw, 44px);
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: clamp(13px, 3.5vw, 14px);
          padding: 0 clamp(8px, 2vw, 12px);
          outline: none;
          min-width: 0;
        }

        .search-input::placeholder {
          color: var(--text-tertiary);
        }

        .current-location-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(28px, 7vw, 32px);
          height: clamp(28px, 7vw, 32px);
          border: none;
          background: var(--bg-subtle, var(--surface-hover));
          border-radius: var(--radius-sm, 8px);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .current-location-btn:hover {
          background: var(--accent, var(--accent-color));
          color: white;
        }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: var(--bg-elevated, var(--surface-elevated));
          border: 1px solid var(--border, var(--border-color));
          border-radius: var(--radius-lg, 12px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 100;
          max-height: min(320px, 50vh);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2.5vw, 12px);
          width: 100%;
          padding: clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px);
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: clamp(13px, 3.5vw, 14px);
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .dropdown-item:hover {
          background: var(--bg-subtle, var(--surface-hover));
        }

        .dropdown-item.use-location {
          border-bottom: 1px solid var(--border, var(--border-color));
          color: var(--accent, var(--accent-color));
          font-weight: 500;
        }

        .dropdown-item.loading,
        .dropdown-item.no-results {
          color: var(--text-tertiary);
          cursor: default;
        }

        .dropdown-item.loading:hover,
        .dropdown-item.no-results:hover {
          background: transparent;
        }

        .location-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
          min-width: 0;
          flex: 1;
        }

        .location-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .location-region {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (hover: none) {
          .dropdown-item:hover {
            background: transparent;
          }

          .dropdown-item:active {
            background: var(--bg-subtle, var(--surface-hover));
          }

          .current-location-btn:hover {
            background: var(--bg-subtle, var(--surface-hover));
            color: var(--text-secondary);
          }

          .current-location-btn:active {
            background: var(--accent, var(--accent-color));
            color: white;
          }
        }
      `})]})},et=async(t,r,a,i=7)=>{var v,l;const o=new Date,n=new Date;n.setDate(n.getDate()-i);const s=h=>h.toISOString().split("T")[0];let m="";switch(a){case"temperature":m="temperature_2m_max,temperature_2m_min";break;case"humidity":m="relative_humidity_2m_mean";break;case"pressure":m="pressure_msl_mean";break;case"wind":m="wind_speed_10m_max";break;case"precipitation":m="precipitation_sum";break;case"uv":m="uv_index_max";break;default:m="temperature_2m_max"}try{const h=`https://archive-api.open-meteo.com/v1/archive?latitude=${t}&longitude=${r}&start_date=${s(n)}&end_date=${s(o)}&daily=${m}&timezone=auto`,j=await fetch(h);if(!j.ok)throw new Error("API error");const f=await j.json(),p=((v=f.daily)==null?void 0:v.time)||[],d=((l=f.daily)==null?void 0:l[Object.keys(f.daily).find(c=>c!=="time")||""])||[];return p.map((c,b)=>({date:c,value:d[b]??0}))}catch(h){return console.error("Error fetching historical data:",h),tt(i,a)}},tt=(t,r)=>{const a=[],i={temperature:{base:20,variance:8},humidity:{base:60,variance:20},pressure:{base:1013,variance:15},wind:{base:15,variance:10},precipitation:{base:2,variance:5},uv:{base:5,variance:3},air_quality:{base:50,variance:30}},{base:o,variance:n}=i[r];for(let s=t;s>=0;s--){const m=new Date;m.setDate(m.getDate()-s),a.push({date:m.toISOString().split("T")[0],value:Math.max(0,o+(Math.random()-.5)*n*2)})}return a},rt=({data:t,unit:r,color:a})=>{const i=x.useRef(null),[o,n]=x.useState(null);x.useEffect(()=>{const v=i.current;if(!v||t.length===0)return;const l=v.getContext("2d");if(!l)return;const h=window.devicePixelRatio||1,j=v.getBoundingClientRect();v.width=j.width*h,v.height=j.height*h,l.scale(h,h);const f=j.width,p=j.height,d={top:20,right:20,bottom:40,left:50},c=f-d.left-d.right,b=p-d.top-d.bottom,u=t.map(S=>S.value),w=Math.min(...u)*.9,y=Math.max(...u)*1.1,g=y-w||1;l.clearRect(0,0,f,p);const N=getComputedStyle(document.documentElement),M=N.getPropertyValue("--text-tertiary").trim()||"#999",_=N.getPropertyValue("--border").trim()||"rgba(0,0,0,0.1)";l.strokeStyle=_,l.lineWidth=1;for(let S=0;S<=4;S++){const D=d.top+b/4*S;l.beginPath(),l.moveTo(d.left,D),l.lineTo(f-d.right,D),l.stroke()}l.fillStyle=M,l.font="11px -apple-system, sans-serif",l.textAlign="right";for(let S=0;S<=4;S++){const D=d.top+b/4*S,k=y-g/4*S;l.fillText(k.toFixed(1),d.left-8,D+4)}l.textAlign="center";const E=Math.ceil(t.length/7);t.forEach((S,D)=>{if(D%E===0||D===t.length-1){const k=d.left+c/(t.length-1)*D,L=new Date(S.date).toLocaleDateString("es-ES",{day:"numeric",month:"short"});l.fillText(L,k,p-d.bottom+20)}});const z=l.createLinearGradient(0,d.top,0,p-d.bottom);z.addColorStop(0,a+"40"),z.addColorStop(1,a+"00"),l.beginPath(),t.forEach((S,D)=>{const k=d.left+c/(t.length-1)*D,C=d.top+b-(S.value-w)/g*b;D===0?l.moveTo(k,C):l.lineTo(k,C)}),l.lineTo(d.left+c,p-d.bottom),l.lineTo(d.left,p-d.bottom),l.closePath(),l.fillStyle=z,l.fill(),l.beginPath(),l.strokeStyle=a,l.lineWidth=2.5,l.lineJoin="round",l.lineCap="round",t.forEach((S,D)=>{const k=d.left+c/(t.length-1)*D,C=d.top+b-(S.value-w)/g*b;D===0?l.moveTo(k,C):l.lineTo(k,C)}),l.stroke(),t.forEach((S,D)=>{const k=d.left+c/(t.length-1)*D,C=d.top+b-(S.value-w)/g*b;l.beginPath(),l.arc(k,C,(o==null?void 0:o.index)===D?6:4,0,Math.PI*2),l.fillStyle=(o==null?void 0:o.index)===D?a:"#fff",l.fill(),l.strokeStyle=a,l.lineWidth=2,l.stroke()})},[t,a,o]);const s=v=>{const l=i.current;if(!l||t.length===0)return;const h=l.getBoundingClientRect(),j=v.clientX-h.left,f={left:50,right:20},p=h.width-f.left-f.right,d=Math.round((j-f.left)/p*(t.length-1));if(d>=0&&d<t.length){const c=f.left+p/(t.length-1)*d;n({index:d,x:c,y:v.clientY-h.top})}else n(null)},m=()=>n(null);return e.jsxs("div",{className:"chart-container",children:[e.jsx("canvas",{ref:i,onMouseMove:s,onMouseLeave:m,style:{width:"100%",height:"100%"}}),o&&t[o.index]&&e.jsxs("div",{className:"chart-tooltip",style:{left:o.x,top:o.y-40},children:[e.jsxs("div",{className:"tooltip-value",children:[t[o.index].value.toFixed(1)," ",r]}),e.jsx("div",{className:"tooltip-date",children:new Date(t[o.index].date).toLocaleDateString("es-ES",{weekday:"short",day:"numeric",month:"short"})})]}),e.jsx("style",{children:`
        .chart-container {
          position: relative;
          width: 100%;
          height: 250px;
        }

        .chart-tooltip {
          position: absolute;
          transform: translateX(-50%);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          pointer-events: none;
          z-index: 10;
          animation: tooltipFade 0.15s ease;
        }

        @keyframes tooltipFade {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .tooltip-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .tooltip-date {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 2px;
        }
      `})]})},at=({isOpen:t,onClose:r,type:a,title:i,currentValue:o,unit:n,lat:s,lon:m})=>{var w,y;const[v,l]=x.useState([]),[h,j]=x.useState(!0),[f,p]=x.useState(7),d=x.useRef(null);x.useEffect(()=>{t&&(j(!0),et(s,m,a,f).then(g=>{l(g),j(!1)}))},[t,s,m,a,f]),x.useEffect(()=>{const g=N=>{N.key==="Escape"&&r()};return t&&(document.addEventListener("keydown",g),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",g),document.body.style.overflow=""}},[t,r]);const c=g=>{g.target===g.currentTarget&&r()};if(!t)return null;const b=()=>{switch(a){case"temperature":return"#ff6b6b";case"humidity":return"#4ecdc4";case"pressure":return"#a855f7";case"wind":return"#3b82f6";case"precipitation":return"#06b6d4";case"uv":return"#f59e0b";case"air_quality":return"#22c55e";default:return"#6366f1"}},u=v.length>0?{min:Math.min(...v.map(g=>g.value)),max:Math.max(...v.map(g=>g.value)),avg:v.reduce((g,N)=>g+N.value,0)/v.length,trend:((w=v[v.length-1])==null?void 0:w.value)-((y=v[0])==null?void 0:y.value)}:null;return e.jsxs("div",{className:"modal-backdrop",onClick:c,children:[e.jsxs("div",{className:"modal-container",ref:d,children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title-section",children:[e.jsx("h2",{className:"modal-title",children:i}),e.jsxs("div",{className:"current-value",style:{color:b()},children:[o.toFixed(1)," ",e.jsx("span",{className:"current-unit",children:n})]})]}),e.jsx("button",{className:"modal-close",onClick:r,"aria-label":"Cerrar",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),e.jsxs("div",{className:"modal-content",children:[e.jsx("div",{className:"period-selector",children:[7,14,30].map(g=>e.jsxs("button",{className:`period-btn ${f===g?"active":""}`,onClick:()=>p(g),children:[g," días"]},g))}),h?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("span",{children:"Cargando historial..."})]}):e.jsxs(e.Fragment,{children:[e.jsx(rt,{data:v,unit:n,color:b()}),u&&e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Mínimo"}),e.jsxs("span",{className:"stat-value",children:[u.min.toFixed(1)," ",n]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Máximo"}),e.jsxs("span",{className:"stat-value",children:[u.max.toFixed(1)," ",n]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Promedio"}),e.jsxs("span",{className:"stat-value",children:[u.avg.toFixed(1)," ",n]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Tendencia"}),e.jsxs("span",{className:`stat-value trend ${u.trend>=0?"up":"down"}`,children:[u.trend>=0?"↑":"↓"," ",Math.abs(u.trend).toFixed(1)," ",n]})]})]})]})]})]}),e.jsx("style",{children:`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: backdropFade 0.2s ease;
        }

        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlide 0.3s ease;
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: clamp(16px, 4vw, 24px);
          border-bottom: 1px solid var(--border);
        }

        .modal-title-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-title {
          font-size: clamp(16px, 4vw, 20px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .current-value {
          font-size: clamp(24px, 6vw, 32px);
          font-weight: 700;
          line-height: 1.2;
        }

        .current-unit {
          font-size: 0.5em;
          font-weight: 500;
          opacity: 0.7;
        }

        .modal-close {
          width: 40px;
          height: 40px;
          border: none;
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: var(--danger);
          color: white;
          transform: rotate(90deg);
        }

        .modal-content {
          padding: clamp(16px, 4vw, 24px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 4vw, 24px);
        }

        .period-selector {
          display: flex;
          gap: 8px;
          background: var(--bg-subtle);
          padding: 4px;
          border-radius: var(--radius-md);
          width: fit-content;
        }

        .period-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .period-btn:hover {
          color: var(--text-primary);
        }

        .period-btn.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 250px;
          gap: 12px;
          color: var(--text-tertiary);
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .stat-item {
          background: var(--bg-subtle);
          padding: clamp(12px, 3vw, 16px);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: clamp(10px, 2.5vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-value.trend.up {
          color: #22c55e;
        }

        .stat-value.trend.down {
          color: #ef4444;
        }

        @media (max-width: 480px) {
          .modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }

          .modal-container {
            max-width: 100%;
            max-height: 85vh;
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
            animation: modalSlideUp 0.3s ease;
          }

          @keyframes modalSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        }
      `})]})},P=({value:t,unit:r,type:a,title:i,lat:o,lon:n,className:s,children:m})=>{const[v,l]=x.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:`clickable-value ${s||""}`,onClick:()=>l(!0),title:"Ver historial",children:[m||`${t.toFixed(1)} ${r}`,e.jsx("span",{className:"history-indicator",children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polyline",{points:"12 6 12 12 16 14"})]})})]}),e.jsx(at,{isOpen:v,onClose:()=>l(!1),type:a,title:i,currentValue:t,unit:r,lat:o,lon:n}),e.jsx("style",{children:`
        .clickable-value {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 2px 6px;
          margin: -2px -6px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font: inherit;
          color: inherit;
          transition: all 0.2s;
          position: relative;
        }

        .clickable-value:hover {
          background: var(--accent-subtle);
        }

        .clickable-value:hover .history-indicator {
          opacity: 1;
          transform: scale(1);
        }

        .history-indicator {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.2s;
          color: var(--accent);
        }
      `})]})},it=({size:t=48,className:r=""})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"sunGradient",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFD700"}),e.jsx("stop",{offset:"70%",stopColor:"#FFA500"}),e.jsx("stop",{offset:"100%",stopColor:"#FF8C00"})]}),e.jsxs("filter",{id:"sunGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"blur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),e.jsxs("circle",{cx:"50",cy:"50",r:"28",fill:"#FFD700",opacity:"0.3",children:[e.jsx("animate",{attributeName:"r",values:"28;32;28",dur:"2s",repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"opacity",values:"0.3;0.5;0.3",dur:"2s",repeatCount:"indefinite"})]}),e.jsx("g",{filter:"url(#sunGlow)",children:[...Array(12)].map((a,i)=>e.jsx("line",{x1:"50",y1:"10",x2:"50",y2:"20",stroke:"#FFD700",strokeWidth:"3",strokeLinecap:"round",transform:`rotate(${i*30} 50 50)`,children:e.jsx("animate",{attributeName:"y1",values:"10;8;10",dur:"1.5s",begin:`${i*.1}s`,repeatCount:"indefinite"})},i))}),e.jsx("circle",{cx:"50",cy:"50",r:"22",fill:"url(#sunGradient)",filter:"url(#sunGlow)",children:e.jsx("animate",{attributeName:"r",values:"22;23;22",dur:"2s",repeatCount:"indefinite"})}),e.jsx("style",{children:`
      .weather-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
    `})]}),nt=({size:t=48,className:r=""})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"moonGradient",cx:"30%",cy:"30%",r:"70%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFFACD"}),e.jsx("stop",{offset:"100%",stopColor:"#F0E68C"})]}),e.jsxs("filter",{id:"moonGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[e.jsx("feGaussianBlur",{stdDeviation:"2",result:"blur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"blur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),e.jsx("circle",{cx:"50",cy:"50",r:"30",fill:"#FFFACD",opacity:"0.2",children:e.jsx("animate",{attributeName:"r",values:"30;34;30",dur:"3s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"50",cy:"50",r:"24",fill:"url(#moonGradient)",filter:"url(#moonGlow)"}),e.jsx("circle",{cx:"42",cy:"45",r:"5",fill:"#DAA520",opacity:"0.3"}),e.jsx("circle",{cx:"58",cy:"55",r:"3",fill:"#DAA520",opacity:"0.25"}),e.jsx("circle",{cx:"52",cy:"40",r:"2.5",fill:"#DAA520",opacity:"0.2"}),[{x:15,y:20,delay:"0s"},{x:82,y:25,delay:"0.5s"},{x:20,y:75,delay:"1s"},{x:85,y:70,delay:"1.5s"},{x:75,y:15,delay:"0.3s"}].map((a,i)=>e.jsxs("circle",{cx:a.x,cy:a.y,r:"1.5",fill:"#FFFFFF",children:[e.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:"2s",begin:a.delay,repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"r",values:"1.5;2;1.5",dur:"2s",begin:a.delay,repeatCount:"indefinite"})]},i))]}),st=({size:t=48,className:r="",dark:a=!1})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:a?"darkCloudGrad":"cloudGrad",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:a?"#6B7280":"#FFFFFF"}),e.jsx("stop",{offset:"100%",stopColor:a?"#4B5563":"#E5E7EB"})]}),e.jsx("filter",{id:"cloudShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:e.jsx("feDropShadow",{dx:"0",dy:"2",stdDeviation:"2",floodOpacity:"0.2"})})]}),e.jsxs("g",{filter:"url(#cloudShadow)",children:[e.jsx("ellipse",{cx:"50",cy:"55",rx:"30",ry:"18",fill:`url(#${a?"darkCloudGrad":"cloudGrad"})`,children:e.jsx("animate",{attributeName:"cx",values:"50;52;50",dur:"4s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"35",cy:"50",r:"16",fill:`url(#${a?"darkCloudGrad":"cloudGrad"})`,children:e.jsx("animate",{attributeName:"cx",values:"35;37;35",dur:"4s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"55",cy:"45",r:"18",fill:`url(#${a?"darkCloudGrad":"cloudGrad"})`,children:e.jsx("animate",{attributeName:"cx",values:"55;57;55",dur:"4s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"70",cy:"52",r:"14",fill:`url(#${a?"darkCloudGrad":"cloudGrad"})`,children:e.jsx("animate",{attributeName:"cx",values:"70;72;70",dur:"4s",repeatCount:"indefinite"})})]})]}),H=({size:t=48,className:r="",heavy:a=!1})=>{const i=a?8:5;return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"rainCloudGrad",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#6B7280"}),e.jsx("stop",{offset:"100%",stopColor:"#4B5563"})]}),e.jsxs("linearGradient",{id:"rainDrop",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#60A5FA"}),e.jsx("stop",{offset:"100%",stopColor:"#3B82F6"})]})]}),e.jsxs("g",{transform:"translate(0, -10) scale(0.8)",children:[e.jsx("ellipse",{cx:"50",cy:"45",rx:"28",ry:"16",fill:"url(#rainCloudGrad)"}),e.jsx("circle",{cx:"35",cy:"40",r:"14",fill:"url(#rainCloudGrad)"}),e.jsx("circle",{cx:"55",cy:"35",r:"16",fill:"url(#rainCloudGrad)"}),e.jsx("circle",{cx:"68",cy:"42",r:"12",fill:"url(#rainCloudGrad)"})]}),[...Array(i)].map((o,n)=>{const s=25+n*50/i+n%2*5;return e.jsxs("ellipse",{cx:s,cy:"55",rx:"2",ry:"6",fill:"url(#rainDrop)",children:[e.jsx("animate",{attributeName:"cy",values:"55;90;55",dur:`${.6+n%3*.2}s`,begin:`${n*.1}s`,repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"opacity",values:"1;0.3;1",dur:`${.6+n%3*.2}s`,begin:`${n*.1}s`,repeatCount:"indefinite"})]},n)})]})},te=({size:t=48,className:r="",heavy:a=!1})=>{const i=a?8:5;return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"snowCloudGrad",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#E5E7EB"}),e.jsx("stop",{offset:"100%",stopColor:"#D1D5DB"})]})}),e.jsxs("g",{transform:"translate(0, -10) scale(0.8)",children:[e.jsx("ellipse",{cx:"50",cy:"45",rx:"28",ry:"16",fill:"url(#snowCloudGrad)"}),e.jsx("circle",{cx:"35",cy:"40",r:"14",fill:"url(#snowCloudGrad)"}),e.jsx("circle",{cx:"55",cy:"35",r:"16",fill:"url(#snowCloudGrad)"}),e.jsx("circle",{cx:"68",cy:"42",r:"12",fill:"url(#snowCloudGrad)"})]}),[...Array(i)].map((o,n)=>{const s=25+n*50/i+n%2*5;return e.jsx("g",{children:e.jsxs("circle",{cx:s,cy:"55",r:"3",fill:"#FFFFFF",stroke:"#E5E7EB",strokeWidth:"0.5",children:[e.jsx("animate",{attributeName:"cy",values:"55;88;55",dur:`${1.5+n%3*.5}s`,begin:`${n*.2}s`,repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"cx",values:`${s};${s+5};${s-3};${s}`,dur:`${1.5+n%3*.5}s`,begin:`${n*.2}s`,repeatCount:"indefinite"})]})},n)})]})},ot=({size:t=48,className:r=""})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"stormCloudGrad",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#4B5563"}),e.jsx("stop",{offset:"100%",stopColor:"#1F2937"})]}),e.jsxs("filter",{id:"lightningGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[e.jsx("feGaussianBlur",{stdDeviation:"2",result:"blur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"blur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),e.jsxs("g",{transform:"translate(0, -8) scale(0.75)",children:[e.jsx("ellipse",{cx:"50",cy:"45",rx:"30",ry:"18",fill:"url(#stormCloudGrad)"}),e.jsx("circle",{cx:"32",cy:"40",r:"16",fill:"url(#stormCloudGrad)"}),e.jsx("circle",{cx:"55",cy:"32",r:"18",fill:"url(#stormCloudGrad)"}),e.jsx("circle",{cx:"72",cy:"42",r:"14",fill:"url(#stormCloudGrad)"})]}),e.jsx("polygon",{points:"52,35 42,55 48,55 40,80 58,50 50,50 58,35",fill:"#FDE047",filter:"url(#lightningGlow)",children:e.jsx("animate",{attributeName:"opacity",values:"1;0;1;1;0;1",dur:"2s",repeatCount:"indefinite",keyTimes:"0;0.1;0.2;0.5;0.6;1"})}),[30,45,65,75].map((a,i)=>e.jsxs("ellipse",{cx:a,cy:"55",rx:"1.5",ry:"5",fill:"#60A5FA",children:[e.jsx("animate",{attributeName:"cy",values:"55;92;55",dur:"0.6s",begin:`${i*.15}s`,repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"opacity",values:"0.8;0.2;0.8",dur:"0.6s",begin:`${i*.15}s`,repeatCount:"indefinite"})]},i))]}),lt=({size:t=48,className:r=""})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[{y:30,width:60,delay:"0s"},{y:45,width:70,delay:"0.5s"},{y:60,width:55,delay:"1s"},{y:75,width:65,delay:"1.5s"}].map((a,i)=>e.jsxs("rect",{x:(100-a.width)/2,y:a.y,width:a.width,height:"6",rx:"3",fill:"#9CA3AF",opacity:"0.6",children:[e.jsx("animate",{attributeName:"x",values:`${(100-a.width)/2};${(100-a.width)/2+10};${(100-a.width)/2}`,dur:"4s",begin:a.delay,repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"opacity",values:"0.6;0.8;0.6",dur:"3s",begin:a.delay,repeatCount:"indefinite"})]},i))}),re=({size:t=48,className:r="",isDay:a=!0})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 100 100",className:`weather-icon ${r}`,children:[e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"pcSunGrad",cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFD700"}),e.jsx("stop",{offset:"100%",stopColor:"#FFA500"})]}),e.jsxs("radialGradient",{id:"pcMoonGrad",cx:"30%",cy:"30%",r:"70%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFFACD"}),e.jsx("stop",{offset:"100%",stopColor:"#F0E68C"})]}),e.jsxs("linearGradient",{id:"pcCloudGrad",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFFFFF"}),e.jsx("stop",{offset:"100%",stopColor:"#E5E7EB"})]})]}),a?e.jsxs("g",{transform:"translate(55, 20)",children:[[...Array(8)].map((i,o)=>e.jsx("line",{x1:"0",y1:"-18",x2:"0",y2:"-12",stroke:"#FFD700",strokeWidth:"2",strokeLinecap:"round",transform:`rotate(${o*45})`,children:e.jsx("animate",{attributeName:"y1",values:"-18;-16;-18",dur:"1.5s",begin:`${o*.1}s`,repeatCount:"indefinite"})},o)),e.jsx("circle",{r:"10",fill:"url(#pcSunGrad)",children:e.jsx("animate",{attributeName:"r",values:"10;11;10",dur:"2s",repeatCount:"indefinite"})})]}):e.jsxs("g",{transform:"translate(60, 25)",children:[e.jsx("circle",{r:"12",fill:"url(#pcMoonGrad)"}),e.jsx("circle",{cx:"-3",cy:"-2",r:"2",fill:"#DAA520",opacity:"0.3"}),e.jsx("circle",{cx:"4",cy:"3",r:"1.5",fill:"#DAA520",opacity:"0.25"})]}),e.jsxs("g",{transform:"translate(-5, 15)",children:[e.jsx("ellipse",{cx:"45",cy:"55",rx:"25",ry:"14",fill:"url(#pcCloudGrad)",children:e.jsx("animate",{attributeName:"cx",values:"45;48;45",dur:"4s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"32",cy:"50",r:"12",fill:"url(#pcCloudGrad)",children:e.jsx("animate",{attributeName:"cx",values:"32;35;32",dur:"4s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"50",cy:"45",r:"14",fill:"url(#pcCloudGrad)",children:e.jsx("animate",{attributeName:"cx",values:"50;53;50",dur:"4s",repeatCount:"indefinite"})}),e.jsx("circle",{cx:"62",cy:"52",r:"10",fill:"url(#pcCloudGrad)",children:e.jsx("animate",{attributeName:"cx",values:"62;65;62",dur:"4s",repeatCount:"indefinite"})})]})]}),Y=({weatherCode:t,isDay:r=!0,size:a=48,className:i=""})=>t===0?r?e.jsx(it,{size:a,className:i}):e.jsx(nt,{size:a,className:i}):t>=1&&t<=2?e.jsx(re,{size:a,className:i,isDay:r}):t===3?e.jsx(st,{size:a,className:i,dark:!0}):t>=45&&t<=48?e.jsx(lt,{size:a,className:i}):t>=51&&t<=57?e.jsx(H,{size:a,className:i}):t>=61&&t<=67?e.jsx(H,{size:a,className:i,heavy:t>=65}):t>=71&&t<=77?e.jsx(te,{size:a,className:i,heavy:t>=75}):t>=80&&t<=82?e.jsx(H,{size:a,className:i,heavy:t>=81}):t>=85&&t<=86?e.jsx(te,{size:a,className:i,heavy:!0}):t>=95&&t<=99?e.jsx(ot,{size:a,className:i}):e.jsx(re,{size:a,className:i,isDay:r}),ct={es:"Español",en:"English",fr:"Français",de:"Deutsch",pt:"Português"},dt={es:"🇪🇸",en:"🇬🇧",fr:"🇫🇷",de:"🇩🇪",pt:"🇧🇷"},pt={es:{appName:"MeteoFlow",loading:"Cargando...",error:"Error al cargar datos",retry:"Reintentar",searchPlaceholder:"Buscar ciudad...",searchButton:"Buscar",noResults:"No se encontraron resultados",currentWeather:"Tiempo Actual",feelsLike:"Sensación",dewPoint:"Pto. Rocío",humidity:"Humedad",visibility:"Visibilidad",pressure:"Presión",uvIndex:"Índice UV",airQuality:"Calidad Aire",wind:"Viento",uvLow:"Bajo",uvModerate:"Moderado",uvHigh:"Alto",uvVeryHigh:"Muy Alto",uvExtreme:"Extremo",aqiGood:"Buena",aqiFair:"Aceptable",aqiModerate:"Moderada",aqiPoor:"Mala",aqiVeryPoor:"Muy Mala",hourlyForecast:"Pronóstico por Hora",dailyForecast:"Pronóstico Diario",next24Hours:"Próximas 24 horas",next10Days:"Pronóstico 10 días",today:"Hoy",tomorrow:"Mañana",now:"Ahora",atTime:"a las",max:"Max",min:"Min",condition:"Condición",precipitation:"Precipitación",maxWind:"Viento máx.",sunrise:"Amanecer",sunset:"Atardecer",dayLength:"Duración del día",windSpeed:"Velocidad del Viento",gusts:"Ráfagas",windDirection:"Dirección",north:"N",south:"S",east:"E",west:"O",northeast:"NE",northwest:"NO",southeast:"SE",southwest:"SO",alerts:"Alertas",noAlerts:"Sin alertas activas",historicalData:"Datos Históricos",last7Days:"Últimos 7 días",average:"Promedio",settings:"Configuración",language:"Idioma",theme:"Tema",darkMode:"Modo Oscuro",lightMode:"Modo Claro",marine:"Marino",marineConditions:"Condiciones Marinas",waveHeight:"Altura de ola",swellDirection:"Dirección del oleaje",seaTemperature:"Temp. del mar",radar:"Radar",rainRadar:"Radar de Lluvia",past:"Pasado",forecast:"Pronóstico",clearSky:"Despejado",mainlyClear:"Mayormente despejado",partlyCloudy:"Parcialmente nublado",overcast:"Nublado",fog:"Niebla",drizzle:"Llovizna",rain:"Lluvia",heavyRain:"Lluvia intensa",snow:"Nieve",heavySnow:"Nevada intensa",thunderstorm:"Tormenta",unknown:"Desconocido"},en:{appName:"MeteoFlow",loading:"Loading...",error:"Error loading data",retry:"Retry",searchPlaceholder:"Search city...",searchButton:"Search",noResults:"No results found",currentWeather:"Current Weather",feelsLike:"Feels Like",dewPoint:"Dew Point",humidity:"Humidity",visibility:"Visibility",pressure:"Pressure",uvIndex:"UV Index",airQuality:"Air Quality",wind:"Wind",uvLow:"Low",uvModerate:"Moderate",uvHigh:"High",uvVeryHigh:"Very High",uvExtreme:"Extreme",aqiGood:"Good",aqiFair:"Fair",aqiModerate:"Moderate",aqiPoor:"Poor",aqiVeryPoor:"Very Poor",hourlyForecast:"Hourly Forecast",dailyForecast:"Daily Forecast",next24Hours:"Next 24 hours",next10Days:"10-day forecast",today:"Today",tomorrow:"Tomorrow",now:"Now",atTime:"at",max:"Max",min:"Min",condition:"Condition",precipitation:"Precipitation",maxWind:"Max wind",sunrise:"Sunrise",sunset:"Sunset",dayLength:"Day length",windSpeed:"Wind Speed",gusts:"Gusts",windDirection:"Direction",north:"N",south:"S",east:"E",west:"W",northeast:"NE",northwest:"NW",southeast:"SE",southwest:"SW",alerts:"Alerts",noAlerts:"No active alerts",historicalData:"Historical Data",last7Days:"Last 7 days",average:"Average",settings:"Settings",language:"Language",theme:"Theme",darkMode:"Dark Mode",lightMode:"Light Mode",marine:"Marine",marineConditions:"Marine Conditions",waveHeight:"Wave height",swellDirection:"Swell direction",seaTemperature:"Sea temperature",radar:"Radar",rainRadar:"Rain Radar",past:"Past",forecast:"Forecast",clearSky:"Clear sky",mainlyClear:"Mainly clear",partlyCloudy:"Partly cloudy",overcast:"Overcast",fog:"Fog",drizzle:"Drizzle",rain:"Rain",heavyRain:"Heavy rain",snow:"Snow",heavySnow:"Heavy snow",thunderstorm:"Thunderstorm",unknown:"Unknown"},fr:{appName:"MeteoFlow",loading:"Chargement...",error:"Erreur de chargement",retry:"Réessayer",searchPlaceholder:"Rechercher une ville...",searchButton:"Rechercher",noResults:"Aucun résultat",currentWeather:"Météo Actuelle",feelsLike:"Ressenti",dewPoint:"Point de rosée",humidity:"Humidité",visibility:"Visibilité",pressure:"Pression",uvIndex:"Indice UV",airQuality:"Qualité air",wind:"Vent",uvLow:"Faible",uvModerate:"Modéré",uvHigh:"Élevé",uvVeryHigh:"Très élevé",uvExtreme:"Extrême",aqiGood:"Bonne",aqiFair:"Acceptable",aqiModerate:"Modérée",aqiPoor:"Mauvaise",aqiVeryPoor:"Très mauvaise",hourlyForecast:"Prévisions Horaires",dailyForecast:"Prévisions Quotidiennes",next24Hours:"Prochaines 24 heures",next10Days:"Prévisions 10 jours",today:"Aujourd'hui",tomorrow:"Demain",now:"Maintenant",atTime:"à",max:"Max",min:"Min",condition:"Condition",precipitation:"Précipitation",maxWind:"Vent max.",sunrise:"Lever du soleil",sunset:"Coucher du soleil",dayLength:"Durée du jour",windSpeed:"Vitesse du Vent",gusts:"Rafales",windDirection:"Direction",north:"N",south:"S",east:"E",west:"O",northeast:"NE",northwest:"NO",southeast:"SE",southwest:"SO",alerts:"Alertes",noAlerts:"Aucune alerte active",historicalData:"Données Historiques",last7Days:"7 derniers jours",average:"Moyenne",settings:"Paramètres",language:"Langue",theme:"Thème",darkMode:"Mode Sombre",lightMode:"Mode Clair",marine:"Marin",marineConditions:"Conditions Marines",waveHeight:"Hauteur des vagues",swellDirection:"Direction de la houle",seaTemperature:"Temp. de la mer",radar:"Radar",rainRadar:"Radar de Pluie",past:"Passé",forecast:"Prévision",clearSky:"Ciel dégagé",mainlyClear:"Généralement dégagé",partlyCloudy:"Partiellement nuageux",overcast:"Couvert",fog:"Brouillard",drizzle:"Bruine",rain:"Pluie",heavyRain:"Forte pluie",snow:"Neige",heavySnow:"Forte neige",thunderstorm:"Orage",unknown:"Inconnu"},de:{appName:"MeteoFlow",loading:"Laden...",error:"Fehler beim Laden",retry:"Wiederholen",searchPlaceholder:"Stadt suchen...",searchButton:"Suchen",noResults:"Keine Ergebnisse",currentWeather:"Aktuelles Wetter",feelsLike:"Gefühlt",dewPoint:"Taupunkt",humidity:"Feuchtigkeit",visibility:"Sicht",pressure:"Druck",uvIndex:"UV-Index",airQuality:"Luftqualität",wind:"Wind",uvLow:"Niedrig",uvModerate:"Mäßig",uvHigh:"Hoch",uvVeryHigh:"Sehr hoch",uvExtreme:"Extrem",aqiGood:"Gut",aqiFair:"Akzeptabel",aqiModerate:"Mäßig",aqiPoor:"Schlecht",aqiVeryPoor:"Sehr schlecht",hourlyForecast:"Stündliche Vorhersage",dailyForecast:"Tägliche Vorhersage",next24Hours:"Nächste 24 Stunden",next10Days:"10-Tage-Vorhersage",today:"Heute",tomorrow:"Morgen",now:"Jetzt",atTime:"um",max:"Max",min:"Min",condition:"Zustand",precipitation:"Niederschlag",maxWind:"Max. Wind",sunrise:"Sonnenaufgang",sunset:"Sonnenuntergang",dayLength:"Tageslänge",windSpeed:"Windgeschwindigkeit",gusts:"Böen",windDirection:"Richtung",north:"N",south:"S",east:"O",west:"W",northeast:"NO",northwest:"NW",southeast:"SO",southwest:"SW",alerts:"Warnungen",noAlerts:"Keine aktiven Warnungen",historicalData:"Historische Daten",last7Days:"Letzte 7 Tage",average:"Durchschnitt",settings:"Einstellungen",language:"Sprache",theme:"Thema",darkMode:"Dunkelmodus",lightMode:"Hellmodus",marine:"Meer",marineConditions:"Meeresbedingungen",waveHeight:"Wellenhöhe",swellDirection:"Dünung-Richtung",seaTemperature:"Meerestemperatur",radar:"Radar",rainRadar:"Regenradar",past:"Vergangen",forecast:"Vorhersage",clearSky:"Klarer Himmel",mainlyClear:"Überwiegend klar",partlyCloudy:"Teilweise bewölkt",overcast:"Bedeckt",fog:"Nebel",drizzle:"Nieselregen",rain:"Regen",heavyRain:"Starker Regen",snow:"Schnee",heavySnow:"Starker Schneefall",thunderstorm:"Gewitter",unknown:"Unbekannt"},pt:{appName:"MeteoFlow",loading:"Carregando...",error:"Erro ao carregar dados",retry:"Tentar novamente",searchPlaceholder:"Buscar cidade...",searchButton:"Buscar",noResults:"Nenhum resultado encontrado",currentWeather:"Tempo Atual",feelsLike:"Sensação",dewPoint:"Ponto de Orvalho",humidity:"Umidade",visibility:"Visibilidade",pressure:"Pressão",uvIndex:"Índice UV",airQuality:"Qualidade do Ar",wind:"Vento",uvLow:"Baixo",uvModerate:"Moderado",uvHigh:"Alto",uvVeryHigh:"Muito Alto",uvExtreme:"Extremo",aqiGood:"Boa",aqiFair:"Aceitável",aqiModerate:"Moderada",aqiPoor:"Ruim",aqiVeryPoor:"Muito Ruim",hourlyForecast:"Previsão por Hora",dailyForecast:"Previsão Diária",next24Hours:"Próximas 24 horas",next10Days:"Previsão 10 dias",today:"Hoje",tomorrow:"Amanhã",now:"Agora",atTime:"às",max:"Máx",min:"Mín",condition:"Condição",precipitation:"Precipitação",maxWind:"Vento máx.",sunrise:"Nascer do sol",sunset:"Pôr do sol",dayLength:"Duração do dia",windSpeed:"Velocidade do Vento",gusts:"Rajadas",windDirection:"Direção",north:"N",south:"S",east:"L",west:"O",northeast:"NE",northwest:"NO",southeast:"SE",southwest:"SO",alerts:"Alertas",noAlerts:"Sem alertas ativos",historicalData:"Dados Históricos",last7Days:"Últimos 7 dias",average:"Média",settings:"Configurações",language:"Idioma",theme:"Tema",darkMode:"Modo Escuro",lightMode:"Modo Claro",marine:"Marinho",marineConditions:"Condições Marinhas",waveHeight:"Altura das ondas",swellDirection:"Direção da ondulação",seaTemperature:"Temp. do mar",radar:"Radar",rainRadar:"Radar de Chuva",past:"Passado",forecast:"Previsão",clearSky:"Céu limpo",mainlyClear:"Majoritariamente limpo",partlyCloudy:"Parcialmente nublado",overcast:"Nublado",fog:"Nevoeiro",drizzle:"Chuvisco",rain:"Chuva",heavyRain:"Chuva forte",snow:"Neve",heavySnow:"Neve forte",thunderstorm:"Tempestade",unknown:"Desconhecido"}},de=x.createContext(void 0),ae="meteoflow-language",xt=()=>{const t=navigator.language.split("-")[0];return["es","en","fr","de","pt"].includes(t)?t:"es"},ut=({children:t})=>{const[r,a]=x.useState(()=>{const n=localStorage.getItem(ae);return n&&["es","en","fr","de","pt"].includes(n)?n:xt()});x.useEffect(()=>{localStorage.setItem(ae,r),document.documentElement.lang=r},[r]);const o={language:r,setLanguage:n=>{a(n)},t:pt[r],languageNames:ct,languageFlags:dt,availableLanguages:["es","en","fr","de","pt"]};return e.jsx(de.Provider,{value:o,children:t})},F=()=>{const t=x.useContext(de);if(!t)throw new Error("useLanguage must be used within a LanguageProvider");return t},mt=({weather:t,airQuality:r,location:a,lastUpdated:i,lat:o,lon:n})=>{const{t:s}=F(),m=p=>p===0?s.clearSky:p>=1&&p<=2?s.mainlyClear:p===3?s.overcast:p>=45&&p<=48?s.fog:p>=51&&p<=57?s.drizzle:p>=61&&p<=67?p>=65?s.heavyRain:s.rain:p>=71&&p<=77?p>=75?s.heavySnow:s.snow:p>=80&&p<=82?s.rain:p>=85&&p<=86?s.heavySnow:p>=95&&p<=99?s.thunderstorm:s.partlyCloudy,l=(p=>{const d={good:{label:s.aqiGood,color:"#4caf50"},moderate:{label:s.aqiFair,color:"#8bc34a"},"unhealthy-sensitive":{label:s.aqiModerate,color:"#ffeb3b"},unhealthy:{label:s.aqiPoor,color:"#ff9800"},"very-unhealthy":{label:s.aqiVeryPoor,color:"#f44336"},hazardous:{label:s.aqiVeryPoor,color:"#9c27b0"}};return d[p]||d.good})(r.category),h=p=>p<=0?"var(--temp-cold)":p<=10?"var(--temp-cool)":p<=20?"var(--temp-mild)":p<=30?"var(--temp-warm)":"var(--temp-hot)",f=(p=>p<=2?{label:s.uvLow,color:"var(--success)"}:p<=5?{label:s.uvModerate,color:"var(--warning)"}:p<=7?{label:s.uvHigh,color:"#ff6d00"}:p<=10?{label:s.uvVeryHigh,color:"var(--danger)"}:{label:s.uvExtreme,color:"#9c27b0"})(t.uvIndex);return e.jsxs("div",{className:"weather-card",children:[e.jsxs("div",{className:"weather-card-header",children:[e.jsxs("div",{className:"location",children:[e.jsx("h1",{className:"location-name",children:a.name}),e.jsx("p",{className:"location-region",children:[a.region,a.country].filter(Boolean).join(", ")})]}),e.jsxs("div",{className:"status",children:[e.jsx("span",{className:"status-dot"}),e.jsx("span",{className:"status-time",children:V(i)})]})]}),e.jsxs("div",{className:"temperature-main",children:[e.jsx("div",{className:"temperature-display",children:e.jsxs(P,{value:t.temperature,unit:"°C",type:"temperature",title:s.feelsLike,lat:o,lon:n,children:[e.jsx("span",{className:"temperature-value",style:{color:h(t.temperature)},children:Math.round(t.temperature)}),e.jsx("span",{className:"temperature-unit",children:"°C"})]})}),e.jsxs("div",{className:"weather-condition",children:[e.jsx("div",{className:"weather-icon-container",children:e.jsx(Y,{weatherCode:t.weatherCode,isDay:t.isDay,size:90})}),e.jsx("span",{className:"condition-text",children:m(t.weatherCode)})]})]}),e.jsxs("div",{className:"temperature-details",children:[e.jsxs("div",{className:"temp-detail",children:[e.jsx("span",{className:"temp-detail-label",children:s.feelsLike}),e.jsxs("span",{className:"temp-detail-value",style:{color:h(t.apparentTemperature)},children:[Math.round(t.apparentTemperature),"°"]})]}),e.jsxs("div",{className:"temp-detail",children:[e.jsx("span",{className:"temp-detail-label",children:s.dewPoint}),e.jsxs("span",{className:"temp-detail-value",children:[Math.round(t.dewPoint),"°"]})]}),e.jsxs("div",{className:"temp-detail",children:[e.jsx("span",{className:"temp-detail-label",children:s.humidity}),e.jsxs("span",{className:"temp-detail-value",children:[t.humidity,"%"]})]})]}),e.jsxs("div",{className:"metrics-grid",children:[e.jsx(P,{value:t.windSpeed,unit:"km/h",type:"wind",title:s.windSpeed,lat:o,lon:n,className:"metric-clickable",children:e.jsxs("div",{className:"metric",children:[e.jsx("div",{className:"metric-icon",children:e.jsx(ce,{size:16})}),e.jsxs("div",{className:"metric-content",children:[e.jsx("span",{className:"metric-value",children:Math.round(t.windSpeed)}),e.jsx("span",{className:"metric-unit",children:"km/h"}),e.jsx("span",{className:"metric-label",children:U(t.windDirection)})]})]})}),e.jsx(P,{value:t.humidity,unit:"%",type:"humidity",title:s.humidity,lat:o,lon:n,className:"metric-clickable",children:e.jsxs("div",{className:"metric",children:[e.jsx("div",{className:"metric-icon",children:e.jsx(W,{size:16})}),e.jsxs("div",{className:"metric-content",children:[e.jsx("span",{className:"metric-value",children:t.humidity}),e.jsx("span",{className:"metric-unit",children:"%"}),e.jsx("span",{className:"metric-label",children:s.humidity})]})]})}),e.jsxs("div",{className:"metric",children:[e.jsx("div",{className:"metric-icon",children:e.jsx(Ve,{size:16})}),e.jsxs("div",{className:"metric-content",children:[e.jsx("span",{className:"metric-value",children:(t.visibility/1e3).toFixed(0)}),e.jsx("span",{className:"metric-unit",children:"km"}),e.jsx("span",{className:"metric-label",children:s.visibility})]})]}),e.jsxs("div",{className:"metric",children:[e.jsx("div",{className:"metric-icon",style:{background:f.color,color:"white"},children:"UV"}),e.jsxs("div",{className:"metric-content",children:[e.jsx("span",{className:"metric-value",children:Math.round(t.uvIndex)}),e.jsx("span",{className:"metric-label",style:{color:f.color},children:f.label})]})]}),e.jsx(P,{value:t.pressure,unit:"hPa",type:"pressure",title:s.pressure,lat:o,lon:n,className:"metric-clickable",children:e.jsxs("div",{className:"metric",children:[e.jsx("div",{className:"metric-icon pressure-icon",children:e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 6v6l4 2"})]})}),e.jsxs("div",{className:"metric-content",children:[e.jsx("span",{className:"metric-value",children:Math.round(t.pressure)}),e.jsx("span",{className:"metric-unit",children:"hPa"}),e.jsx("span",{className:"metric-label",children:s.pressure})]})]})}),e.jsxs("div",{className:"metric",children:[e.jsx("div",{className:"metric-icon aqi-icon",style:{background:l.color},children:r.aqi??0}),e.jsxs("div",{className:"metric-content",children:[e.jsx("span",{className:"metric-value",style:{color:l.color},children:l.label}),e.jsx("span",{className:"metric-label",children:s.airQuality})]})]})]}),e.jsx("style",{children:`
        .weather-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 3vw, 24px);
          height: 100%;
          min-width: 0;
        }

        .weather-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .location {
          min-width: 0;
          flex: 1;
        }

        .location-name {
          font-size: clamp(18px, 4vw, 22px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .location-region {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: var(--bg-subtle);
          border-radius: 16px;
          flex-shrink: 0;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-time {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .temperature-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .temperature-display {
          display: flex;
          align-items: flex-start;
        }

        .temperature-value {
          font-size: clamp(48px, 15vw, 72px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
        }

        .temperature-unit {
          font-size: clamp(16px, 4vw, 24px);
          font-weight: 500;
          color: var(--text-tertiary);
          margin-top: clamp(8px, 2vw, 12px);
          margin-left: 2px;
        }

        .weather-condition {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
        }

        .weather-icon-container {
          width: 90px;
          height: 90px;
          min-width: 90px;
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          background: var(--bg-subtle);
          padding: 4px;
        }

        .condition-text {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 500;
          color: var(--text-secondary);
          text-align: center;
        }

        .temperature-details {
          display: flex;
          gap: clamp(12px, 4vw, 24px);
          padding: clamp(12px, 3vw, 16px) 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .temp-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 60px;
        }

        .temp-detail-label {
          font-size: clamp(10px, 2.5vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .temp-detail-value {
          font-size: clamp(16px, 4vw, 20px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .metric {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          padding: clamp(10px, 2.5vw, 14px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: var(--transition);
          min-width: 0;
        }

        .metric:hover {
          background: var(--accent-subtle);
        }

        .metric-icon {
          width: clamp(28px, 6vw, 32px);
          height: clamp(28px, 6vw, 32px);
          background: var(--bg-elevated);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .metric-icon.aqi-icon {
          color: white;
          font-size: 9px;
        }

        .metric-content {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 3px;
          min-width: 0;
        }

        .metric-value {
          font-size: clamp(14px, 3.5vw, 18px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .metric-unit {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .metric-label {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .metric-clickable {
          display: contents;
        }

        .metric-clickable .metric {
          cursor: pointer;
          position: relative;
        }

        .metric-clickable .metric::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.6;
        }

        .metric-clickable:hover .metric {
          background: var(--accent-subtle);
        }

        @media (max-width: 400px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .temperature-main {
            flex-direction: column;
            align-items: flex-start;
          }

          .weather-condition {
            flex-direction: row;
            width: 100%;
            justify-content: flex-start;
          }
        }
      `})]})},ht=({hours:t})=>{const[r,a]=x.useState(null),{t:i}=F(),n=[0,3,6,9,12,15,18,21,24,27].map(y=>t[Math.min(y,t.length-1)]).filter(Boolean),s=n.length,m=(y,g)=>g===0?i.now:`${new Date(y).getHours()}:00`,v=y=>{const g=new Date(y).getHours();return g>=7&&g<20},l=n.map(y=>y.temperature),h=Math.min(...l),j=Math.max(...l),f=j-h||1,p=y=>75-(y-h)/f*55,d=y=>5+y/(s-1)*90,c=()=>{const y=n.map((N,M)=>({x:d(M),y:p(N.temperature)}));let g=`M ${y[0].x} ${y[0].y}`;for(let N=1;N<y.length;N++){const M=y[N-1],_=y[N],E=(M.x+_.x)/2;g+=` C ${E} ${M.y}, ${E} ${_.y}, ${_.x} ${_.y}`}return g},b=()=>{const y=c(),g=d(s-1),N=d(0);return`${y} L ${g} 95 L ${N} 95 Z`},u=y=>y<=0?"#2196f3":y<=10?"#00bcd4":y<=20?"#4caf50":y<=30?"#ff9800":"#f44336",w=r!==null?n[r]:null;return e.jsxs("div",{className:"hourly-card",children:[e.jsxs("div",{className:"hourly-header",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"hourly-title",children:i.next24Hours}),e.jsx("p",{className:"hourly-subtitle",children:w?e.jsxs(e.Fragment,{children:[e.jsxs("span",{style:{color:u(w.temperature)},children:[Math.round(w.temperature),"°"]})," ",i.atTime," ",m(w.time,r===0?0:1)]}):e.jsxs(e.Fragment,{children:[i.max," ",Math.round(j),"° · ",i.min," ",Math.round(h),"°"]})})]}),w&&w.precipitationProbability>0&&e.jsxs("div",{className:"rain-badge",children:[e.jsx(W,{size:12}),e.jsxs("span",{children:[w.precipitationProbability,"%"]})]})]}),e.jsxs("div",{className:"chart-and-hours",children:[e.jsxs("div",{className:"chart-container",children:[e.jsxs("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none",className:"temp-chart",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"tempGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"var(--accent)",stopOpacity:"0.3"}),e.jsx("stop",{offset:"100%",stopColor:"var(--accent)",stopOpacity:"0"})]})}),e.jsx("line",{x1:"0",y1:"20",x2:"100",y2:"20",stroke:"var(--border)",strokeWidth:"0.3",strokeDasharray:"2"}),e.jsx("line",{x1:"0",y1:"47",x2:"100",y2:"47",stroke:"var(--border)",strokeWidth:"0.3",strokeDasharray:"2"}),e.jsx("line",{x1:"0",y1:"75",x2:"100",y2:"75",stroke:"var(--border)",strokeWidth:"0.3",strokeDasharray:"2"}),e.jsx("path",{d:b(),fill:"url(#tempGradient)"}),e.jsx("path",{d:c(),fill:"none",stroke:"var(--accent)",strokeWidth:"0.8",strokeLinecap:"round",strokeLinejoin:"round"}),r!==null&&e.jsx("line",{x1:d(r),y1:p(n[r].temperature)+3,x2:d(r),y2:"95",stroke:"var(--accent)",strokeWidth:"0.3",strokeDasharray:"1"}),n.map((y,g)=>e.jsxs("g",{children:[e.jsx("circle",{cx:d(g),cy:p(y.temperature),r:"5",fill:"transparent",style:{cursor:"pointer"},onMouseEnter:()=>a(g),onMouseLeave:()=>a(null),onTouchStart:()=>a(g)}),e.jsx("circle",{cx:d(g),cy:p(y.temperature),r:r===g?2.5:1.5,fill:r===g?u(y.temperature):"var(--bg-elevated)",stroke:r===g?"var(--bg-elevated)":"var(--accent)",strokeWidth:"0.5",style:{transition:"all 0.2s",pointerEvents:"none"}})]},g))]}),e.jsxs("div",{className:"chart-labels",children:[e.jsxs("span",{children:[Math.round(j),"°"]}),e.jsxs("span",{children:[Math.round((j+h)/2),"°"]}),e.jsxs("span",{children:[Math.round(h),"°"]})]})]}),e.jsx("div",{className:"hours-grid",children:n.map((y,g)=>e.jsxs("div",{className:`hour-item ${g===0?"current":""} ${r===g?"selected":""}`,onMouseEnter:()=>a(g),onMouseLeave:()=>a(null),onTouchStart:()=>a(g),children:[e.jsx("span",{className:"hour-time",children:m(y.time,g)}),e.jsx("div",{className:"hour-icon",children:e.jsx(Y,{weatherCode:y.weatherCode,isDay:v(y.time),size:28})}),e.jsxs("span",{className:"hour-temp",style:{color:u(y.temperature)},children:[Math.round(y.temperature),"°"]}),y.precipitationProbability>0&&e.jsxs("div",{className:"hour-rain",children:[e.jsx(W,{size:8}),y.precipitationProbability,"%"]})]},y.time))})]}),e.jsx("style",{children:`
        .hourly-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 16px);
          height: 100%;
          min-width: 0;
          overflow: hidden;
        }

        .hourly-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hourly-title {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .hourly-subtitle {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          margin: 0;
        }

        .rain-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: rgba(33, 150, 243, 0.1);
          color: #2196f3;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
          flex-shrink: 0;
        }

        .chart-and-hours {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .chart-container {
          position: relative;
          height: clamp(80px, 12vw, 100px);
          width: 100%;
        }

        .temp-chart {
          width: 100%;
          height: 100%;
          display: block;
        }

        .chart-labels {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 15% 0 22%;
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
          background: linear-gradient(90deg, transparent, var(--bg-elevated) 40%);
          padding-left: 16px;
          padding-right: 4px;
        }

        .hours-grid {
          display: grid;
          grid-template-columns: repeat(${s}, 1fr);
          gap: 4px;
          padding-top: 8px;
        }

        .hour-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: clamp(8px, 2vw, 12px) 4px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          min-width: 0;
        }

        .hour-item:hover,
        .hour-item.selected {
          background: var(--accent-subtle);
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .hour-item.current {
          background: linear-gradient(135deg, var(--accent) 0%, #4a90d9 100%);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .hour-item.current .hour-time,
        .hour-item.current .hour-temp {
          color: white !important;
        }

        .hour-item.current .hour-rain {
          background: rgba(255,255,255,0.25);
          color: white;
        }

        .hour-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hour-time {
          font-size: clamp(9px, 2vw, 11px);
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .hour-temp {
          font-size: clamp(12px, 3vw, 15px);
          font-weight: 700;
        }

        .hour-rain {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: clamp(7px, 1.8vw, 9px);
          color: #2196f3;
          background: rgba(33, 150, 243, 0.1);
          padding: 2px 4px;
          border-radius: 4px;
        }

        @media (max-width: 600px) {
          .hours-grid {
            grid-template-columns: repeat(5, 1fr);
          }

          .hour-item:nth-child(n+6) {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .hour-item {
            padding: 6px 2px;
          }

          .hour-icon {
            width: 24px;
            height: 24px;
          }
        }

        @media (hover: none) {
          .hour-item:hover {
            background: var(--bg-subtle);
            transform: none;
            box-shadow: none;
          }

          .hour-item.selected {
            background: var(--accent-subtle);
            transform: translateY(-2px);
          }

          .hour-item.current:hover {
            background: linear-gradient(135deg, var(--accent) 0%, #4a90d9 100%);
          }
        }
      `})]})},gt=({days:t})=>{const[r,a]=x.useState(null),{t:i}=F(),o=t.flatMap(c=>[c.temperatureMin,c.temperatureMax]),n=Math.min(...o),s=Math.max(...o),m=s-n||1,v=c=>c===0?i.clearSky:c>=1&&c<=2?i.mainlyClear:c===3?i.overcast:c>=45&&c<=48?i.fog:c>=51&&c<=57?i.drizzle:c>=61&&c<=67?c>=65?i.heavyRain:i.rain:c>=71&&c<=77?c>=75?i.heavySnow:i.snow:c>=80&&c<=82?i.rain:c>=85&&c<=86?i.heavySnow:c>=95&&c<=99?i.thunderstorm:i.partlyCloudy,l=(c,b)=>b===0?i.today:b===1?i.tomorrow:Q(c,{weekday:"short"}),h=c=>Q(c,{day:"numeric",month:"short"}),j=(c,b)=>{const u=(c-n)/m*100,w=100-(b-n)/m*100;return{left:`${u}%`,right:`${w}%`}},f=c=>c<=0?"#2196f3":c<=10?"#00bcd4":c<=20?"#4caf50":c<=30?"#ff9800":"#f44336",p=(c,b)=>`linear-gradient(90deg, ${f(c)}, ${f(b)})`,d=c=>{a(r===c?null:c)};return e.jsxs("div",{className:"daily-card",children:[e.jsxs("div",{className:"daily-header",children:[e.jsx("h3",{className:"daily-title",children:i.next10Days}),e.jsxs("div",{className:"temp-range-legend",children:[e.jsxs("span",{children:[Math.round(n),"°"]}),e.jsx("div",{className:"legend-bar"}),e.jsxs("span",{children:[Math.round(s),"°"]})]})]}),e.jsx("div",{className:"days-container",children:t.map((c,b)=>{var w;const u=r===b;return e.jsxs("div",{className:`day-item ${b===0?"today":""} ${u?"expanded":""}`,onClick:()=>d(b),children:[e.jsxs("div",{className:"day-main",children:[e.jsxs("div",{className:"day-left",children:[e.jsx("span",{className:"day-name",children:l(c.date,b)}),e.jsx("span",{className:"day-date",children:h(c.date)})]}),e.jsxs("div",{className:"day-icon",children:[e.jsx(Y,{weatherCode:c.weatherCode,size:40}),c.precipitationProbability>0&&e.jsxs("span",{className:"day-precip",children:[e.jsx(W,{size:10}),c.precipitationProbability,"%"]})]}),e.jsxs("div",{className:"day-temps",children:[e.jsxs("span",{className:"temp-min",style:{color:f(c.temperatureMin)},children:[Math.round(c.temperatureMin),"°"]}),e.jsxs("div",{className:"temp-bar-wrapper",children:[e.jsx("div",{className:"temp-bar-bg"}),e.jsx("div",{className:"temp-bar-fill",style:{...j(c.temperatureMin,c.temperatureMax),background:p(c.temperatureMin,c.temperatureMax)}})]}),e.jsxs("span",{className:"temp-max",style:{color:f(c.temperatureMax)},children:[Math.round(c.temperatureMax),"°"]})]}),e.jsx("div",{className:"day-expand",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",style:{transform:u?"rotate(180deg)":"rotate(0deg)",transition:"0.2s"},children:e.jsx("path",{d:"M4 6l4 4 4-4"})})})]}),u&&e.jsx("div",{className:"day-details",children:e.jsxs("div",{className:"detail-grid",children:[e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:i.condition}),e.jsx("span",{className:"detail-value",children:v(c.weatherCode)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:i.precipitation}),e.jsxs("span",{className:"detail-value",children:[((w=c.precipitationSum)==null?void 0:w.toFixed(1))??0," mm"]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:i.maxWind}),e.jsxs("span",{className:"detail-value",children:[e.jsx(ce,{size:12}),Math.round(c.windSpeedMax??0)," km/h"]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:i.uvIndex}),e.jsx("span",{className:"detail-value",children:Math.round(c.uvIndexMax??0)})]})]})})]},c.date)})}),e.jsx("style",{children:`
        .daily-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(16px, 4vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 20px);
          min-width: 0;
          overflow: hidden;
        }

        .daily-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .daily-title {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .temp-range-legend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .legend-bar {
          width: clamp(40px, 10vw, 60px);
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, #2196f3, #00bcd4, #4caf50, #ff9800, #f44336);
        }

        .days-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .day-item {
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          overflow: hidden;
        }

        .day-item:hover {
          background: var(--bg-subtle);
        }

        .day-item.today {
          background: var(--accent-subtle);
        }

        .day-item.expanded {
          background: var(--bg-subtle);
        }

        .day-main {
          display: grid;
          grid-template-columns: minmax(60px, 90px) 50px 1fr 20px;
          align-items: center;
          gap: clamp(8px, 2vw, 16px);
          padding: clamp(10px, 2.5vw, 14px) clamp(10px, 2.5vw, 16px);
        }

        .day-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .day-name {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .day-date {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
        }

        .day-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          color: var(--accent);
          width: 45px;
          min-width: 45px;
        }

        .day-precip {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: clamp(8px, 2vw, 10px);
          color: #2196f3;
          font-weight: 500;
        }

        .day-temps {
          display: flex;
          align-items: center;
          gap: clamp(6px, 2vw, 12px);
          min-width: 0;
        }

        .temp-min,
        .temp-max {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          width: clamp(28px, 7vw, 36px);
          flex-shrink: 0;
        }

        .temp-min {
          text-align: right;
        }

        .temp-bar-wrapper {
          flex: 1;
          height: 5px;
          position: relative;
          min-width: clamp(40px, 15vw, 80px);
        }

        .temp-bar-bg {
          position: absolute;
          inset: 0;
          background: var(--border);
          border-radius: 3px;
        }

        .temp-bar-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .day-expand {
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .day-details {
          padding: 0 clamp(10px, 2.5vw, 16px) clamp(10px, 2.5vw, 16px);
          border-top: 1px solid var(--border);
          padding-top: clamp(10px, 2.5vw, 12px);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
        }

        .detail-value {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 500;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .detail-value svg {
          color: var(--accent);
        }

        @media (max-width: 480px) {
          .day-main {
            grid-template-columns: minmax(50px, 70px) 40px 1fr 16px;
          }

          .temp-range-legend {
            display: none;
          }

          .day-precip {
            display: none;
          }
        }

        @media (hover: none) {
          .day-item:hover {
            background: transparent;
          }

          .day-item.today:hover {
            background: var(--accent-subtle);
          }

          .day-item.expanded:hover {
            background: var(--bg-subtle);
          }
        }
      `})]})},vt=()=>e.jsx("style",{children:`
    .info-card {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: clamp(16px, 4vw, 24px);
      display: flex;
      flex-direction: column;
      gap: clamp(14px, 3vw, 20px);
      min-width: 0;
      overflow: hidden;
    }

    .info-card-header {
      display: flex;
      align-items: center;
      gap: clamp(10px, 2.5vw, 14px);
      flex-wrap: wrap;
    }

    .info-card-icon {
      width: clamp(32px, 8vw, 40px);
      height: clamp(32px, 8vw, 40px);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-subtle);
      color: var(--accent);
      flex-shrink: 0;
    }

    .info-card-title {
      font-size: clamp(14px, 3.5vw, 16px);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .info-card-subtitle {
      font-size: clamp(10px, 2.5vw, 12px);
      color: var(--text-tertiary);
      font-weight: 500;
    }

    .info-card-content {
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3vw, 16px);
    }
  `}),ft=({airQuality:t})=>{const r=Se[t.category],a=[{name:"PM2.5",value:t.pm25??0,unit:"µg/m³",max:50,desc:"Partículas finas"},{name:"PM10",value:t.pm10??0,unit:"µg/m³",max:100,desc:"Partículas gruesas"},{name:"NO₂",value:t.no2??0,unit:"µg/m³",max:200,desc:"Dióxido nitrógeno"},{name:"O₃",value:t.o3??0,unit:"µg/m³",max:180,desc:"Ozono"},{name:"SO₂",value:t.so2??0,unit:"µg/m³",max:350,desc:"Dióxido azufre"},{name:"CO",value:t.co??0,unit:"µg/m³",max:1e4,desc:"Monóxido carbono"}],i=(o,n)=>{const s=o/n;return s<=.25?"#22c55e":s<=.5?"#eab308":s<=.75?"#f97316":"#ef4444"};return e.jsxs("div",{className:"info-card aqi-card",children:[e.jsxs("div",{className:"info-card-header",children:[e.jsx("div",{className:"info-card-icon",style:{background:`${r.color}20`,color:r.color},children:e.jsx(Ke,{size:20})}),e.jsxs("div",{children:[e.jsx("h4",{className:"info-card-title",children:"Calidad del Aire"}),e.jsx("span",{className:"info-card-subtitle",children:"Índice AQI Europeo"})]})]}),e.jsxs("div",{className:"info-card-content",children:[e.jsxs("div",{className:"aqi-main",children:[e.jsx("div",{className:"aqi-value",style:{backgroundColor:r.color},children:t.aqi??0}),e.jsxs("div",{className:"aqi-info",children:[e.jsx("span",{className:"aqi-status",style:{color:r.color},children:r.label}),e.jsxs("span",{className:"aqi-desc",children:[r.label==="Buena"&&"Ideal para actividades al aire libre",r.label==="Moderada"&&"Aceptable para la mayoría de personas",r.label==="Desfavorable"&&"Grupos sensibles pueden verse afectados",r.label==="Mala"&&"Evite actividades intensas al exterior",r.label==="Muy mala"&&"Permanezca en interiores si es posible"]})]})]}),e.jsxs("div",{className:"aqi-scale",children:[e.jsx("div",{className:"aqi-scale-bar",children:e.jsx("div",{className:"aqi-scale-marker",style:{left:`${Math.min(t.aqi??0,100)}%`}})}),e.jsxs("div",{className:"aqi-scale-labels",children:[e.jsx("span",{children:"Buena"}),e.jsx("span",{children:"Moderada"}),e.jsx("span",{children:"Mala"})]})]}),e.jsx("div",{className:"pollutants-grid",children:a.map(o=>e.jsxs("div",{className:"pollutant-item",children:[e.jsxs("div",{className:"pollutant-header",children:[e.jsx("span",{className:"pollutant-name",children:o.name}),e.jsx("span",{className:"pollutant-value",children:o.value.toFixed(1)})]}),e.jsx("div",{className:"pollutant-bar-container",children:e.jsx("div",{className:"pollutant-bar",style:{width:`${Math.min(o.value/o.max*100,100)}%`,backgroundColor:i(o.value,o.max)}})})]},o.name))})]}),e.jsx("style",{children:`
        .aqi-main {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 16px);
          flex-wrap: wrap;
        }

        .aqi-value {
          width: clamp(52px, 12vw, 64px);
          height: clamp(52px, 12vw, 64px);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(18px, 4.5vw, 24px);
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .aqi-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }

        .aqi-status {
          font-size: clamp(15px, 3.5vw, 18px);
          font-weight: 600;
        }

        .aqi-desc {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          line-height: 1.4;
        }

        .aqi-scale {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .aqi-scale-bar {
          height: clamp(6px, 1.5vw, 8px);
          background: linear-gradient(90deg, #22c55e 0%, #eab308 33%, #f97316 66%, #ef4444 100%);
          border-radius: 4px;
          position: relative;
        }

        .aqi-scale-marker {
          position: absolute;
          top: -4px;
          width: 4px;
          height: clamp(12px, 3vw, 16px);
          background: var(--text-primary);
          border-radius: 2px;
          transform: translateX(-50%);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .aqi-scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .pollutant-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: clamp(10px, 2.5vw, 12px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .pollutant-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }

        .pollutant-name {
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: 600;
          color: var(--text-secondary);
        }

        .pollutant-value {
          font-size: clamp(11px, 2.5vw, 13px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .pollutant-bar-container {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .pollutant-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      `})]})},bt=({today:t,weather:r,lat:a=0,lon:i=0})=>{const o=new Date(t.sunrise),n=new Date(t.sunset),s=new Date,m=n.getTime()-o.getTime(),v=s.getTime()-o.getTime(),l=Math.max(0,Math.min(100,v/m*100)),h=Math.floor(m/(1e3*60*60)),j=Math.floor(m%(1e3*60*60)/(1e3*60)),f=c=>c<=2?"Bajo":c<=5?"Moderado":c<=7?"Alto":c<=10?"Muy alto":"Extremo",p=c=>c<=2?"#22c55e":c<=5?"#eab308":c<=7?"#f97316":c<=10?"#ef4444":"#a855f7",d=c=>c<=2?"No se requiere protección":c<=5?"Use protección solar":c<=7?"Protección solar necesaria":c<=10?"Evite exposición prolongada":"Evite salir al sol";return e.jsxs("div",{className:"info-card sun-card",children:[e.jsxs("div",{className:"info-card-header",children:[e.jsx("div",{className:"info-card-icon",children:e.jsx(J,{size:20})}),e.jsxs("div",{children:[e.jsx("h4",{className:"info-card-title",children:"Sol y UV"}),e.jsxs("span",{className:"info-card-subtitle",children:[h,"h ",j,"m de luz solar"]})]})]}),e.jsxs("div",{className:"info-card-content",children:[e.jsx("div",{className:"sun-arc-container",children:e.jsxs("svg",{viewBox:"0 0 200 110",className:"sun-arc",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"arcGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"#ff9800",stopOpacity:"0.3"}),e.jsx("stop",{offset:"50%",stopColor:"#ffc107"}),e.jsx("stop",{offset:"100%",stopColor:"#ff9800",stopOpacity:"0.3"})]})}),e.jsx("path",{d:"M 10 100 A 90 90 0 0 1 190 100",fill:"none",stroke:"var(--border)",strokeWidth:"3",strokeLinecap:"round"}),e.jsx("path",{d:"M 10 100 A 90 90 0 0 1 190 100",fill:"none",stroke:"url(#arcGradient)",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:`${l/100*283} 283`}),l>0&&l<100&&e.jsxs("g",{children:[e.jsx("circle",{cx:10+180*l/100,cy:100-Math.sin(l/100*Math.PI)*85,r:"12",fill:"#ffc107"}),e.jsx("circle",{cx:10+180*l/100,cy:100-Math.sin(l/100*Math.PI)*85,r:"16",fill:"#ffc107",opacity:"0.3"})]}),e.jsx("line",{x1:"10",y1:"100",x2:"10",y2:"105",stroke:"var(--text-tertiary)",strokeWidth:"2"}),e.jsx("line",{x1:"190",y1:"100",x2:"190",y2:"105",stroke:"var(--text-tertiary)",strokeWidth:"2"})]})}),e.jsxs("div",{className:"sun-times",children:[e.jsxs("div",{className:"sun-time-item",children:[e.jsx("div",{className:"sun-time-icon sunrise",children:e.jsx(J,{size:18})}),e.jsxs("div",{className:"sun-time-info",children:[e.jsx("span",{className:"sun-time-label",children:"Amanecer"}),e.jsx("span",{className:"sun-time-value",children:V(t.sunrise)})]})]}),e.jsxs("div",{className:"sun-time-item",children:[e.jsx("div",{className:"sun-time-icon sunset",children:e.jsx(qe,{size:18})}),e.jsxs("div",{className:"sun-time-info",children:[e.jsx("span",{className:"sun-time-label",children:"Atardecer"}),e.jsx("span",{className:"sun-time-value",children:V(t.sunset)})]})]})]}),e.jsxs("div",{className:"uv-section",children:[e.jsxs("div",{className:"uv-main",children:[e.jsx(P,{value:r.uvIndex,unit:"",type:"uv",title:"Índice UV",lat:a,lon:i,className:"uv-clickable",children:e.jsxs("div",{className:"uv-circle",style:{borderColor:p(r.uvIndex)},children:[e.jsx("span",{className:"uv-value",style:{color:p(r.uvIndex)},children:Math.round(r.uvIndex)}),e.jsx("span",{className:"uv-label",children:"UV"})]})}),e.jsxs("div",{className:"uv-info",children:[e.jsx("span",{className:"uv-level",style:{color:p(r.uvIndex)},children:f(r.uvIndex)}),e.jsx("span",{className:"uv-advice",children:d(r.uvIndex)})]})]}),e.jsxs("div",{className:"uv-bar-container",children:[e.jsxs("div",{className:"uv-bar-scale",children:[e.jsx("span",{children:"0"}),e.jsx("span",{children:"3"}),e.jsx("span",{children:"6"}),e.jsx("span",{children:"9"}),e.jsx("span",{children:"11+"})]}),e.jsx("div",{className:"uv-bar-track",children:e.jsx("div",{className:"uv-bar-marker",style:{left:`${Math.min(r.uvIndex/11*100,100)}%`}})})]})]})]}),e.jsx("style",{children:`
        .sun-arc-container {
          width: 100%;
          max-width: min(220px, 60vw);
          margin: 0 auto;
        }

        .sun-arc {
          width: 100%;
          height: auto;
        }

        .sun-times {
          display: flex;
          justify-content: space-between;
          gap: clamp(8px, 2vw, 16px);
          flex-wrap: wrap;
        }

        .sun-time-item {
          display: flex;
          align-items: center;
          gap: clamp(8px, 2vw, 12px);
          flex: 1;
          min-width: min(100%, 140px);
          padding: clamp(10px, 2.5vw, 12px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .sun-time-icon {
          width: clamp(30px, 7vw, 36px);
          height: clamp(30px, 7vw, 36px);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sun-time-icon.sunrise {
          background: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .sun-time-icon.sunset {
          background: rgba(233, 30, 99, 0.15);
          color: #e91e63;
        }

        .sun-time-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .sun-time-label {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
        }

        .sun-time-value {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .uv-section {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 2.5vw, 12px);
          padding: clamp(12px, 3vw, 16px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .uv-main {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 16px);
          flex-wrap: wrap;
        }

        .uv-circle {
          width: clamp(48px, 12vw, 56px);
          height: clamp(48px, 12vw, 56px);
          border-radius: 50%;
          border: 3px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .uv-value {
          font-size: clamp(16px, 4vw, 20px);
          font-weight: 700;
          line-height: 1;
        }

        .uv-label {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .uv-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }

        .uv-level {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
        }

        .uv-advice {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
        }

        .uv-bar-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .uv-bar-scale {
          display: flex;
          justify-content: space-between;
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .uv-bar-track {
          height: clamp(5px, 1.5vw, 6px);
          background: linear-gradient(90deg, #22c55e 0%, #eab308 27%, #f97316 55%, #ef4444 82%, #a855f7 100%);
          border-radius: 3px;
          position: relative;
        }

        .uv-bar-marker {
          position: absolute;
          top: -3px;
          width: 4px;
          height: clamp(10px, 2.5vw, 12px);
          background: var(--text-primary);
          border-radius: 2px;
          transform: translateX(-50%);
        }

        .uv-clickable .uv-circle {
          cursor: pointer;
          transition: all 0.2s;
        }

        .uv-clickable:hover .uv-circle {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `})]})},yt=({weather:t,lat:r=0,lon:a=0})=>{const i=U(t.windDirection),n=(s=>s<12?{label:"Calmado",color:"#22c55e"}:s<20?{label:"Brisa",color:"#4caf50"}:s<30?{label:"Moderado",color:"#ff9800"}:s<50?{label:"Fuerte",color:"#f97316"}:{label:"Muy fuerte",color:"#ef4444"})(t.windSpeed);return e.jsxs("div",{className:"info-card wind-card",children:[e.jsxs("div",{className:"info-card-header",children:[e.jsx("div",{className:"info-card-icon",children:e.jsx(Ue,{size:20})}),e.jsxs("div",{children:[e.jsx("h4",{className:"info-card-title",children:"Viento"}),e.jsx("span",{className:"info-card-subtitle",children:n.label})]})]}),e.jsxs("div",{className:"info-card-content",children:[e.jsxs("div",{className:"wind-compass",children:[e.jsxs("div",{className:"compass-ring",children:[e.jsx("span",{className:"compass-direction n",children:"N"}),e.jsx("span",{className:"compass-direction e",children:"E"}),e.jsx("span",{className:"compass-direction s",children:"S"}),e.jsx("span",{className:"compass-direction w",children:"O"}),e.jsx("div",{className:"compass-ticks",children:[...Array(36)].map((s,m)=>e.jsx("div",{className:"compass-tick",style:{transform:`rotate(${m*10}deg)`}},m))}),e.jsx("div",{className:"compass-needle",style:{transform:`rotate(${t.windDirection}deg)`},children:e.jsx("div",{className:"needle-body"})})]}),e.jsx(P,{value:t.windSpeed,unit:"km/h",type:"wind",title:"Velocidad del Viento",lat:r,lon:a,className:"wind-speed-clickable",children:e.jsxs("div",{className:"wind-speed-center",children:[e.jsx("span",{className:"wind-speed-value",children:Math.round(t.windSpeed)}),e.jsx("span",{className:"wind-speed-unit",children:"km/h"})]})})]}),e.jsxs("div",{className:"wind-stats",children:[e.jsxs("div",{className:"wind-stat",children:[e.jsx("span",{className:"wind-stat-label",children:"Dirección"}),e.jsx("span",{className:"wind-stat-value",children:i}),e.jsxs("span",{className:"wind-stat-extra",children:[t.windDirection,"°"]})]}),e.jsxs("div",{className:"wind-stat",children:[e.jsx("span",{className:"wind-stat-label",children:"Ráfagas"}),e.jsx("span",{className:"wind-stat-value",children:Math.round(t.windGusts)}),e.jsx("span",{className:"wind-stat-extra",children:"km/h"})]}),e.jsxs("div",{className:"wind-stat",children:[e.jsx("span",{className:"wind-stat-label",children:"Intensidad"}),e.jsx("span",{className:"wind-stat-value",style:{color:n.color},children:n.label})]})]})]}),e.jsx("style",{children:`
        .wind-compass {
          position: relative;
          width: clamp(120px, 35vw, 160px);
          height: clamp(120px, 35vw, 160px);
          margin: 0 auto;
        }

        .compass-ring {
          position: absolute;
          inset: 0;
          border: 2px solid var(--border);
          border-radius: 50%;
          background: var(--bg-subtle);
        }

        .compass-ticks {
          position: absolute;
          inset: 8px;
        }

        .compass-tick {
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 6px;
          background: var(--border);
          transform-origin: 50% calc(clamp(60px, 17.5vw, 80px) - 8px);
        }

        .compass-tick:nth-child(9n) {
          height: 10px;
          background: var(--text-tertiary);
        }

        .compass-direction {
          position: absolute;
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: 600;
          color: var(--text-secondary);
        }

        .compass-direction.n { top: 10px; left: 50%; transform: translateX(-50%); }
        .compass-direction.e { right: 10px; top: 50%; transform: translateY(-50%); }
        .compass-direction.s { bottom: 10px; left: 50%; transform: translateX(-50%); }
        .compass-direction.w { left: 10px; top: 50%; transform: translateY(-50%); }

        .compass-needle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: clamp(40px, 12vw, 56px);
          margin-left: -3px;
          margin-top: clamp(-40px, -12vw, -56px);
          transform-origin: 50% 100%;
          transition: transform 0.5s ease;
        }

        .needle-body {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: clamp(40px, 12vw, 56px) solid var(--accent);
          margin-left: -3px;
        }

        .wind-speed-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-elevated);
          padding: clamp(10px, 3vw, 16px);
          border-radius: 50%;
          width: clamp(52px, 16vw, 72px);
          height: clamp(52px, 16vw, 72px);
          justify-content: center;
          border: 2px solid var(--border);
        }

        .wind-speed-value {
          font-size: clamp(16px, 4.5vw, 22px);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .wind-speed-unit {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .wind-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 80px), 1fr));
          gap: clamp(8px, 2vw, 12px);
        }

        .wind-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: clamp(10px, 2.5vw, 12px) clamp(6px, 1.5vw, 8px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .wind-stat-label {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
          text-align: center;
        }

        .wind-stat-value {
          font-size: clamp(13px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
        }

        .wind-stat-extra {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
        }

        .wind-speed-clickable {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .wind-speed-clickable .wind-speed-center {
          cursor: pointer;
          transition: all 0.2s;
        }

        .wind-speed-clickable:hover .wind-speed-center {
          background: var(--accent-subtle);
          border-color: var(--accent);
        }
      `})]})},wt=({marine:t})=>{const r=t.waveHeight??0,a=t.wavePeriod??0,i=t.waveDirection??0,o=t.swellHeight??0,n=t.seaTemperature??0,s=U(i),v=(l=>l<.5?{label:"Calma",color:"#22c55e"}:l<1?{label:"Mar rizada",color:"#4caf50"}:l<1.5?{label:"Marejadilla",color:"#ff9800"}:l<2.5?{label:"Marejada",color:"#f97316"}:l<4?{label:"Fuerte marejada",color:"#ef4444"}:{label:"Mar gruesa",color:"#ef4444"})(r);return e.jsxs("div",{className:"info-card marine-card",children:[e.jsxs("div",{className:"info-card-header",children:[e.jsx("div",{className:"info-card-icon",style:{background:"rgba(33, 150, 243, 0.15)",color:"#2196f3"},children:e.jsx(Qe,{size:20})}),e.jsxs("div",{children:[e.jsx("h4",{className:"info-card-title",children:"Condiciones Marinas"}),e.jsx("span",{className:"info-card-subtitle",style:{color:v.color},children:v.label})]})]}),e.jsxs("div",{className:"info-card-content",children:[e.jsxs("div",{className:"marine-main",children:[e.jsxs("div",{className:"wave-display",children:[e.jsx("span",{className:"wave-height",children:r.toFixed(1)}),e.jsx("span",{className:"wave-unit",children:"m"})]}),e.jsx("div",{className:"wave-info",children:e.jsxs("div",{className:"wave-direction-indicator",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor",strokeWidth:"2",style:{transform:`rotate(${i}deg)`},children:e.jsx("path",{d:"M12 19V5M5 12l7-7 7 7"})}),e.jsxs("span",{children:["Desde ",s]})]})})]}),e.jsxs("div",{className:"marine-grid",children:[e.jsxs("div",{className:"marine-stat",children:[e.jsxs("span",{className:"marine-stat-value",children:[a.toFixed(1),e.jsx("span",{className:"marine-stat-unit",children:"s"})]}),e.jsx("span",{className:"marine-stat-label",children:"Período"})]}),e.jsxs("div",{className:"marine-stat",children:[e.jsxs("span",{className:"marine-stat-value",children:[o.toFixed(1),e.jsx("span",{className:"marine-stat-unit",children:"m"})]}),e.jsx("span",{className:"marine-stat-label",children:"Oleaje fondo"})]}),n>0&&e.jsxs("div",{className:"marine-stat",children:[e.jsxs("span",{className:"marine-stat-value",children:[n.toFixed(0),e.jsx("span",{className:"marine-stat-unit",children:"°C"})]}),e.jsx("span",{className:"marine-stat-label",children:"Temp. mar"})]}),e.jsxs("div",{className:"marine-stat",children:[e.jsxs("span",{className:"marine-stat-value",children:[i,e.jsx("span",{className:"marine-stat-unit",children:"°"})]}),e.jsx("span",{className:"marine-stat-label",children:"Dirección"})]})]}),e.jsx("div",{className:"wave-animation",children:e.jsxs("svg",{viewBox:"0 0 400 60",preserveAspectRatio:"none",className:"wave-svg",children:[e.jsx("path",{className:"wave-path wave-1",d:"M0,30 Q25,10 50,30 T100,30 T150,30 T200,30 T250,30 T300,30 T350,30 T400,30 V60 H0 Z"}),e.jsx("path",{className:"wave-path wave-2",d:"M0,35 Q25,15 50,35 T100,35 T150,35 T200,35 T250,35 T300,35 T350,35 T400,35 V60 H0 Z"}),e.jsx("path",{className:"wave-path wave-3",d:"M0,40 Q25,20 50,40 T100,40 T150,40 T200,40 T250,40 T300,40 T350,40 T400,40 V60 H0 Z"})]})})]}),e.jsx("style",{children:`
        .marine-main {
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 20px);
          padding: clamp(12px, 3vw, 16px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }

        .wave-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .wave-height {
          font-size: clamp(28px, 8vw, 42px);
          font-weight: 700;
          color: #2196f3;
          line-height: 1;
        }

        .wave-unit {
          font-size: clamp(14px, 3.5vw, 18px);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .wave-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }

        .wave-direction-indicator {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1.5vw, 8px);
          font-size: clamp(12px, 3vw, 14px);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .wave-direction-indicator svg {
          color: #2196f3;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .marine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 70px), 1fr));
          gap: clamp(6px, 1.5vw, 8px);
        }

        .marine-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: clamp(10px, 2.5vw, 12px) clamp(6px, 1.5vw, 8px);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
        }

        .marine-stat-value {
          font-size: clamp(14px, 3.5vw, 18px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .marine-stat-unit {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          font-weight: 400;
          margin-left: 2px;
        }

        .marine-stat-label {
          font-size: clamp(8px, 2vw, 10px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 500;
          text-align: center;
          white-space: nowrap;
        }

        .wave-animation {
          height: clamp(40px, 10vw, 50px);
          overflow: hidden;
          border-radius: var(--radius-md);
          background: linear-gradient(180deg, var(--bg-subtle) 0%, rgba(33, 150, 243, 0.1) 100%);
        }

        .wave-svg {
          width: 200%;
          height: 100%;
          animation: waveMove 4s linear infinite;
        }

        .wave-path {
          fill: rgba(33, 150, 243, 0.2);
        }

        .wave-path.wave-2 {
          fill: rgba(33, 150, 243, 0.15);
          animation: waveMove2 5s linear infinite;
        }

        .wave-path.wave-3 {
          fill: rgba(33, 150, 243, 0.1);
          animation: waveMove3 6s linear infinite;
        }

        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes waveMove2 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(-75%); }
        }

        @keyframes waveMove3 {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(-60%); }
        }
      `})]})},jt=async(t,r,a=500,i=4,o=7)=>{try{const n=new Date().toISOString(),s=new Date(Date.now()-o*24*60*60*1e3).toISOString(),m=new URLSearchParams({format:"geojson",starttime:s,endtime:n,latitude:t.toString(),longitude:r.toString(),maxradiuskm:a.toString(),minmagnitude:i.toString(),orderby:"magnitude",limit:"20"}),v=await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${m}`);if(!v.ok)throw new Error("USGS API error");return(await v.json()).features.map(h=>{const[j,f]=h.geometry.coordinates,p=Dt(t,r,f,j);let d="info";return h.properties.mag>=7?d="extreme":h.properties.mag>=6?d="severe":h.properties.mag>=5?d="moderate":h.properties.mag>=4&&(d="minor"),{id:`eq_${h.id}`,type:h.properties.tsunami?"tsunami":"earthquake",severity:d,title:`Terremoto M${h.properties.mag.toFixed(1)}`,description:h.properties.place,location:h.properties.place,coordinates:{lat:f,lon:j},startTime:new Date(h.properties.time).toISOString(),source:"USGS",url:h.properties.url,magnitude:h.properties.mag,distance:Math.round(p)}})}catch(n){return console.error("Error fetching earthquakes:",n),[]}},kt=t=>{switch(t.toLowerCase()){case"extreme":return"extreme";case"severe":return"severe";case"moderate":return"moderate";case"minor":return"minor";default:return"info"}},Nt=t=>{const r=t.toLowerCase();return r.includes("tornado")?"tornado":r.includes("hurricane")||r.includes("tropical")?"hurricane":r.includes("typhoon")?"typhoon":r.includes("tsunami")?"tsunami":r.includes("flood")?"flood":r.includes("storm")||r.includes("thunder")?"storm":r.includes("fire")||r.includes("wildfire")?"wildfire":r.includes("volcano")?"volcano":r.includes("heat")?"extreme_heat":r.includes("cold")||r.includes("freeze")||r.includes("frost")?"extreme_cold":r.includes("wind")?"wind":r.includes("snow")||r.includes("blizzard")||r.includes("ice")?"snow":r.includes("rain")?"rain":"other"},Mt=async(t,r)=>{var a,i;try{const o=await fetch(`https://api.weather.gov/points/${t.toFixed(4)},${r.toFixed(4)}`,{headers:{"User-Agent":"MeteoFlow Weather App"}});if(!o.ok)return[];const s=(i=(a=(await o.json()).properties)==null?void 0:a.forecastZone)==null?void 0:i.split("/").pop();if(!s)return[];const m=await fetch(`https://api.weather.gov/alerts/active?zone=${s}`,{headers:{"User-Agent":"MeteoFlow Weather App"}});return m.ok?(await m.json()).features.map(l=>({id:`nws_${l.properties.id}`,type:Nt(l.properties.event),severity:kt(l.properties.severity),title:l.properties.event,description:l.properties.headline||l.properties.description,location:l.properties.areaDesc,startTime:l.properties.onset||l.properties.effective,endTime:l.properties.ends||l.properties.expires,source:"NWS"})):[]}catch(o){return console.error("Error fetching NWS alerts:",o),[]}},Ct=(t,r,a,i)=>{const o=[];return t>=95&&t<=99&&o.push({id:`wx_${Date.now()}_storm`,type:"storm",severity:t===99?"extreme":"severe",title:"Tormenta Eléctrica Severa",description:t>=96?"Tormenta con granizo":"Tormenta eléctrica intensa",location:"Ubicación actual",source:"Open-Meteo"}),t>=65&&t<=67&&o.push({id:`wx_${Date.now()}_rain`,type:"rain",severity:"moderate",title:"Lluvia Intensa",description:"Precipitaciones fuertes previstas. Riesgo de inundaciones locales.",location:"Ubicación actual",source:"Open-Meteo"}),t>=75&&t<=77&&o.push({id:`wx_${Date.now()}_snow`,type:"snow",severity:"moderate",title:"Nevada Intensa",description:"Nevadas fuertes previstas. Precaución en carreteras.",location:"Ubicación actual",source:"Open-Meteo"}),r>=40?o.push({id:`wx_${Date.now()}_heat`,type:"extreme_heat",severity:r>=45?"extreme":"severe",title:"Calor Extremo",description:`Temperatura de ${Math.round(r)}°C. Evite exposición prolongada.`,location:"Ubicación actual",source:"Open-Meteo"}):r<=-20&&o.push({id:`wx_${Date.now()}_cold`,type:"extreme_cold",severity:r<=-30?"extreme":"severe",title:"Frío Extremo",description:`Temperatura de ${Math.round(r)}°C. Riesgo de congelación.`,location:"Ubicación actual",source:"Open-Meteo"}),a>=80&&o.push({id:`wx_${Date.now()}_wind`,type:"wind",severity:a>=120?"extreme":a>=100?"severe":"moderate",title:"Vientos Fuertes",description:`Vientos de ${Math.round(a)} km/h. Asegure objetos sueltos.`,location:"Ubicación actual",source:"Open-Meteo"}),o},St=async(t,r,a,i,o,n)=>{const[s,m,v]=await Promise.all([jt(t,r,500,4,7),Mt(t,r),Promise.resolve(Ct(a,i,o))]);return[...s,...m,...v].sort((h,j)=>ie(j.severity)-ie(h.severity))},ie=t=>{switch(t){case"extreme":return 5;case"severe":return 4;case"moderate":return 3;case"minor":return 2;case"info":return 1;default:return 0}},Dt=(t,r,a,i)=>{const n=I(a-t),s=I(i-r),m=Math.sin(n/2)*Math.sin(n/2)+Math.cos(I(t))*Math.cos(I(a))*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(m),Math.sqrt(1-m)))},I=t=>t*(Math.PI/180),_t=t=>{switch(t){case"earthquake":return"🌍";case"tsunami":return"🌊";case"hurricane":return"🌀";case"typhoon":return"🌀";case"tornado":return"🌪️";case"flood":return"🌊";case"storm":return"⛈️";case"wildfire":return"🔥";case"volcano":return"🌋";case"extreme_heat":return"🌡️";case"extreme_cold":return"❄️";case"wind":return"💨";case"snow":return"🌨️";case"rain":return"🌧️";default:return"⚠️"}},ne=t=>{switch(t){case"extreme":return"#dc2626";case"severe":return"#ea580c";case"moderate":return"#f59e0b";case"minor":return"#84cc16";case"info":return"#3b82f6";default:return"#6b7280"}},Et=t=>{switch(t){case"extreme":return"Extremo";case"severe":return"Severo";case"moderate":return"Moderado";case"minor":return"Menor";case"info":return"Informativo";default:return"Desconocido"}},zt=({lat:t,lon:r,weatherCode:a,temperature:i,windSpeed:o,precipitation:n})=>{const[s,m]=x.useState([]),[v,l]=x.useState(!0),[h,j]=x.useState(null);x.useEffect(()=>{const d=async()=>{l(!0);try{const b=await St(t,r,a,i,o,n);m(b)}catch(b){console.error("Error loading alerts:",b)}l(!1)};d();const c=setInterval(d,5*60*1e3);return()=>clearInterval(c)},[t,r,a,i,o,n]);const f=d=>{j(h===d?null:d)},p=d=>d?new Date(d).toLocaleString("es-ES",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"";return v?e.jsxs("div",{className:"alerts-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("span",{children:"Cargando alertas..."}),e.jsx("style",{children:`
          .alerts-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 40px;
            color: var(--text-tertiary);
          }

          .loading-spinner {
            width: 24px;
            height: 24px;
            border: 2px solid var(--border);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):s.length===0?e.jsxs("div",{className:"alerts-empty",children:[e.jsx("div",{className:"empty-icon",children:"✓"}),e.jsx("h4",{children:"Sin alertas activas"}),e.jsx("p",{children:"No hay alertas meteorológicas o de desastres naturales para tu ubicación."}),e.jsx("style",{children:`
          .alerts-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: clamp(20px, 5vw, 40px);
            gap: 12px;
          }

          .empty-icon {
            width: 48px;
            height: 48px;
            background: var(--success);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
          }

          .alerts-empty h4 {
            margin: 0;
            font-size: clamp(14px, 3.5vw, 16px);
            color: var(--text-primary);
          }

          .alerts-empty p {
            margin: 0;
            font-size: clamp(11px, 2.5vw, 13px);
            color: var(--text-tertiary);
            max-width: 250px;
          }
        `})]}):e.jsxs("div",{className:"alerts-container",children:[e.jsxs("div",{className:"alerts-summary",children:[e.jsxs("span",{className:"alert-count",children:[s.length," alerta",s.length!==1?"s":""]}),e.jsx("div",{className:"severity-badges",children:["extreme","severe","moderate"].map(d=>{const c=s.filter(b=>b.severity===d).length;return c===0?null:e.jsx("span",{className:"severity-badge",style:{background:ne(d)},children:c},d)})})]}),e.jsx("div",{className:"alerts-list",children:s.map(d=>e.jsxs("div",{className:`alert-item ${h===d.id?"expanded":""}`,onClick:()=>f(d.id),children:[e.jsxs("div",{className:"alert-header",children:[e.jsx("span",{className:"alert-icon",children:_t(d.type)}),e.jsxs("div",{className:"alert-info",children:[e.jsxs("div",{className:"alert-title-row",children:[e.jsx("span",{className:"alert-title",children:d.title}),e.jsx("span",{className:"alert-severity",style:{background:ne(d.severity)},children:Et(d.severity)})]}),e.jsx("span",{className:"alert-location",children:d.location})]}),e.jsx("svg",{className:"expand-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})]}),h===d.id&&e.jsxs("div",{className:"alert-details",children:[e.jsx("p",{className:"alert-description",children:d.description}),e.jsxs("div",{className:"alert-meta",children:[d.startTime&&e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-label",children:"Inicio"}),e.jsx("span",{className:"meta-value",children:p(d.startTime)})]}),d.endTime&&e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-label",children:"Fin"}),e.jsx("span",{className:"meta-value",children:p(d.endTime)})]}),d.magnitude&&e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-label",children:"Magnitud"}),e.jsxs("span",{className:"meta-value",children:["M",d.magnitude.toFixed(1)]})]}),d.distance&&e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-label",children:"Distancia"}),e.jsxs("span",{className:"meta-value",children:[d.distance," km"]})]})]}),e.jsxs("div",{className:"alert-footer",children:[e.jsxs("span",{className:"alert-source",children:["Fuente: ",d.source]}),d.url&&e.jsx("a",{href:d.url,target:"_blank",rel:"noopener noreferrer",className:"alert-link",onClick:c=>c.stopPropagation(),children:"Más info →"})]})]})]},d.id))}),e.jsx("style",{children:`
        .alerts-container {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 16px);
          height: 100%;
        }

        .alerts-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: clamp(8px, 2vw, 12px);
          border-bottom: 1px solid var(--border);
        }

        .alert-count {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .severity-badges {
          display: flex;
          gap: 6px;
        }

        .severity-badge {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          color: white;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 2vw, 12px);
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        .alert-item {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
        }

        .alert-item:hover {
          background: var(--accent-subtle);
        }

        .alert-header {
          display: flex;
          align-items: flex-start;
          gap: clamp(10px, 2.5vw, 12px);
          padding: clamp(10px, 2.5vw, 14px);
        }

        .alert-icon {
          font-size: clamp(20px, 5vw, 24px);
          flex-shrink: 0;
        }

        .alert-info {
          flex: 1;
          min-width: 0;
        }

        .alert-title-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }

        .alert-title {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .alert-severity {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: clamp(9px, 2vw, 10px);
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .alert-location {
          font-size: clamp(10px, 2.5vw, 12px);
          color: var(--text-tertiary);
          display: block;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .expand-icon {
          color: var(--text-tertiary);
          transition: transform 0.2s;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .alert-item.expanded .expand-icon {
          transform: rotate(180deg);
        }

        .alert-details {
          padding: 0 clamp(10px, 2.5vw, 14px) clamp(10px, 2.5vw, 14px);
          border-top: 1px solid var(--border);
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-description {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-secondary);
          line-height: 1.5;
          margin: clamp(8px, 2vw, 12px) 0;
        }

        .alert-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 100px), 1fr));
          gap: clamp(8px, 2vw, 12px);
          margin-bottom: clamp(8px, 2vw, 12px);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-label {
          font-size: clamp(9px, 2vw, 10px);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .meta-value {
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
        }

        .alert-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: clamp(8px, 2vw, 10px);
          border-top: 1px solid var(--border);
        }

        .alert-source {
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
        }

        .alert-link {
          font-size: clamp(11px, 2.5vw, 12px);
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
        }

        .alert-link:hover {
          text-decoration: underline;
        }
      `})]})},Lt=({lat:t,lon:r})=>{var D;const{language:a}=F(),[i,o]=x.useState([]),[n,s]=x.useState(0),[m,v]=x.useState(!1),[l,h]=x.useState(!0),[j,f]=x.useState(null),p=x.useRef(null),d=x.useRef(null),c=x.useCallback(async()=>{var k,C;try{h(!0),f(null);const L=await fetch("https://api.rainviewer.com/public/weather-maps.json");if(!L.ok)throw new Error("Failed to fetch radar data");const T=await L.json(),A=((k=T.radar)==null?void 0:k.past)||[],R=((C=T.radar)==null?void 0:C.nowcast)||[],G=[...A.map($=>({time:$.time,path:$.path})),...R.slice(0,3).map($=>({time:$.time,path:$.path}))];o(G),s(A.length-1),h(!1)}catch{f("Unable to load radar data"),h(!1)}},[]);x.useEffect(()=>{c();const k=setInterval(c,10*60*1e3);return()=>clearInterval(k)},[c]),x.useEffect(()=>(m&&i.length>0?d.current=setInterval(()=>{s(k=>(k+1)%i.length)},500):d.current&&clearInterval(d.current),()=>{d.current&&clearInterval(d.current)}),[m,i.length]);const b=k=>new Date(k*1e3).toLocaleTimeString(a==="en"?"en-US":a,{hour:"2-digit",minute:"2-digit"}),u=k=>{if(i.length===0)return"";const C=i.filter(L=>L.time*1e3<Date.now()).length;return k<C?b(i[k].time):`+${(k-C+1)*10}min`},w=7,y=256,g=(k,C,L)=>{const T=Math.pow(2,L),A=Math.floor((C+180)/360*T),R=k*Math.PI/180,G=Math.floor((1-Math.log(Math.tan(R)+1/Math.cos(R))/Math.PI)/2*T);return{x:A,y:G}},{x:N,y:M}=g(t,r,w),_=[{dx:-1,dy:-1},{dx:0,dy:-1},{dx:1,dy:-1},{dx:-1,dy:0},{dx:0,dy:0},{dx:1,dy:0},{dx:-1,dy:1},{dx:0,dy:1},{dx:1,dy:1}],E=((D=i[n])==null?void 0:D.path)||"",z={es:{title:"Radar de Lluvia",noData:"Sin datos de radar",past:"Pasado",forecast:"Pronóstico"},en:{title:"Rain Radar",noData:"No radar data",past:"Past",forecast:"Forecast"},fr:{title:"Radar de Pluie",noData:"Pas de données radar",past:"Passé",forecast:"Prévision"},de:{title:"Regenradar",noData:"Keine Radardaten",past:"Vergangen",forecast:"Vorhersage"},pt:{title:"Radar de Chuva",noData:"Sem dados de radar",past:"Passado",forecast:"Previsão"}},S=z[a]||z.es;return e.jsxs("div",{className:"radar-card",children:[e.jsxs("div",{className:"radar-header",children:[e.jsx("h3",{className:"radar-title",children:S.title}),e.jsx("div",{className:"radar-time",children:i[n]&&e.jsx("span",{className:n>=i.filter(k=>k.time*1e3<Date.now()).length?"forecast":"",children:u(n)})})]}),e.jsx("div",{className:"radar-container",ref:p,children:l?e.jsx("div",{className:"radar-loading",children:e.jsx("div",{className:"loading-spinner"})}):j?e.jsx("div",{className:"radar-error",children:j}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"map-layer base-map",children:_.map(({dx:k,dy:C})=>e.jsx("img",{src:`https://tile.openstreetmap.org/${w}/${N+k}/${M+C}.png`,alt:"",style:{gridColumn:k+2,gridRow:C+2},loading:"lazy"},`base-${k}-${C}`))}),E&&e.jsx("div",{className:"map-layer radar-layer",children:_.map(({dx:k,dy:C})=>e.jsx("img",{src:`https://tilecache.rainviewer.com${E}/${y}/${w}/${N+k}/${M+C}/4/1_1.png`,alt:"",style:{gridColumn:k+2,gridRow:C+2},loading:"lazy",onError:L=>{L.target.style.display="none"}},`radar-${k}-${C}-${n}`))}),e.jsx("div",{className:"center-marker",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8",fill:"var(--accent)",fillOpacity:"0.3"}),e.jsx("circle",{cx:"12",cy:"12",r:"4",fill:"var(--accent)"})]})}),e.jsxs("div",{className:"radar-legend",children:[e.jsx("div",{className:"legend-gradient"}),e.jsxs("div",{className:"legend-labels",children:[e.jsx("span",{children:"0"}),e.jsx("span",{children:"mm/h"}),e.jsx("span",{children:"50+"})]})]})]})}),e.jsxs("div",{className:"radar-controls",children:[e.jsx("button",{className:"control-btn",onClick:()=>v(!m),"aria-label":m?"Pause":"Play",children:m?e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:[e.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),e.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M8 5v14l11-7L8 5z"})})}),e.jsxs("div",{className:"timeline",children:[e.jsxs("div",{className:"timeline-track",children:[e.jsx("div",{className:"timeline-past",style:{width:`${i.filter(k=>k.time*1e3<Date.now()).length/i.length*100}%`}}),e.jsx("div",{className:"timeline-marker",style:{left:`${n/Math.max(1,i.length-1)*100}%`}})]}),e.jsx("input",{type:"range",min:"0",max:Math.max(0,i.length-1),value:n,onChange:k=>{s(parseInt(k.target.value)),v(!1)},className:"timeline-slider"})]}),e.jsxs("div",{className:"timeline-labels",children:[e.jsx("span",{className:"past-label",children:S.past}),e.jsx("span",{className:"forecast-label",children:S.forecast})]})]}),e.jsx("style",{children:`
        .radar-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: clamp(12px, 3vw, 20px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
          min-height: 350px;
        }

        .radar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .radar-title {
          font-size: clamp(14px, 3.5vw, 16px);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .radar-time {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 4px 10px;
          background: var(--bg-subtle);
          border-radius: 12px;
        }

        .radar-time .forecast {
          color: var(--accent);
        }

        .radar-container {
          flex: 1;
          min-height: 200px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          background: var(--bg-subtle);
        }

        .map-layer {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
        }

        .map-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .base-map {
          filter: saturate(0.7) brightness(0.95);
        }

        .dark .base-map {
          filter: invert(1) hue-rotate(180deg) saturate(0.5) brightness(0.8);
        }

        .radar-layer {
          opacity: 0.7;
          mix-blend-mode: multiply;
        }

        .dark .radar-layer {
          mix-blend-mode: screen;
          opacity: 0.85;
        }

        .center-marker {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none;
        }

        .radar-legend {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: var(--bg-elevated);
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 9px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: var(--shadow-sm);
        }

        .legend-gradient {
          width: 80px;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            #00ff00 20%,
            #ffff00 40%,
            #ff8800 60%,
            #ff0000 80%,
            #ff00ff 100%
          );
        }

        .legend-labels {
          display: flex;
          justify-content: space-between;
          color: var(--text-tertiary);
        }

        .radar-loading,
        .radar-error {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-tertiary);
          font-size: 13px;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .radar-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-btn {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .control-btn:hover {
          background: var(--accent-subtle);
          border-color: var(--accent);
          color: var(--accent);
        }

        .timeline {
          flex: 1;
          position: relative;
          height: 36px;
          display: flex;
          align-items: center;
        }

        .timeline-track {
          position: absolute;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--border);
          border-radius: 3px;
          overflow: hidden;
        }

        .timeline-past {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: var(--text-tertiary);
          opacity: 0.5;
        }

        .timeline-marker {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border: 2px solid var(--bg-elevated);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          z-index: 2;
          pointer-events: none;
        }

        .timeline-slider {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 24px;
          opacity: 0;
          cursor: pointer;
          z-index: 3;
        }

        .timeline-labels {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-tertiary);
        }

        .forecast-label {
          color: var(--accent);
        }
      `})]})},Pt=()=>{const{language:t,setLanguage:r,languageNames:a,languageFlags:i,availableLanguages:o}=F(),[n,s]=x.useState(!1),m=x.useRef(null);x.useEffect(()=>{const l=h=>{m.current&&!m.current.contains(h.target)&&s(!1)};return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[]);const v=l=>{r(l),s(!1)};return e.jsxs("div",{className:"language-selector",ref:m,children:[e.jsxs("button",{className:"language-button",onClick:()=>s(!n),"aria-label":"Select language",children:[e.jsx("span",{className:"language-flag",children:i[t]}),e.jsx("span",{className:"language-code",children:t.toUpperCase()}),e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2",style:{transform:n?"rotate(180deg)":"rotate(0deg)",transition:"0.2s"},children:e.jsx("path",{d:"M4 6l4 4 4-4"})})]}),n&&e.jsx("div",{className:"language-dropdown",children:o.map(l=>e.jsxs("button",{className:`language-option ${l===t?"active":""}`,onClick:()=>v(l),children:[e.jsx("span",{className:"option-flag",children:i[l]}),e.jsx("span",{className:"option-name",children:a[l]}),l===t&&e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"})})]},l))}),e.jsx("style",{children:`
        .language-selector {
          position: relative;
        }

        .language-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
        }

        .language-button:hover {
          background: var(--accent-subtle);
          border-color: var(--accent);
        }

        .language-flag {
          font-size: 16px;
          line-height: 1;
        }

        .language-code {
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          min-width: 160px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1000;
          animation: dropdownFadeIn 0.15s ease;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 14px;
          background: none;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-primary);
          font-size: 13px;
          text-align: left;
        }

        .language-option:hover {
          background: var(--bg-subtle);
        }

        .language-option.active {
          background: var(--accent-subtle);
          color: var(--accent);
        }

        .option-flag {
          font-size: 18px;
          line-height: 1;
        }

        .option-name {
          flex: 1;
          font-weight: 500;
        }

        .language-option svg {
          color: var(--accent);
        }

        @media (max-width: 480px) {
          .language-code {
            display: none;
          }

          .language-button {
            padding: 8px;
          }

          .language-dropdown {
            right: -8px;
          }
        }
      `})]})},q=()=>{const t=window.innerWidth,r=window.innerHeight;let a;return t<640?a="mobile":t<1024?a="tablet":t<1440?a="desktop":a="large",{type:a,width:t,height:r,isTouch:"ontouchstart"in window||navigator.maxTouchPoints>0,orientation:t>r?"landscape":"portrait",pixelRatio:window.devicePixelRatio||1}},pe=x.createContext(q()),Ft=({children:t})=>{const[r,a]=x.useState(q);return x.useEffect(()=>{const i=()=>a(q());return window.addEventListener("resize",i),window.addEventListener("orientationchange",i),()=>{window.removeEventListener("resize",i),window.removeEventListener("orientationchange",i)}},[]),e.jsx(pe.Provider,{value:r,children:t})},X=()=>x.useContext(pe),Tt=t=>{switch(t){case"mobile":return 2;case"tablet":return 4;case"desktop":return 6;case"large":return 8;default:return 4}},$t=(t,r)=>r==="mobile"?t==="large"?2:1:t==="large"?4:2,At=({id:t,title:r,size:a,children:i,onSizeChange:o,onDragStart:n,onDragEnd:s,onDragOver:m,onDragLeave:v,onDrop:l,onTouchStart:h,isDragging:j,draggedOver:f})=>{const p=X(),d=x.useRef(null),[c,b]=x.useState(!1),u=N=>{N.dataTransfer.setData("cardId",t),N.dataTransfer.effectAllowed="move",n==null||n(t)},w=()=>{s==null||s(t)},y=()=>{o&&o(t,a==="small"?"large":"small")},g=$t(a,p.type);return e.jsxs("div",{ref:d,className:`draggable-card ${a} ${j?"dragging":""} ${f?"drag-over":""}`,draggable:!p.isTouch||!c,onDragStart:u,onDragEnd:w,onDragOver:m,onDragLeave:v,onDrop:l,onTouchStart:h,style:{gridColumn:`span ${g}`},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"drag-handle",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:[e.jsx("circle",{cx:"5",cy:"5",r:"2"}),e.jsx("circle",{cx:"12",cy:"5",r:"2"}),e.jsx("circle",{cx:"19",cy:"5",r:"2"}),e.jsx("circle",{cx:"5",cy:"12",r:"2"}),e.jsx("circle",{cx:"12",cy:"12",r:"2"}),e.jsx("circle",{cx:"19",cy:"12",r:"2"}),e.jsx("circle",{cx:"5",cy:"19",r:"2"}),e.jsx("circle",{cx:"12",cy:"19",r:"2"}),e.jsx("circle",{cx:"19",cy:"19",r:"2"})]})}),e.jsx("span",{className:"card-title",children:r}),e.jsx("button",{className:"size-toggle",onClick:y,onMouseDown:()=>b(!0),onMouseUp:()=>b(!1),title:a==="small"?"Ampliar":"Reducir",children:a==="small"?e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("polyline",{points:"9 21 3 21 3 15"}),e.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),e.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]}):e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"4 14 10 14 10 20"}),e.jsx("polyline",{points:"20 10 14 10 14 4"}),e.jsx("line",{x1:"14",y1:"10",x2:"21",y2:"3"}),e.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})})]}),e.jsx("div",{className:"card-content",children:i}),e.jsx("style",{children:`
        .draggable-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          cursor: grab;
          overflow: hidden;
          min-height: 0;
        }

        .draggable-card:active {
          cursor: grabbing;
        }

        .draggable-card.dragging {
          opacity: 0.5;
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .draggable-card.drag-over {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-subtle);
        }

        .draggable-card.small {
          min-height: clamp(180px, 35vw, 240px);
        }

        .draggable-card.large {
          min-height: clamp(280px, 50vw, 400px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: clamp(8px, 2vw, 12px);
          padding: clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px);
          border-bottom: 1px solid var(--border);
          background: var(--bg-subtle);
          flex-shrink: 0;
        }

        .drag-handle {
          color: var(--text-tertiary);
          cursor: grab;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drag-handle:hover {
          color: var(--text-secondary);
          background: var(--bg-elevated);
        }

        .card-title {
          flex: 1;
          font-size: clamp(12px, 3vw, 14px);
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .size-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(24px, 6vw, 28px);
          height: clamp(24px, 6vw, 28px);
          border: none;
          background: var(--bg-elevated);
          border-radius: var(--radius-sm);
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .size-toggle:hover {
          background: var(--accent-subtle);
          color: var(--accent);
        }

        .card-content {
          flex: 1;
          padding: clamp(12px, 3vw, 16px);
          overflow: auto;
          min-height: 0;
        }

        @media (hover: none) {
          .drag-handle {
            display: none;
          }

          .draggable-card {
            cursor: default;
          }
        }
      `})]})},Rt=({cards:t,onReorder:r,onSizeChange:a,renderCard:i})=>{const o=X(),[n,s]=x.useState(null),[m,v]=x.useState(null),l=x.useRef(null),h=Tt(o.type),j=(u,w)=>{u.preventDefault(),u.dataTransfer.dropEffect="move",w!==n&&v(w)},f=()=>{v(null)},p=(u,w)=>{u.preventDefault();const y=u.dataTransfer.getData("cardId");if(y&&y!==w){const g=[...t],N=g.findIndex(_=>_.id===y),M=g.findIndex(_=>_.id===w);if(N!==-1&&M!==-1){const[_]=g.splice(N,1);g.splice(M,0,_),g.forEach((E,z)=>{E.order=z}),r(g)}}s(null),v(null)},d=x.useRef(null),c=(u,w)=>{const y=u.touches[0];d.current={x:y.clientX,y:y.clientY};const g=setTimeout(()=>{s(w)},500),N=()=>{clearTimeout(g),document.removeEventListener("touchend",N),document.removeEventListener("touchmove",M)},M=_=>{var D,k;const E=_.touches[0],z=E.clientX-(((D=d.current)==null?void 0:D.x)||0),S=E.clientY-(((k=d.current)==null?void 0:k.y)||0);(Math.abs(z)>10||Math.abs(S)>10)&&clearTimeout(g)};document.addEventListener("touchend",N),document.addEventListener("touchmove",M)},b=t.filter(u=>u.visible).sort((u,w)=>u.order-w.order);return e.jsxs("div",{ref:l,className:"draggable-grid",style:{gridTemplateColumns:`repeat(${h}, 1fr)`},children:[b.map(u=>e.jsx(At,{id:u.id,title:u.title,size:u.size,onSizeChange:a,onDragStart:s,onDragEnd:()=>s(null),onDragOver:w=>j(w,u.id),onDragLeave:f,onDrop:w=>p(w,u.id),onTouchStart:w=>c(w,u.id),isDragging:n===u.id,draggedOver:m===u.id,children:i(u)},u.id)),e.jsx("style",{children:`
        .draggable-grid {
          display: grid;
          gap: clamp(12px, 3vw, 20px);
          width: 100%;
          align-content: start;
        }

        @media (max-width: 640px) {
          .draggable-grid {
            gap: clamp(8px, 2vw, 12px);
          }
        }
      `})]})},It=()=>{const t=X();return e.jsxs("div",{className:"screen-info",children:[e.jsx("div",{className:"screen-badge","data-type":t.type,children:t.type.toUpperCase()}),e.jsxs("span",{className:"screen-dims",children:[t.width,"×",t.height]}),t.isTouch&&e.jsx("span",{className:"touch-badge",children:"TOUCH"}),e.jsx("span",{className:"orientation-badge",children:t.orientation}),e.jsx("style",{children:`
        .screen-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 600;
          font-family: monospace;
        }

        .screen-badge {
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
        }

        .screen-badge[data-type="mobile"] {
          background: #ef4444;
        }

        .screen-badge[data-type="tablet"] {
          background: #f59e0b;
        }

        .screen-badge[data-type="desktop"] {
          background: #22c55e;
        }

        .screen-badge[data-type="large"] {
          background: #3b82f6;
        }

        .screen-dims {
          color: var(--text-secondary);
        }

        .touch-badge {
          padding: 2px 6px;
          background: var(--accent);
          color: white;
          border-radius: 4px;
        }

        .orientation-badge {
          padding: 2px 6px;
          background: var(--bg-subtle);
          color: var(--text-tertiary);
          border-radius: 4px;
          text-transform: uppercase;
        }
      `})]})},xe="meteoflow_card_layout",Wt=t=>{try{localStorage.setItem(xe,JSON.stringify(t))}catch(r){console.error("Error saving card layout:",r)}},Bt=t=>{try{const r=localStorage.getItem(xe);if(r){const a=JSON.parse(r);return t.map(i=>{const o=a.find(n=>n.id===i.id);return o?{...i,...o}:i})}}catch(r){console.error("Error loading card layout:",r)}return t},Gt=x.lazy(()=>ue(()=>import("./LandscapeEngine-DK-6Imta.js"),__vite__mapDeps([0,1])).then(t=>({default:t.LandscapeEngine}))),se=[{id:"current",title:"currentWeather",size:"large",order:0,visible:!0},{id:"hourly",title:"hourlyForecast",size:"large",order:1,visible:!0},{id:"radar",title:"radar",size:"large",order:2,visible:!0},{id:"alerts",title:"alerts",size:"small",order:3,visible:!0},{id:"daily",title:"dailyForecast",size:"large",order:4,visible:!0},{id:"air",title:"airQuality",size:"small",order:5,visible:!0},{id:"sun",title:"sunrise",size:"small",order:6,visible:!0},{id:"wind",title:"wind",size:"small",order:7,visible:!0},{id:"marine",title:"marine",size:"small",order:8,visible:!0}],Ot=()=>{const{data:t,loading:r,error:a,location:i,setLocation:o,refresh:n,searchResults:s,search:m,searching:v,useCurrentLocation:l}=Be(),[h,j]=Ge(),{t:f}=F(),[p,d]=x.useState(()=>Bt(se)),[c,b]=x.useState(!1);x.useEffect(()=>{Wt(p)},[p]);const u=x.useCallback((M,_)=>{d(E=>E.map(z=>z.id===M?{...z,size:_}:z))},[]),w=x.useCallback(M=>{d(_=>_.map(E=>E.id===M?{...E,visible:!E.visible}:E))},[]),y=x.useCallback(M=>{d(M)},[]),g=x.useCallback(()=>{d(se)},[]),N=x.useCallback(M=>{if(!t)return null;switch(M.id){case"current":return e.jsx(mt,{weather:t.current,airQuality:t.airQuality,location:t.location,lastUpdated:t.lastUpdated,lat:t.location.latitude,lon:t.location.longitude});case"hourly":return e.jsx(ht,{hours:t.hourly});case"radar":return e.jsx(Lt,{lat:t.location.latitude,lon:t.location.longitude});case"daily":return e.jsx(gt,{days:t.daily});case"alerts":return e.jsx(zt,{lat:t.location.latitude,lon:t.location.longitude,weatherCode:t.current.weatherCode,temperature:t.current.temperature,windSpeed:t.current.windSpeed,precipitation:t.current.precipitation||0});case"air":return e.jsx(ft,{airQuality:t.airQuality});case"sun":return e.jsx(bt,{today:t.daily[0],weather:t.current,lat:t.location.latitude,lon:t.location.longitude});case"wind":return e.jsx(yt,{weather:t.current,lat:t.location.latitude,lon:t.location.longitude});case"marine":return t.marine?e.jsx(wt,{marine:t.marine}):e.jsx("div",{className:"no-marine",children:e.jsx("p",{children:"Datos marinos no disponibles para esta ubicación"})});default:return null}},[t]);return e.jsxs("div",{className:`app ${h?"dark":"light"}`,children:[e.jsx(vt,{}),t&&e.jsx(x.Suspense,{fallback:e.jsx("div",{className:"landscape-loading"}),children:e.jsx(Gt,{weatherParams:{temperature:t.current.temperature,weatherCode:t.current.weatherCode,isDay:t.current.isDay,humidity:t.current.humidity,windSpeed:t.current.windSpeed,precipitation:t.current.precipitation||0,cloudCover:t.current.cloudCover||0,visibility:t.current.visibility},className:"landscape-background"})}),e.jsxs("div",{className:"app-overlay",children:[e.jsx("header",{className:"app-header",children:e.jsxs("div",{className:"header-content",children:[e.jsxs("div",{className:"brand",children:[e.jsx("div",{className:"brand-icon",children:e.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",children:[e.jsx("circle",{cx:"16",cy:"16",r:"14",stroke:"currentColor",strokeWidth:"2"}),e.jsx("circle",{cx:"16",cy:"16",r:"6",fill:"currentColor"}),e.jsx("line",{x1:"16",y1:"1",x2:"16",y2:"6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("line",{x1:"16",y1:"26",x2:"16",y2:"31",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("line",{x1:"1",y1:"16",x2:"6",y2:"16",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("line",{x1:"26",y1:"16",x2:"31",y2:"16",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),e.jsxs("div",{className:"brand-text",children:[e.jsx("span",{className:"brand-name",children:"MeteoFlow"}),e.jsx("span",{className:"brand-version",children:"PRO"})]})]}),e.jsx("div",{className:"header-center",children:e.jsx(Je,{onSelect:o,onSearch:m,searchResults:s,searching:v,onUseCurrentLocation:l,currentLocation:i})}),e.jsxs("div",{className:"header-actions",children:[e.jsx(It,{}),e.jsx(Pt,{}),e.jsx("button",{onClick:()=>b(!c),className:`action-btn ${c?"active":""}`,"aria-label":f.settings,title:f.settings,children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]})}),e.jsx("button",{onClick:n,className:`action-btn ${r?"loading":""}`,disabled:r,"aria-label":f.retry,children:e.jsx(Xe,{size:20})}),e.jsx("button",{onClick:j,className:"action-btn","aria-label":h?f.lightMode:f.darkMode,children:h?e.jsx(Oe,{size:20}):e.jsx(He,{size:20})})]})]})}),c&&e.jsx("div",{className:"edit-panel",children:e.jsxs("div",{className:"edit-panel-content",children:[e.jsx("h3",{children:"Personalizar Dashboard"}),e.jsx("p",{children:"Arrastra las tarjetas para reordenarlas. Usa los botones para cambiar el tamaño."}),e.jsx("div",{className:"card-toggles",children:p.map(M=>e.jsxs("label",{className:"card-toggle",children:[e.jsx("input",{type:"checkbox",checked:M.visible,onChange:()=>w(M.id)}),e.jsx("span",{className:"toggle-label",children:M.title}),e.jsx("span",{className:`toggle-size ${M.size}`,children:M.size==="small"?"S":"L"})]},M.id))}),e.jsx("button",{onClick:g,className:"reset-btn",children:"Restablecer Layout"})]})}),e.jsx("main",{className:"main-content",children:r&&!t?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"loading-spinner",children:e.jsx("svg",{viewBox:"0 0 50 50",children:e.jsx("circle",{cx:"25",cy:"25",r:"20",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeDasharray:"80 40",strokeLinecap:"round"})})}),e.jsx("p",{className:"loading-text",children:f.loading})]}):a?e.jsxs("div",{className:"error-state",children:[e.jsx("div",{className:"error-icon",children:"!"}),e.jsx("p",{className:"error-text",children:f.error}),e.jsx("button",{onClick:l,className:"error-btn",children:f.retry})]}):t?e.jsx(Rt,{cards:p,onReorder:y,onSizeChange:u,renderCard:N}):null}),e.jsxs("footer",{className:"app-footer",children:[e.jsx("span",{children:"MeteoFlow PRO"}),e.jsx("span",{className:"footer-separator",children:"•"}),e.jsx("span",{children:"100+ Paisajes 3D"}),e.jsx("span",{className:"footer-separator",children:"•"}),e.jsx("span",{children:"Alertas en Tiempo Real"}),e.jsx("span",{className:"footer-separator",children:"•"}),e.jsx("span",{children:"Open-Meteo • USGS • NWS"})]})]}),e.jsx("style",{children:`
        :root {
          --bg-base: rgba(250, 250, 250, 0.85);
          --bg-elevated: rgba(255, 255, 255, 0.9);
          --bg-subtle: rgba(245, 245, 245, 0.8);
          --border: rgba(0, 0, 0, 0.08);
          --border-strong: rgba(0, 0, 0, 0.12);
          --text-primary: #1a1a1a;
          --text-secondary: #666666;
          --text-tertiary: #999999;
          --accent: #0066ff;
          --accent-subtle: rgba(0, 102, 255, 0.1);
          --success: #00c853;
          --warning: #ffab00;
          --danger: #ff3d00;
          --temp-cold: #2196f3;
          --temp-cool: #00bcd4;
          --temp-mild: #4caf50;
          --temp-warm: #ff9800;
          --temp-hot: #f44336;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-xl: 20px;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
          --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
          --glass-blur: blur(20px);
          --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark {
          --bg-base: rgba(13, 13, 13, 0.85);
          --bg-elevated: rgba(26, 26, 26, 0.9);
          --bg-subtle: rgba(20, 20, 20, 0.8);
          --border: rgba(255, 255, 255, 0.1);
          --border-strong: rgba(255, 255, 255, 0.15);
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --text-tertiary: #666666;
          --accent: #4d94ff;
          --accent-subtle: rgba(77, 148, 255, 0.15);
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
          --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
          background: #000;
          color: var(--text-primary);
          line-height: 1.5;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
        }

        .landscape-background {
          position: fixed !important;
          inset: 0;
          z-index: 0;
        }

        .landscape-loading {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .app-overlay {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, transparent 0%, var(--bg-base) 20%);
        }

        /* Header */
        .app-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-elevated);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--border);
        }

        .header-content {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 clamp(12px, 3vw, 24px);
          height: clamp(52px, 8vh, 68px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(8px, 2vw, 16px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .brand-icon {
          width: clamp(32px, 5vw, 40px);
          height: clamp(32px, 5vw, 40px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }

        .brand-icon svg {
          width: 100%;
          height: 100%;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .brand-version {
          font-size: 9px;
          color: var(--accent);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: var(--accent-subtle);
          padding: 1px 4px;
          border-radius: 4px;
          width: fit-content;
        }

        .header-center {
          flex: 1;
          max-width: 400px;
          min-width: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: clamp(4px, 1vw, 8px);
          flex-shrink: 0;
        }

        .action-btn {
          width: clamp(36px, 5vw, 42px);
          height: clamp(36px, 5vw, 42px);
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          backdrop-filter: var(--glass-blur);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .action-btn:hover {
          background: var(--accent-subtle);
          color: var(--accent);
          border-color: var(--accent);
        }

        .action-btn.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .action-btn.loading svg {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Edit Panel */
        .edit-panel {
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border);
          padding: clamp(12px, 3vw, 20px);
        }

        .edit-panel-content {
          max-width: 1800px;
          margin: 0 auto;
        }

        .edit-panel h3 {
          font-size: clamp(14px, 3vw, 16px);
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .edit-panel p {
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--text-tertiary);
          margin-bottom: 12px;
        }

        .card-toggles {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .card-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: clamp(11px, 2.5vw, 12px);
          transition: var(--transition);
        }

        .card-toggle:hover {
          background: var(--accent-subtle);
        }

        .card-toggle input {
          width: 14px;
          height: 14px;
          accent-color: var(--accent);
        }

        .toggle-label {
          color: var(--text-primary);
        }

        .toggle-size {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
        }

        .toggle-size.small {
          background: var(--border);
          color: var(--text-secondary);
        }

        .toggle-size.large {
          background: var(--accent);
          color: white;
        }

        .reset-btn {
          padding: 8px 16px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 12px;
          cursor: pointer;
          transition: var(--transition);
        }

        .reset-btn:hover {
          background: var(--danger);
          color: white;
          border-color: var(--danger);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          max-width: 1800px;
          width: 100%;
          margin: 0 auto;
          padding: clamp(12px, 3vw, 24px);
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          gap: clamp(12px, 2vw, 20px);
          align-content: start;
        }

        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 16px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          color: var(--accent);
        }

        .loading-spinner svg {
          width: 100%;
          height: 100%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Error State */
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 12px;
          padding: 20px;
          text-align: center;
        }

        .error-icon {
          width: 48px;
          height: 48px;
          background: var(--danger);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
        }

        .error-text {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 280px;
        }

        .error-btn {
          padding: 10px 20px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .error-btn:hover {
          opacity: 0.9;
        }

        /* No Marine Data */
        .no-marine {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: var(--text-tertiary);
          font-size: clamp(12px, 3vw, 14px);
          padding: 20px;
        }

        /* Footer */
        .app-footer {
          padding: clamp(10px, 2vw, 14px);
          text-align: center;
          font-size: clamp(9px, 2vw, 11px);
          color: var(--text-tertiary);
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          background: var(--bg-elevated);
          backdrop-filter: var(--glass-blur);
          border-top: 1px solid var(--border);
        }

        .footer-separator {
          opacity: 0.5;
        }

        /* Card Glass Effect */
        .weather-card,
        .hourly-card,
        .daily-card,
        .info-card,
        .draggable-card {
          background: var(--bg-elevated) !important;
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow: var(--shadow-md);
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .brand-text {
            display: none;
          }

          .header-center {
            max-width: none;
          }

          .screen-info {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .header-actions {
            gap: 4px;
          }

          .action-btn {
            width: 36px;
            height: 36px;
          }

          .edit-panel {
            padding: 12px;
          }

          .card-toggles {
            gap: 6px;
          }

          .card-toggle {
            padding: 5px 8px;
            font-size: 11px;
          }
        }

        /* Safe area insets */
        @supports (padding: max(0px)) {
          .header-content {
            padding-left: max(clamp(12px, 3vw, 24px), env(safe-area-inset-left));
            padding-right: max(clamp(12px, 3vw, 24px), env(safe-area-inset-right));
          }

          .main-content {
            padding-left: max(clamp(12px, 3vw, 24px), env(safe-area-inset-left));
            padding-right: max(clamp(12px, 3vw, 24px), env(safe-area-inset-right));
            padding-bottom: max(clamp(12px, 3vw, 24px), env(safe-area-inset-bottom));
          }
        }

        /* Touch improvements */
        @media (hover: none) {
          .action-btn:hover {
            background: var(--bg-elevated);
            color: var(--text-secondary);
            border-color: var(--border);
          }

          .action-btn.active:hover {
            background: var(--accent);
            color: white;
          }

          .action-btn:active {
            background: var(--accent-subtle);
            color: var(--accent);
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          :root {
            --border: rgba(0, 0, 0, 0.3);
            --border-strong: rgba(0, 0, 0, 0.5);
          }

          .dark {
            --border: rgba(255, 255, 255, 0.3);
            --border-strong: rgba(255, 255, 255, 0.5);
          }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-subtle);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--border-strong);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--text-tertiary);
        }
      `})]})},Ht=()=>e.jsx(ut,{children:e.jsx(Ft,{children:e.jsx(Ot,{})})});console.log("MeteoFlow: Iniciando...");try{const t=document.getElementById("root");console.log("MeteoFlow: Root element:",t),t?(me.createRoot(t).render(e.jsx(he.StrictMode,{children:e.jsx(Ht,{})})),console.log("MeteoFlow: App renderizada")):console.error("MeteoFlow: No se encontró el elemento root")}catch(t){console.error("MeteoFlow: Error al iniciar:",t),document.body.innerHTML=`<div style="padding: 20px; color: red;">Error: ${t}</div>`}export{e as j};
//# sourceMappingURL=index-DO4T41mq.js.map
