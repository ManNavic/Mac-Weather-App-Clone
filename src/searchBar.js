import React, { useEffect, useRef, useState } from 'react'

import SearchIcon from './assets/searchIcon'
import { useLocation } from './context/locationContext'
import { useWeather } from './context/useWeather'

const SearchBar = () => {
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const { location, setLocation, weather } = useLocation()
  const { getLocation } = useWeather()
  const [isFocused, setIsFocused] = useState(false)
  console.log('loc', location)
  console.log('weather', weather)
  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }

  useEffect(() => {
    const input = inputRef.current

    if (input) {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          getLocation(location)
        }
      }

      input.addEventListener('keypress', handleKeyPress)

      return () => {
        input.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [location, getLocation])

  return (
    <div
      className="searchWrapper"
      ref={wrapperRef}
      style={{
        border: isFocused ? '2px solid #1E90FF' : '2px solid transparent'
      }}
    >
      <SearchIcon />
      <input
        placeholder="Search"
        className="input search"
        ref={inputRef}
        value={location}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}

export default SearchBar
