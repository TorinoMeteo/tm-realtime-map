import React from 'react'
import PropTypes from 'prop-types'

class SidebarInfoTab extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <div className='sidebar-content'>
        <h2>Icone meteo</h2>
        <p>Le icone meteo presenti nell'applicazione sono ricavate a partire dalle previsioni
          meteorologiche di <a href='https://www.yr.no' target='_blank'>Yr</a> fornite
          da Meteorological Institute e NRK.</p>
        <p>Cliccando sull'icona nel dettaglio stazione si accede alla pagina previsionale
          dalla quale sono state prese le informazioni.</p>
        <h2>Realtime Map</h2>
        <p>Copyright &copy; 2017 TorinoMeteo</p>
      </div>
    )
  }
}

export default SidebarInfoTab
