function getWeatherData(cityName) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=fcc0d01cc9344f61b82161356242401&q=${cityName}&days=7&aqi=no&alerts=no`)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        setWeather(response);
        const hourlyForecast = document.querySelector(".hourly-container");
        hourlyForecast.innerHTML = "";
        const weeklyForecastContainer = document.querySelector(".weekly-forecast-container");
        weeklyForecastContainer.innerHTML = "";


        let hours = 0;

        for (let i = 0; i < 24; i++) {
        
            const date = new Date();

            if (date.getHours() + i > 23) {
                setHourlyForecast(response, 1, hours);
            hours++;
            } else {
                setHourlyForecast(response, 0, date.getHours() + i);
            }

        
        }
    
        for (let i = 0; i < 7; i++) {
            setDailyForecast(response, i);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function setWeather(response) {
    document.querySelector(".city-name").textContent = response.location.name;
    document.querySelector(".temperature").textContent = response.current.temp_c + "°";
    document.querySelector(".description").textContent = response.current.condition.text;
    document.querySelector(".img").innerHTML = `<img width="150px"src="${response.current.condition.icon.slice(21)}">`;

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

function setHourlyForecast(response, indexDay, indexHour) {
    const hourContainer = document.createElement("div");
    const timeElement = document.createElement("p");
    const icon = document.createElement("div");
    const temp = document.createElement("p");

    const date = new Date(response.forecast.forecastday[indexDay].hour[indexHour].time);

    timeElement.textContent = getHourString(date);
    icon.innerHTML = `<img src="${response.forecast.forecastday[indexDay].hour[indexHour].condition.icon.slice(21)}">`;
    temp.textContent = response.forecast.forecastday[indexDay].hour[indexHour].temp_c + "°";

    timeElement.classList.add("time");
    icon.classList.add("icon");
    temp.classList.add("temp");
    hourContainer.classList.add("hourly-forecast");

    hourContainer.append(timeElement, icon, temp);

    const hourlyForecast = document.querySelector(".hourly-container");
    hourlyForecast.append(hourContainer);
}

function setDailyForecast(response, index) {
    const date = new Date(response.forecast.forecastday[index].date);

    const weeklyForecast = document.createElement("div");
    const day = document.createElement("p");
    const icon = document.createElement("div");
    const minTemp = document.createElement("p");
    const maxTemp = document.createElement("p");

    day.textContent = date.toString().slice(0, 3);
    icon.innerHTML = `<img src="${response.forecast.forecastday[index].day.condition.icon.slice(21)}">`;
    minTemp.textContent = response.forecast.forecastday[index].day.mintemp_c + "°";
    maxTemp.textContent = response.forecast.forecastday[index].day.maxtemp_c + "°";

    weeklyForecast.classList.add("weekly-forecast");
    day.classList.add("day");
    icon.classList.add("icon");
    minTemp.classList.add("min-temp");
    maxTemp.classList.add("max-temp");

    weeklyForecast.append(day, icon, minTemp, maxTemp);

    const weeklyForecastContainer = document.querySelector(".weekly-forecast-container");
    weeklyForecastContainer.append(weeklyForecast);
}

function getHourString(date) {
    let hours = date.getHours();
    if (hours === 0) {
        return "12am"
    } else if (hours < 12) {
        return hours + "am";
    } else if (hours == 12) {
        return "12pm";
    } else {
        return (hours - 12) + "pm";
    }
}

getWeatherData("london");

document.querySelector(".search-btn").addEventListener("click", () => {
    getWeatherData(document.querySelector("input").value);
    document.querySelector("input").value = "";
});
