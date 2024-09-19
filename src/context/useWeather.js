import { useEffect } from 'react'
import { useLocation } from './locationContext'

export const useWeather = () => {
  const {
    setGeometry,
    setWeather,
    setData,
    setWeatherCondition,
    weather,
    location,
    setLocation,
    setMyLocation
  } = useLocation()
  console.log('location in context', location)
  const getCurrentLocation = () => {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('position', position);
          const { latitude, longitude } = position.coords;
          setGeometry({ lat: latitude, lng: longitude });
  
          if (location === '') {
            getLocationFromGeometry(latitude, longitude);
          }
  
          getWeather(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      console.timeEnd('getCurrentLocation'); 
    }
  };
  useEffect(() => {
    if (location === '') {
      getCurrentLocation()
    }
  }, [location])
  const getLocation = (loc) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=491c8d3e90304d22a79230a80d1a5caf`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry
        setGeometry(data.results[0].geometry)
        setData(data)
        getWeather(lat, lng)
        setMyLocation(false)
      })
      .catch((error) => {
        console.error('Error fetching location data:', error)
      })
  }
  const getLocationFromGeometry = (lat, lng) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=491c8d3e90304d22a79230a80d1a5caf`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setMyLocation(true)
      })
      .catch((error) => {
        console.error('Error fetching location data:', error)
      })
  }

  const getWeather = (lat, lng) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data)
        getWeatherDescriptionByCode(data.current.weather_code)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error)
      })
  }
  function getWeatherDescriptionByCode(code) {
    let description = ''

    switch (code) {
      case 0:
        description = 'Clear sky'
        break
      case 1:
      case 2:
      case 3:
        description = 'Mainly clear'
        break
      case 45:
      case 48:
        description = 'Fog'
        break
      case 51:
      case 53:
      case 55:
        description = 'Drizzle'
        break
      case 56:
      case 57:
        description = 'Freezing drizzle'
        break
      case 61:
      case 63:
      case 65:
        description = 'Rain'
        break
      case 66:
      case 67:
        description = 'Freezing rain'
        break
      case 71:
      case 73:
      case 75:
        description = 'Snowfall'
        break
      case 77:
        description = 'Snow grains'
        break
      case 80:
      case 81:
      case 82:
        description = 'Rain showers'
        break
      case 85:
      case 86:
        description = 'Snow showers'
        break
      case 95:
        description = 'Thunderstorm'
        break
      case 96:
      case 99:
        description = 'Thunderstorm with hail'
        break
      default:
        description = 'Unknown weather condition'
    }

    setWeatherCondition(description)
    return description
  }

  return { getLocation }
}
