// Set constants for reference
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// Get Weather functionality
const getWeather = (location) => {
    // Clear output area
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // Fetch weather information
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                // Update output area
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}

// Form event istener
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    getWeather(location)
})