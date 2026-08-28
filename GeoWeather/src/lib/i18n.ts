import type { LangCode } from "@/lib/types";

export type TKey =
  | "appName" | "tagline" | "searchPlaceholder" | "addCity" | "myCities"
  | "currentConditions" | "hourlyForecast" | "dailyForecast"
  | "feelsLike" | "humidity" | "wind" | "pressure" | "cloudCover"
  | "precipitation" | "precipProb" | "sunrise" | "sunset"
  | "noCities" | "noCitiesHint" | "searchNoResults"
  | "settings" | "removeCity" | "loading" | "error" | "retry" | "back"
  | "basedOn" | "tomorrow" | "today" | "now"
  | "airQuality" | "pm10" | "pm25" | "no2" | "ozone"
  | "aqiGood" | "aqiModerate" | "aqiUnhealthySensitive" | "aqiUnhealthy" | "aqiVeryUnhealthy" | "aqiHazardous"
  | "history" | "last30Days" | "last90Days" | "lastYear"
  | "radar" | "radarTitle"
  | "temperatureUnit" | "windUnit" | "pressureUnit" | "language"
  | "login" | "signup" | "email" | "password" | "confirmPassword" | "logout"
  | "loginTitle" | "signupTitle" | "loginSubtitle" | "noAccount" | "hasAccount";

const en: Record<TKey, string> = {
  appName: "GeoWeather", tagline: "A modern weather app",
  searchPlaceholder: "Search for a city...", addCity: "Add", myCities: "My Cities",
  currentConditions: "Current Conditions", hourlyForecast: "Hourly Forecast", dailyForecast: "16-Day Forecast",
  feelsLike: "Feels like", humidity: "Humidity", wind: "Wind", pressure: "Pressure",
  cloudCover: "Cloud cover", precipitation: "Precipitation", precipProb: "Precip. prob.",
  sunrise: "Sunrise", sunset: "Sunset",
  noCities: "No cities yet", noCitiesHint: "Search above to add a city and see its weather.",
  searchNoResults: "No matching cities found.", settings: "Settings", removeCity: "Remove",
  loading: "Loading...", error: "Something went wrong.", retry: "Retry", back: "Back",
  basedOn: "Forecast by Open-Meteo", tomorrow: "Tomorrow", today: "Today", now: "Now",
  airQuality: "Air Quality", pm10: "PM10", pm25: "PM2.5", no2: "NO₂", ozone: "Ozone",
  aqiGood: "Good", aqiModerate: "Moderate", aqiUnhealthySensitive: "Unhealthy for Sensitive Groups",
  aqiUnhealthy: "Unhealthy", aqiVeryUnhealthy: "Very Unhealthy", aqiHazardous: "Hazardous",
  history: "Weather History", last30Days: "Last 30 days", last90Days: "Last 90 days", lastYear: "Last year",
  radar: "Radar", radarTitle: "Precipitation Radar",
  temperatureUnit: "Temperature unit", windUnit: "Wind speed unit", pressureUnit: "Pressure unit", language: "Language",
  login: "Login", signup: "Sign Up", email: "Email", password: "Password", confirmPassword: "Confirm Password", logout: "Logout",
  loginTitle: "Welcome Back", signupTitle: "Create Account", loginSubtitle: "Sign in to sync your cities",
  noAccount: "Don't have an account?", hasAccount: "Already have an account?",
};

const de: Record<TKey, string> = {
  appName: "GeoWeather", tagline: "Eine moderne Wetter-App",
  searchPlaceholder: "Stadt suchen...", addCity: "Hinzufügen", myCities: "Meine Städte",
  currentConditions: "Aktuelle Bedingungen", hourlyForecast: "Stündliche Vorhersage", dailyForecast: "16-Tage-Vorhersage",
  feelsLike: "Gefühlt", humidity: "Luftfeuchtigkeit", wind: "Wind", pressure: "Druck",
  cloudCover: "Bewölkung", precipitation: "Niederschlag", precipProb: "Niederschl.-Wahrsch.",
  sunrise: "Sonnenaufgang", sunset: "Sonnenuntergang",
  noCities: "Noch keine Städte", noCitiesHint: "Suche oben, um eine Stadt hinzuzufügen.",
  searchNoResults: "Keine passenden Städte gefunden.", settings: "Einstellungen", removeCity: "Entfernen",
  loading: "Wird geladen...", error: "Fehler beim Laden.", retry: "Erneut versuchen", back: "Zurück",
  basedOn: "Vorhersage von Open-Meteo", tomorrow: "Morgen", today: "Heute", now: "Jetzt",
  airQuality: "Luftqualität", pm10: "PM10", pm25: "PM2.5", no2: "NO₂", ozone: "Ozon",
  aqiGood: "Gut", aqiModerate: "Mäßig", aqiUnhealthySensitive: "Ungesund für empfindliche Gruppen",
  aqiUnhealthy: "Ungesund", aqiVeryUnhealthy: "Sehr ungesund", aqiHazardous: "Gefährlich",
  history: "Wetterverlauf", last30Days: "Letzte 30 Tage", last90Days: "Letzte 90 Tage", lastYear: "Letztes Jahr",
  radar: "Radar", radarTitle: "Niederschlagsradar",
  temperatureUnit: "Temperatureinheit", windUnit: "Windgeschwindigkeitseinheit", pressureUnit: "Druckeinheit", language: "Sprache",
  login: "Anmelden", signup: "Registrieren", email: "E-Mail", password: "Passwort", confirmPassword: "Passwort bestätigen", logout: "Abmelden",
  loginTitle: "Willkommen zurück", signupTitle: "Konto erstellen", loginSubtitle: "Melde dich an, um deine Städte zu synchronisieren",
  noAccount: "Noch kein Konto?", hasAccount: "Bereits ein Konto?",
};

const ru: Record<TKey, string> = {
  appName: "GeoWeather", tagline: "Современное приложение о погоде",
  searchPlaceholder: "Поиск города...", addCity: "Добавить", myCities: "Мои города",
  currentConditions: "Текущие условия", hourlyForecast: "Почасовая погода", dailyForecast: "Прогноз на 16 дней",
  feelsLike: "Ощущается как", humidity: "Влажность", wind: "Ветер", pressure: "Давление",
  cloudCover: "Облачность", precipitation: "Осадки", precipProb: "Вероятность осадков",
  sunrise: "Восход", sunset: "Закат",
  noCities: "Пока нет городов", noCitiesHint: "Найдите город выше, чтобы посмотреть его погоду.",
  searchNoResults: "Города не найдены.", settings: "Настройки", removeCity: "Удалить",
  loading: "Загрузка...", error: "Не удалось загрузить данные.", retry: "Повторить", back: "Назад",
  basedOn: "Прогноз Open-Meteo", tomorrow: "Завтра", today: "Сегодня", now: "Сейчас",
  airQuality: "Качество воздуха", pm10: "PM10", pm25: "PM2.5", no2: "NO₂", ozone: "Озон",
  aqiGood: "Хорошо", aqiModerate: "Умеренно", aqiUnhealthySensitive: "Нездоров для чувствительных групп",
  aqiUnhealthy: "Нездоров", aqiVeryUnhealthy: "Очень нездоров", aqiHazardous: "Опасно",
  history: "История погоды", last30Days: "Последние 30 дней", last90Days: "Последние 90 дней", lastYear: "Последний год",
  radar: "Радар", radarTitle: "Радар осадков",
  temperatureUnit: "Единица температуры", windUnit: "Единица скорости ветра", pressureUnit: "Единица давления", language: "Язык",
  login: "Войти", signup: "Регистрация", email: "Электронная почта", password: "Пароль", confirmPassword: "Подтвердите пароль", logout: "Выйти",
  loginTitle: "С возвращением", signupTitle: "Создать аккаунт", loginSubtitle: "Войдите, чтобы синхронизировать города",
  noAccount: "Нет аккаунта?", hasAccount: "Уже есть аккаунт?",
};

const dicts: Record<LangCode, Record<TKey, string>> = { en, de, ru };
export function translate(lang: LangCode, key: TKey): string {
  return dicts[lang]?.[key] ?? en[key];
}
