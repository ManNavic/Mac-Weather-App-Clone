import './App.css'
import SearchBar from './searchBar'
import { useLocation } from './context/locationContext'
import SideMenuIcon from './assets/sidemenu'
import Header from './components/header'
import { useState } from 'react'
import SideMenu from './components/sideMenu'

function App() {
  const [openSide, setOpenSide]= useState(false)
  console.log('side',openSide)
  return (
    <div className="App">
<SideMenu openSide={openSide}/>
      <div style={{width: '100%'}}>
        <div className="searchbarContainer">
        {' '}
        <SearchBar />
      </div>
      <div className="side icon" onClick={()=> setOpenSide(!openSide)}>
        <SideMenuIcon />
      </div>
      <Header />

      <div>
        <div className="info container">
          <div className="hourly">hourly temp</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
