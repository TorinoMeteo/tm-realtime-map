import React from 'react'
import PropTypes from 'prop-types'

const qProps = {
  temperature: {
    icon: 'wi wi-thermometer',
    label: 'Temperatura'
  },
  pressure: {
    icon: 'wi wi-barometer',
    label: 'Pressione'
  },
  relative_humidity: {
    icon: 'wi wi-humidity',
    label: 'Umidità relativa'
  },
  dewpoint: {
    icon: 'wi wi-raindrop',
    label: 'Dewpoint'
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

export const SidebarRealtimeTab = (props) => {
  let changeQuantity = props.changeQuantity // avoid warnings
  let quantity = props.quantity
  return (
    <div>
      <ul className='sidebar-quantity-list depth-0'>
        {['temperature', 'pressure', 'relative_humidity', 'dewpoint'].map((q) => {
          return (
            <li key={q}>
              <i className={qProps[q].icon} />
              {qProps[q].label}
              <ul className='depth-1'>
                {['current', 'max', 'min'].map((ex) => {
                  return (
                    <li key={q + ex}>
                      <a
                        onClick={() => changeQuantity(q + (ex === 'current' ? '' : '_' + ex))}
                        className={'btn btn-controller btn-sm' +
                          (quantity === q + (ex === 'current' ? '' : '_' + ex) ? ' active' : '')}>
                        {exProps[ex].label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
        <li key='rain_rate'>
          <i className='wi wi-raindrops' />
          Intensità precipitazione
          <ul className='depth-1'>
            <li>
              <a
                onClick={() => changeQuantity('rain_rate')}
                className={'btn btn-controller btn-sm' +
                  (quantity === 'rain_rate' ? ' active' : '')}>
                  corrente
              </a>
            </li>
          </ul>
        </li>
        <li key='rain'>
          <i className='wi wi-umbrella' />
          Precipitazione
          <ul className='depth-1'>
            <li>
              <a
                onClick={() => changeQuantity('rain')}
                className={'btn btn-controller btn-sm' +
                  (quantity === 'rain' ? ' active' : '')}>
                  odierna
              </a>
            </li>
          </ul>
        </li>
        <li key='wind'>
          <i className='wi wi-windy' />
          Vento
          <ul className='depth-1'>
            <li>
              <a
                onClick={() => changeQuantity('wind')}
                className={'btn btn-controller btn-sm' +
                  (quantity === 'wind' ? ' active' : '')}>
                  corrente
              </a>
            </li>
            <li>
              <a
                onClick={() => changeQuantity('wind_max')}
                className={'btn btn-controller btn-sm' +
                  (quantity === 'wind_max' ? ' active' : '')}>
                  massimo
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

SidebarRealtimeTab.propTypes = {
  quantity: PropTypes.string.isRequired,
  changeQuantity: PropTypes.func.isRequired
}

export default SidebarRealtimeTab
