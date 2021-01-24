import React from 'react'
import PropTypes from 'prop-types'

const props = {
  air_quality_index: {
    label: 'Indice qualità aria'
  },
  pm1: {
    label: 'PM 1'
  },
  pm25: {
    label: 'PM 2.5'
  },
  pm10: {
    label: 'PM 10'
  }
}

const exProps = {
  current: {
    label: 'corrente'
  },
  max: {
    label: 'massima'
  },
  min: {
    label: 'minima'
  }
}

class SidebarAirQualityTab extends React.Component {
  static propTypes = {
    stations: PropTypes.array.isRequired,
    selected: PropTypes.object,
    quantity: PropTypes.string,
    onSelectStation: PropTypes.func.isRequired,
    changeAirQualityQuantity: PropTypes.func.isRequired
  }

  render () {
    return (
      <div>
        <div className='sidebar-content nopadding'>
          <h2>Qualità dell'aria</h2>
          <ul className='sidebar-quantity-list depth-0'>
            <li key={'air_quality_index'}>
              Indice qualità aria
              <ul className='depth-1'>
                {['current'].map((ex) => {
                  return (
                    <li key={'air_quality_index'}>
                      <a
                        onClick={() => this.props.changeAirQualityQuantity('air_quality_index')}
                        className={'btn btn-controller btn-sm' +
                          (this.props.quantity === 'air_quality_index' ? ' active' : '')}>
                        corrente
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
            {['pm1', 'pm25', 'pm10'].map((q) => {
              return (
                <li key={q}>
                  {props[q].label}
                  <ul className='depth-1'>
                    {['current', 'max', 'min'].map((ex) => {
                      return (
                        <li key={q + ex}>
                          <a
                            onClick={() => this.props.changeAirQualityQuantity(q + (ex === 'current' ? '' : '_' + ex))}
                            className={'btn btn-controller btn-sm' +
                              (this.props.quantity === q + (ex === 'current' ? '' : '_' + ex) ? ' active' : '')}>
                            {exProps[ex].label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
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
