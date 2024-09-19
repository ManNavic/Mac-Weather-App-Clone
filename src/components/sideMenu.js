const SideMenu = () => {
    const openSide = true
  return (
    <div className={openSide ? 'side menu' : 'side closed'}>
      <div className="side cards">
        <div className="side card">
          <div className="card info">
            <div>
              <p className="card location">Arnhem</p>
              <p className="card time">18:20</p>
            </div>

            <p className="card conditions">Rainy</p>
          </div>
          <div className="card info">
            <p className="card temp">20°</p>
            <p className="card highLow">H:10° L:20°</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SideMenu
