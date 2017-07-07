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
  }

  changeInitLiveStation (event) {
    let value = parseInt(event.target.value)
    if (value) {
      Db.store('initLiveStation', this.props.stations.filter(s => s.id === value)[0])
    } else {
      Db.remove('initLiveStation')
    }
  }

  render () {
    let initiLiveStation = Db.get('initLiveStation') || null
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
      </div>
    )
  }
}

export default SidebarInfoTab
