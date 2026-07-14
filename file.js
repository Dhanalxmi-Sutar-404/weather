const apiKey = 'YOUR_API_KEY_HERE'; 
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // Changed to forecast

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    
    if (city === "") return;

    weatherResult.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        console.log("Response status:", response.status); 

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        // Get one forecast per day (every 8th entry = 24 hours)
        let forecastHtml = `<h2>${data.city.name}, ${data.city.country}</h2>`;
        
        for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            
            forecastHtml += `
                <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                    <h3>${date}</h3>
                    <p style="font-size: 20px;">${Math.round(forecast.main.temp)}°C</p>
                    <p>${forecast.weather[0].description}</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                </div>
            `;
        }
        
        weatherResult.innerHTML = forecastHtml;
        
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});
