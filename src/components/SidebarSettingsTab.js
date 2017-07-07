import React from 'react'
import PropTypes from 'prop-types'
import * as Db from 'utils/db'

class SidebarInfoTab extends React.Component {
  static propTypes = {
    stations: PropTypes.array.isRequired
  }

  constructor () {
    super()
    this.changeInitLiveStation = this.changeInitLiveStation.bind(this)
    this.changeLiveRadarHistory = this.changeLiveRadarHistory.bind(this)
  }

  changeInitLiveStation (event) {
    let value = parseInt(event.target.value)
    if (value) {
      Db.store('initLiveStation', this.props.stations.filter(s => s.id === value)[0])
    } else {
      Db.remove('initLiveStation')
    }
  }

  changeLiveRadarHistory (event) {
    let value = parseInt(event.target.value)
    Db.store('radarLiveHistory', value)
  }

  render () {
    let initiLiveStation = Db.get('initLiveStation') || null
    let radarLiveHistory = Db.get('radarLiveHistory') || 20
    return (
      <div className='sidebar-content'>
        <p><i className='ion-information-circled' /> Le impostazioni sono locali al browser!</p>
        <h2>Inizializzazione mappa</h2>
        <p>Puoi scegliere una stazione da mostrare attiva ogni volta che apri la mappa</p>
        <select onChange={this.changeInitLiveStation} className='custom-select'>
          <option value='0'>Nessuna</option>
          {this.props.stations.map((s) => {
            let selected = initiLiveStation && initiLiveStation.id === s.id
            return (
              <option
                key={'option' + s.id}
                selected={selected}
                value={s.id}
              >
                {s.name}
              </option>
            )
          })}
        </select>
        <h2>Radar</h2>
        <p>Puoi scegliere l'intervallo temporale mostrato per il radar della mappa live</p>
        <select onChange={this.changeLiveRadarHistory} className='custom-select'>
          <option value='6' selected={radarLiveHistory === 8}>1 ora</option>
          <option value='12' selected={radarLiveHistory === 14}>2 ore</option>
          <option value='18' selected={radarLiveHistory === 20}>3 ore</option>
          <option value='0' selected={radarLiveHistory === 0}>tutto il giorno</option>
        </select>
      </div>
    )
  }
}

export default SidebarInfoTab
