let container = document.getElementById('container');
let searchBoxButton = document.getElementById('searchBoxButton');
let weatherBox = document.getElementById('weatherBox');
let weatherDetails = document.getElementById('weatherDetails');
let error404 = document.getElementById('notFound');

searchBoxButton.addEventListener('click', async () => {

    let APIKey = '4fd3aaea016771bd1e123fdc5aa24a9c';
    let city = document.getElementById('searchBoxInput').value;

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        let json = await response.json();

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        } else {
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
        }

        cityName.innerHTML = city;

        let weatherImg = document.getElementById('weatherImg');
        let weatherTemperature = document.getElementById('weatherTemperature');
        let weatherDescription = document.getElementById('weatherDescription');
        let humidity = document.getElementById('humidity');
        let wind = document.getElementById('wind');

        if (json.weather[0].main === 'Clear') {
            weatherImg.src = 'img/clear.png';
        } else if (json.weather[0].main === 'Rain') {
            weatherImg.src = 'img/rain.png';
        } else if (json.weather[0].main === 'Snow') {
            weatherImg.src = 'img/snow.png';
        } else if (json.weather[0].main === 'Clouds') {
            weatherImg.src = 'img/cloud.png';
        } else if (json.weather[0].main === 'Mist' || json.weather[0].main === 'Haze') {
            weatherImg.src = 'img/mist.png';
        } else {
            weatherImg.src = 'img/clouds.png';
        }

        weatherTemperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
        weatherDescription.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed}Km/h`;

    } catch (error) {
        console.error('An error :', error);
    }
});