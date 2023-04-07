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
              >
                {d.format('LL')}
                <ul>
                  <li
                    className={this.props.date.format('YMD') === d.format('YMD') && this.props.period === 0 ? 'active' : ''}
                    style={{ cursor: 'pointer' }}
                    key={0}
                    onClick={() => { this.props.changeForecastDate(d, 0) }}
                  >
                    00:00 - 06:00
                  </li>
                  <li
                    className={this.props.date.format('YMD') === d.format('YMD') && this.props.period === 1 ? 'active' : ''}
                    style={{ cursor: 'pointer' }}
                    key={1}
                    onClick={() => { this.props.changeForecastDate(d, 1) }}
                  >
                    06:00 - 12:00
                  </li>
                  <li
                    className={this.props.date.format('YMD') === d.format('YMD') && this.props.period === 2 ? 'active' : ''}
                    style={{ cursor: 'pointer' }}
                    key={2}
                    onClick={() => { this.props.changeForecastDate(d, 2) }}
                  >
                    12:00 - 18:00
                  </li>
                  <li
                    className={this.props.date.format('YMD') === d.format('YMD') && this.props.period === 3 ? 'active' : ''}
                    style={{ cursor: 'pointer' }}
                    key={3}
                    onClick={() => { this.props.changeForecastDate(d, 3) }}
                  >
                    18:00 - 24:00
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
        <p className='ml-3'><i>Fonte: <a href="https://www.met.no/" target='_blank'>MET Norway</a></i></p>
      </div>
    )
  }
}

SidebarForecastTab.propTypes = {
  changeForecastDate: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  period: PropTypes.number.isRequired
}

export default SidebarForecastTab
