import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Resultsarea from './Resultsarea'
import Weatherform from './Weatherform'

const Weatherarea = () => {
    
    // state variables for latitude and longitude for api calls
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)

    // api key const
    const apiKey = "<OPEN WEATHER API KEY HERE>"

    // emoji library
    const emoji = require('emoji-dictionary')

    // state variable for data object
    const [weatherData, setWeatherData] = useState(
        {
            "weather" : [{"description" : "clear sky"}],
            "main" : { "temp" : 75, "humidity" : 55, "feels_like" : 72 },
            "wind" : {"speed" : 10},
            "name" : "Fake Location",
            "sys": { "country" : "US" }
        }
        )

    useEffect(() => {
        console.log("WEATHER AREA RELOADED")
        console.log("THE NEXT LOG IS THE CURRENT WEATHERDATA")
        console.warn(weatherData)
    }, [weatherData])

    
    // this function only gets lat and lon and should be called first
    const apiData = async ( locationName ) => {
        let newLat
        let newLon
        console.log("%cApiData function(Weatherarea) has started working...", "color:green")
        
        let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=${apiKey}`)
        try{
        newLat = response.data[0]["lat"]
        newLon = response.data[0]["lon"]
        console.warn(`The lat: ${newLat} and lon: ${newLon} are for ${locationName}`)
        } catch (error) {
            console.error("BAD QUERY")
            return { formLat: 0, formLon: 0 }
        }
        console.log("ApiData function(Weatherarea) has ended...")
        return {formLat: newLat, formLon: newLon}
    }

    // call function in form after getting lat and lon from apiData
    const getWeatherData = async (coordinates) => {
        console.log("%cWeatherData function(Weatherarea) has started...", "color:green")
        let finalresponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.formLat}&lon=${coordinates.formLon}&appid=${apiKey}&units=imperial`)
        console.log(finalresponse)
        setWeatherData(finalresponse.data)
        console.log("WeatherData function(Weatherarea) has ended...")
    }

  return (
    <>
        <Weatherform getAPIFunction={apiData} getWeatherFunction={getWeatherData}/>
        <Resultsarea weatherInfo={weatherData}/>
    </>
  )
}

export default Weatherarea
