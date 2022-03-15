import React, { useState, useRef } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

const Weatherform = ({ getAPIFunction, getWeatherFunction }) => {

    // useRef for text input
    const weatherInput = useRef()

    // state variables for main form entry
    const [weatherLocation, setWeatherLocation] = useState('N/A')

    // function to get data from weather api
    const getData = async (e) => {
        // prevent page reload default behavior
        e.preventDefault()

        // guard clause to prevent unnecessary api calls
        if (weatherLocation === "" || weatherLocation === "N/A") {return}

        // console log to document function call with colors

        console.warn("<---getData(weatherform) called...--->")
        console.log("@@@@@ weatherLocation on submit: " + weatherLocation + " @@@@@")

        let passData = await getAPIFunction(weatherLocation)
        console.log(passData)

        // check if passData undefined
        if (passData === undefined) {
            console.error("PASS DATA UNDEFINED")
            weatherInput.current.value = ""
            setWeatherLocation("N/A")
            return
        }

        // check if lat and lon both zero
        if (passData.formLat === 0 && passData.formLon === 0){
            console.error("lat and lon both zero(weatherform)...")
            weatherInput.current.value = ""
            setWeatherLocation("N/A")
            return
        }

        // call passed down function to get api data...
        getWeatherFunction(passData)

        // reset form fields and variables after api call
        weatherInput.current.value = ""
        setWeatherLocation("N/A")
    }


  return (
    <>
        <div className="text-center">
            <form onSubmit={getData}>
                <input ref={weatherInput} onChange={event => setWeatherLocation(event.target.value)} type="text" placeholder="Enter a City..." className="p-1 m-1 border-2 border-white focus:outline-none rounded-xl w-5/6 -translate-y-3"/>
                <button type="submit" className="rounded-full bg-midblue border-2 border-white p-2 m-1 mt-1 hover:scale-105 hover:border-3"><BiSearchAlt size="40"/></button>
            </form>
        </div>
    </>
  )
}

export default Weatherform