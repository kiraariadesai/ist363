const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&current=temperature_2m,precipitation,cloud_cover&temperature_unit=fahrenheit&precipitation_unit=inch';

function formatPrecipitation(inches) {
  if (inches == null || Number.isNaN(inches)) return '—';
  const n = Number(inches);
  if (n === 0) return '0';
  return String(Number(n.toFixed(2)));}

function cloudEmoji(percent) {
  if (percent == null || Number.isNaN(percent)) return '☀️';
  return percent >= 50 ? '☁️' : '☀️';}

async function loadWeather() {
  const precipEl = document.getElementById('weather-precip');
  const tempEl = document.getElementById('weather-temp');
  const emojiEl = document.getElementById('weather-emoji');

  try {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) throw new Error('Weather request failed');
    const data = await response.json();
    const cur = data.current;
    if (!cur) throw new Error('No current weather in response');

    if (precipEl) precipEl.textContent = formatPrecipitation(cur.precipitation);
    if (tempEl) {
      const t = cur.temperature_2m;
      tempEl.textContent = t != null ? String(Math.round(t)) : '—';
    }
    if (emojiEl) emojiEl.textContent = cloudEmoji(cur.cloud_cover);
  } catch (err) {
    console.error(err);
    if (precipEl) precipEl.textContent = '—';
    if (tempEl) tempEl.textContent = '—';
    if (emojiEl) emojiEl.textContent = '☀️';
  }}

document.addEventListener('DOMContentLoaded', loadWeather);
