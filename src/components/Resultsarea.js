import React, { useEffect, useState } from 'react'

const Resultsarea = ( weatherInfo ) => {
    // this component loads information from api into nice looking div...
    // an emoji and large text should pop up after the search happens...


    // useEffect(() => {
    //     console.log("<------Resultsarea has been reloaded...------>")
    // }, [])
  return (
    <>
        <div className="flex justify-center">
            <div className="bg-darkblue mr-2 ml-1 text-white p-4 m-4 text-left max-w-fit text-4xl rounded-xl drop-shadow-xl">
                <div className="mb-1"><strong>Location:</strong> {weatherInfo["weatherInfo"]["name"]}, {weatherInfo["weatherInfo"]["sys"]["country"]}</div>
                <div className="mb-1"><strong>Current Weather:</strong> {weatherInfo["weatherInfo"]["weather"][0]["description"]}</div>
                <div className="mb-1"><strong>Temperature:</strong> {JSON.stringify(weatherInfo["weatherInfo"]["main"]["temp"])}F</div>
                <div className="mb-1"><strong>Humidity:</strong> {JSON.stringify(weatherInfo["weatherInfo"]["main"]["humidity"])}%</div>
                <div className="mb-1"><strong>Feels Like:</strong> {JSON.stringify(weatherInfo["weatherInfo"]["main"]["feels_like"])}F</div>
                <div className="mb-1"><strong>Wind Speeds:</strong> {weatherInfo["weatherInfo"]["wind"]["speed"]} Miles Per Hour</div>
            </div>
        </div>
    </>
  )
}

export default Resultsarea