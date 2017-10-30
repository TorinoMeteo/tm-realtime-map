import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export class SidebarForecastTab extends React.Component {
  render () {
    let dates = []
    for (let i = 0, len = 6; i < len; i++) {
      let date = moment().add(1 + i, 'days')
      dates.push(date)
    }
    return (
      <div className='sidebar-forecast-tab'>
        <ul className='sidebar-webcams-list'>
          {dates.map((d) => {
            return (
              <li
                className={this.props.date.format('YMD') === d.format('YMD') ? 'active' : ''}
                style={{ cursor: 'pointer' }}
                key={d.format('X')}
                onClick={() => { this.props.changeForecastDate(d) }}
              >{d.format('LL')}</li>
            )
          })}
        </ul>
        <p className='ml-3'><i>Fonte: apixu.com</i></p>
      </div>
    )
  }
}

SidebarForecastTab.propTypes = {
  changeForecastDate: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired
}

export default SidebarForecastTab
