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
    console.log('MANNAIA', radarLiveHistory)
    return (
      <div className='sidebar-content'>
        <p><i className='ion-information-circled' /> Le impostazioni sono locali al browser!</p>
        <h2>Inizializzazione mappa</h2>
        <p>Puoi scegliere una stazione da mostrare attiva ogni volta che apri la mappa</p>
        <select
          onChange={this.changeInitLiveStation}
          defaultValue={initiLiveStation ? initiLiveStation.id : 0}
          className='custom-select'
        >
          <option value='0'>Nessuna</option>
          {this.props.stations.map((s) => {
            return (
              <option
                key={'option' + s.id}
                value={s.id}
              >
                {s.name}
              </option>
            )
          })}
        </select>
        <h2>Radar</h2>
        <p>Puoi scegliere l'intervallo temporale mostrato per il radar della mappa live</p>
        <select
          onChange={this.changeLiveRadarHistory}
          defaultValue={radarLiveHistory}
          className='custom-select'
        >
          <option value='6'>1 ora</option>
          <option value='12'>2 ore</option>
          <option value='18'>3 ore</option>
          <option value='100'>tutto il giorno</option>
        </select>
        <hr />
        <p>
          <i className='ion-information-circled' />{' '}
          Per vedere gli effetti delle nuove impostazioni è necessario{' '}
          <a onClick={() => location.reload()} href='#'>ricaricare la pagina</a>
        </p>
      </div>
    )
  }
}

export default SidebarInfoTab
