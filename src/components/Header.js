import React from 'react'


const Header = () => {
  return (
    <div className="bg-darkestblue text-white text-5xl p-3 text-center" >
        <div className="ml-auto mr-auto flex justify-center">
            <div>Whats My Weather?</div>
            <div>⛅</div>
            <div className="text-sm italic absolute top-0 right-0">Powered by OpenWeather API &reg;</div>
        </div>
    </div>
  )
}

export default Header