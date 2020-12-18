import React from 'react'
import PropTypes from 'prop-types'

class SidebarAirQualityTab extends React.Component {
  static propTypes = {
    stations: PropTypes.array.isRequired,
    selected: PropTypes.object,
    onSelectStation: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='sidebar-content nopadding'>
        <h2>Qualità dell'aria</h2>
        <ul className='sidebar-webcams-list'>
          {this.props.stations.map((s) => {
            return (
              <li
                className={this.props.selected && this.props.selected.id === s.id ? 'active' : ''}
                style={{ cursor: 'pointer' }}
                key={s.slug}
                onClick={() => { this.props.onSelectStation(s) }}
              >{s.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default SidebarAirQualityTab
