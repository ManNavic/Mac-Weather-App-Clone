import { useLocation } from '../context/locationContext'

const Header = () => {
  const { location, setLocation, weather, data,weatherCondition,myLocation } = useLocation()
  console.log('myLoc', myLocation)
  return (
    <div>
      <div className="cityName">{myLocation ? 'My Location':data?.results[0].components.city}</div>
      {myLocation && <div className='city'>{data?.results[0].components.city}</div>}
      <div className="temp">
        {weather?.current?.apparent_temperature?.toString().split('.')[0]}°
      </div>
      <div className='conditions'>{weatherCondition}</div>
      <div className='highLow'>
        H:{weather?.daily.apparent_temperature_max[0].toString().split('.')[0]}
        ° L:{weather?.daily.apparent_temperature_min[0].toString().split('.')[0]}°
      </div>
    </div>
  )
}
export default Header
