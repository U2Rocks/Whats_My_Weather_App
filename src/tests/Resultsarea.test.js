import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Resultsarea from '../components/Resultsarea'
import React from 'react'

// test does not pass... 
// but components are displayed properly when app is run

describe("Basic component implementation works", () => {
    it("component loads data from passed object", () => {
        
        const weatherInfo = {
            "weather" : [{"description" : "clear sky"}],
            "main" : { "temp" : 75, "humidity" : 55, "feels_like" : 72 },
            "wind" : {"speed" : 10},
            "name" : "Fake Location",
            "sys": { "country" : "US" }
        } 

        render(<Resultsarea weatherInfo={weatherInfo}/>)

        const locationDiv = screen.getByText(/Location:/i)
        const weatherDiv = screen.getByText(/Current Weather:/i)
        const temperatureDiv = screen.getByText(/Temperature:/i)
        const humidityDiv = screen.getByText(/Humidity:/i)
        const feelsDiv = screen.getByText(/Feels Like:/i)
        const windDiv = screen.getByText(/Wind Speeds:/i)

        expect(locationDiv.textContent).toEqual("Location: Fake Location, US")
        expect(weatherDiv.textContent).toEqual("Current Weather: clear sky")
        expect(temperatureDiv.textContent).toEqual("Temperature: 75F")
        expect(humidityDiv.textContent).toEqual("Humidity: 55%")
        expect(feelsDiv.textContent).toEqual("Feels Like: 72F")
        expect(windDiv.textContent).toEqual("Wind Speeds: 10 Miles Per Hour")
    })
})