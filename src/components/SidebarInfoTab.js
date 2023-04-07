import React from 'react'
import PropTypes from 'prop-types'
import { isApp } from 'utils/app'

class SidebarInfoTab extends React.Component {
  static propTypes = {
  }

  render () {
    let androidAppInfo = null
    if (isApp()) {
      androidAppInfo = (
        <div>
          <h2>App</h2>
          <p>Per uscire dalla mappa utilizzare il tasto back del dispositivo.</p>
        </div>
      )
    }

    return (
      <div className='sidebar-content'>
        {androidAppInfo}
        <h2>Icone meteo</h2>
        <p>Le icone meteo presenti nell'applicazione sono ricavate a partire dalle API
          meteorologiche di <a href='https://www.met.no/' target='_blank'>MET Norway</a> fornite
          dal Norwegian Meteorological Institute.</p>
        <p>Cliccando sull'icona nel dettaglio stazione si accede alla pagina previsionale
          dalla quale sono state prese le informazioni.</p>
        <h2>Realtime Map</h2>
        <p>Copyright &copy; 2017-{new Date().getFullYear()} TorinoMeteo</p>
      </div>
    )
  }
}

export default SidebarInfoTab
