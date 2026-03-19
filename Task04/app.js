const apikey = 'df747cbf8963e5de0a900dabdb5817e6'

const inputBar = document.getElementById('inputBar')
const inputBtn = document.getElementById('inputBtn')
const error = document.getElementById('error')
const weatherResult = document.getElementById('weatherResult')

const renderWeather = (data) => {
    weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].main}</p>
    `
}

const fetchData = async (city) => {
    try {
        error.textContent = ''
        weatherResult.innerHTML = ''

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
        )

        if (!response.ok) {
            throw new Error('City not found. Please enter a valid city name.')
        }

        const data = await response.json()
        renderWeather(data)
    } catch (err) {
        error.textContent = err.message || 'Something went wrong.'
    }
}

const handleSearch = async () => {
    const city = inputBar.value.trim()

    if (!city) {
        error.textContent = 'City name is required.'
        weatherResult.innerHTML = ''
        return
    }

    await fetchData(city)
}

inputBtn.addEventListener('click', handleSearch)

inputBar.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        await handleSearch()
    }
})