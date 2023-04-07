import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo.png'
import moment from 'moment'
/* eslint-disable */
import { tz } from "moment-timezone";
/* eslint-enable */
import DatePicker from 'react-datepicker'
import RadarLegend from 'components/RadarLegend'
import 'styles/react-datepicker.scss'
import { periodMap } from 'utils/forecast'
import { isApp } from 'utils/app'
moment.locale('it')

class Toolbar extends React.Component {
  constructor () {
    super()
    this.state = {
      calendarIsOpen: false
    }
    this.toggleCalendar = this.toggleCalendar.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.props.changeHistoryDate(
      date.format('Y'),
      date.format('M'),
      date.format('D')
    )
    this.toggleCalendar()
  }

  toggleCalendar (e) {
    e && e.preventDefault()
    this.setState({ calendarIsOpen: !this.state.calendarIsOpen })
  }

  render () {
    let map = this.props.map
    let title
    if (map.view === 'live') {
      if (map.live.radar.active) {
        title = map.live.radar.image ? (
          <div>
            Radar <i className='ion-clock' />{' '}
            {moment(map.live.radar.image.datetime).format('HH:mm')}&nbsp; mm/h
            <RadarLegend />
          </div>
        ) : (
          'Radar'
        )
      } else {
        title = this.props.stations.length
          ? this.props.stations.length +
            ' stazioni (' +
            this.props.stations.filter(s => !s.offline).length +
            ' online)'
          : ''
      }
    } else if (map.view === 'history') {
      let radarTitle = null
      if (map.history.radar.active) {
        radarTitle = map.history.radar.image ? (
          <div>
            Radar <i className='ion-clock' />{' '}
            {moment(map.history.radar.image.datetime).format('HH:mm')}
          </div>
        ) : (
          'Radar'
        )
      }
      let date = moment(
        map.history.year + '-' + map.history.month + '-' + map.history.day,
        'Y-M-D'
      )
      title = (
        <div>
          <span>
            <i
              className='ion-calendar'
              onClick={this.toggleCalendar}
              style={{ cursor: 'pointer' }}
            />
            {' ' + date.format('LL') + ' '}
          </span>
          {this.state.calendarIsOpen && (
            <DatePicker
              selected={date}
              onChange={this.handleChange}
              withPortal
              inline
              showYearDropdown
              allowSameDay
              dropdownMode='select'
              minDate={moment('2010-08-01')}
              maxDate={moment().subtract(1, 'day')}
            />
          )}
          {radarTitle}
        </div>
      )
    } else if (map.view === 'forecast') {
      title = 'Previsioni ' + this.props.map.forecast.date.format('LL') + ', ' + periodMap[this.props.map.forecast.period]
    } else if (map.view === 'webcams') {
      title = 'Webcam'
    }

    let togglerClass = this.props.ui.displaySidebar
      ? 'ion-ios-close-empty'
      : 'ion-navicon'

    let logo = (
      <a className='navbar-brand' href='https://www.torinometeo.org'>
        <img src={Logo} alt='TorinoMeteo' />
      </a>
    )
    let navClasses = 'navbar navbar-inverse bg-inverse app-navbar'
    if (isApp()) {
      logo = null
      navClasses = 'navbar navbar-inverse bg-android app-navbar'
    }

    return (
      <nav className={navClasses}>
        <button
          className='navbar-toggler'
          type='button'
          onClick={this.props.toggleSidebar}
        >
          <i className={togglerClass} />
        </button>
        <span className='navbar-title'>{title}</span>
        {logo}
      </nav>
    )
  }
}

Toolbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  changeHistoryDate: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    displaySidebar: PropTypes.bool
  }),
  map: PropTypes.shape({
    view: PropTypes.string,
    live: PropTypes.shape({
      radar: PropTypes.shape({
        active: PropTypes.bool,
        preloading: PropTypes.bool,
        pause: PropTypes.bool,
        image: PropTypes.object,
        frequency: PropTypes.numer
      })
    }),
    history: PropTypes.shape({
      year: PropTypes.string | PropTypes.number,
      month: PropTypes.string | PropTypes.number,
      day: PropTypes.string | PropTypes.number,
      radar: PropTypes.shape({
        active: PropTypes.bool,
        preloading: PropTypes.bool,
        pause: PropTypes.bool,
        image: PropTypes.object,
        frequency: PropTypes.numer
      })
    }),
    forecast: PropTypes.shape({
      date: PropTypes.object.isRequired
    })
  }),
  stations: PropTypes.array
}

export default Toolbar
