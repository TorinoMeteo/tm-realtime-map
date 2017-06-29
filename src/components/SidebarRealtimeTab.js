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
        {['temperature', 'pressure', 'dewpoint'].map((q) => {
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
      </ul>
    </div>
  )
}

SidebarRealtimeTab.propTypes = {
  quantity: PropTypes.string.isRequired,
  changeQuantity: PropTypes.func.isRequired
}

export default SidebarRealtimeTab
