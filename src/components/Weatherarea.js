import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Resultsarea from './Resultsarea'
import Weatherform from './Weatherform'

const Weatherarea = () => {
    // example openweather direct geocoding api call
    // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API Key}
    // fields in response: name, lat, lon, country, state
    // lat and lon used in api call to openweather map

    // Los Angeles, Denver, London -test values

    // example openweather weather data call
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    // add optional imperial units of measurement(&units=imperial)
    // desired fields [weather][description]/[main][temp]&[humidity]&[feels_like]
    // [name]/[wind][speed]

    // TODO:
    // ADD A BUTTON LATER TO SWITCH BETWEEN FARENHEIGHT AND CELCIUS
    // solution must affect how resultsarea prints out text...
    // ADD A TRY CATCH TO DEAL WITH BAD QUERIES
    // test out multiple garbage queries...
    // FIX APIDATA FIRST CALL BEING GARBAGE
    // first query always is bad lat 0, lon 0, query

    // Resultsarea is always one query behind the user input...
    // first call uses 0,0 as lat and lon which makes function fail
    // form calls function -> api gets lat and lon -> stops
    // fn() called again -> api gets data for old lat and lon -> new lat and lon grabbed from new name

    // state variables for latitude and longitude for api calls
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)

    // api key const
    const apiKey = "a5b4f143e7feeb0356379b4d6439792f"

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