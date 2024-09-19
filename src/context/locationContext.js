import React, { createContext, useContext, useState } from 'react'

const LocationContext = createContext()

export const useLocation = () => {
  return useContext(LocationContext)
}

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState(null)
  const [myLocation, setMyLocation] = useState(null)
  const [geometry, setGeometry] = useState(null)
  const [data, setData] = useState(null)
  const [weatherCondition, setWeatherCondition] = useState('')
  const value = {
    location,
    setLocation,
    weather,
    setWeather,
    geometry,
    setGeometry,
    data,
    setData,
    setWeatherCondition,
    weatherCondition,
    myLocation,
    setMyLocation
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
