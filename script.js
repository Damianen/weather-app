fetch("http://api.weatherapi.com/v1/forecast.json?key=fcc0d01cc9344f61b82161356242401&q=Tilburg&days=7&aqi=no&alerts=no")
.then(function(response) {
    return response.json();
})
.then(function(response) {
    setWeather(response);
})
.catch(function(err) {
    console.log(err);
});

function setWeather(response) {
    document.querySelector(".city-name").textContent = response.location.name;
    document.querySelector(".temperature").textContent = response.current.temp_c + "°";
    document.querySelector(".description").textContent = response.current.condition.text;

    document.querySelector(".next-time").textContent = response.forecast.forecastday[1].astro.sunset;
    document.querySelector(".other-time").textContent = "sunrise: " + response.forecast.forecastday[1].astro.sunrise;

    document.querySelector(".uv-now").textContent = response.current.uv;

    document.querySelector(".humidity-percentage").textContent = response.current.humidity + "%";

    document.querySelector(".wind-direction").textContent = response.current.wind_dir;
    document.querySelector(".wind-speed").textContent = response.current.wind_kph + " km/h";

    document.querySelector(".rainfall-amount").textContent = response.current.precip_in + '"';

    document.querySelector(".moon-phase").textContent = response.forecast.forecastday[1].astro.moon_phase;
    document.querySelector(".moon-rise-set").textContent = "moonrise: " + response.forecast.forecastday[1].astro.moonrise;
}

function setHourlyForecast(response) {
    const hourContainer = document.createElement("div");
    const time = document.createElement("p");
    const icon = document.createElement("div");
    const temp = document.createElement("p");

    time.textContent = "1pm";
    icon.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 96 96" height="96px" version="1.1" viewBox="0 0 96 96" width="96px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Dibujo"><g><path d="M66,40c-0.507,0-1.112,0.079-1.688,0.184C62.217,33.012,55.663,28,48,28s-14.218,5.012-16.311,12.184    C31.112,40.079,30.507,40,30,40c-6.065,0-11,4.935-11,11s4.935,11,11,11c1.104,0,2-0.896,2-2s-0.896-2-2-2c-3.86,0-7-3.141-7-7    s3.14-7,7-7c0.277,0,0.723,0.068,1.193,0.162V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-3.221C36.267,36.527,41.63,32,48,32    s11.732,4.527,12.807,10.779V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.838C65.277,44.068,65.722,44,66,44c3.859,0,7,3.141,7,7    s-3.141,7-7,7c-1.104,0-2,0.896-2,2s0.896,2,2,2c6.065,0,11-4.935,11-11S72.065,40,66,40z"/><path d="M49.485,52.06c-1.073-0.27-2.158,0.384-2.426,1.455l-6,24c-0.268,1.072,0.384,2.157,1.455,2.426    C42.677,79.981,42.84,80,43.001,80c0.896,0,1.711-0.606,1.939-1.515l6-24C51.208,53.413,50.557,52.328,49.485,52.06z"/><path d="M57.484,58.06c-1.072-0.271-2.157,0.384-2.425,1.455l-3,12c-0.268,1.072,0.384,2.158,1.456,2.426    c0.163,0.041,0.326,0.06,0.486,0.06c0.896,0,1.712-0.606,1.939-1.515l2.999-12C59.208,59.413,58.556,58.327,57.484,58.06z"/><path d="M38.484,58.06c-1.069-0.271-2.157,0.384-2.425,1.455l-3,12c-0.268,1.072,0.384,2.158,1.456,2.426    c0.163,0.041,0.326,0.06,0.486,0.06c0.896,0,1.712-0.606,1.939-1.515l3-12C40.208,59.413,39.556,58.327,38.484,58.06z"/></g></g></svg>`;
    temp.textContent = "30°";

    time.classList.add("time");
    icon.classList.add("icon");
    temp.classList.add("temp");
    hourContainer.classList.add("hourly-forecast");

    hourContainer.append(time, icon, temp);

    const hourlyForecast = document.querySelector(".hourly-container");
    hourlyForecast.append(hourContainer);
}

function setDailyForecast(response) {
    const weeklyForecast = document.createElement("div");
    const day = document.createElement("p");
    const icon = document.createElement("div");
    const minTemp = document.createElement("p");
    const maxTemp = document.createElement("p");

    day.textContent = "Mon";
    icon.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 96 96" height="96px" version="1.1" viewBox="0 0 96 96" width="96px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Dibujo"><g><path d="M69,44c2.206,0,4,1.794,4,4s-1.794,4-4,4H48c-1.105,0-2,0.896-2,2s0.895,2,2,2h21c4.411,0,8-3.589,8-8s-3.589-8-8-8    c-1.105,0-2,0.896-2,2S67.895,44,69,44z"/><path d="M66,58l-30.001-0.001L30,58c-3.859,0-7-3.141-7-7s3.141-7,7-7c0.277,0,0.724,0.068,1.194,0.162V46c0,1.104,0.896,2,2,2    s2-0.896,2-2v-3.224C36.269,36.525,41.631,32,48,32c7.168,0,13,5.832,13,13v1c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-1    c0-9.374-7.626-17-17-17c-7.664,0-14.219,5.012-16.312,12.184C31.112,40.079,30.507,40,30,40c-6.065,0-11,4.935-11,11    s4.935,11,11,11l5.999-0.001L66,62c3.859,0,7,3.141,7,7c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C77,62.935,72.065,58,66,58z"/><path d="M65.999,64H30c-1.105,0-2,0.896-2,2s0.895,2,2,2h35.999c0.552,0,1,0.448,1,1s-0.448,1-1,1c-1.105,0-2,0.896-2,2    s0.895,2,2,2c2.757,0,5-2.243,5-5S68.756,64,65.999,64z"/><path d="M80,50c-1.105,0-2,0.896-2,2s0.895,2,2,2c0.552,0,1,0.448,1,1s-0.448,1-1,1h-4c-1.105,0-2,0.896-2,2s0.895,2,2,2h4    c2.757,0,5-2.243,5-5S82.757,50,80,50z"/></g></g></svg>`;
    minTemp.textContent = "20°";
    maxTemp.textContent = "30°";

    weeklyForecast.classList.add("weekly-forecast");
    day.classList.add("day");
    icon.classList.add("icon");
    minTemp.classList.add("min-temp");
    maxTemp.classList.add("max-temp");

    weeklyForecast.append(day, icon, minTemp, maxTemp);

    const weeklyForecastContainer = document.querySelector(".weekly-forecast-container");
    weeklyForecastContainer.append(weeklyForecast);
}

for (let i = 0; i < 24; i++) {
    setHourlyForecast(1);
}

for (let i = 0; i < 6; i++) {
    setDailyForecast(0);
}