import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo.png'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'styles/react-datepicker.scss'
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
    let title
    if (this.props.map.view === 'live') {
      title = this.props.stations.length
        ? this.props.stations.length + ' stazioni (' + this.props.stations.filter(s => !s.offline).length + ' online)'
        : ''
    } else if (this.props.map.view === 'history') {
      let date = moment(
        this.props.map.history.year + '-' + this.props.map.history.month + '-' + this.props.map.history.day, 'Y-M-D'
      )
      title = (
        <div>
          <span>
            <i className='ion-calendar' onClick={this.toggleCalendar} style={{ cursor: 'pointer' }} />
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
        </div>
      )
    } else if (this.props.map.view === 'webcams') {
      title = 'Webcam'
    }

    let togglerClass = this.props.ui.displaySidebar ? 'ion-ios-close-empty' : 'ion-navicon'

    return (
      <nav className='navbar navbar-inverse bg-inverse app-navbar'>
        <button className='navbar-toggler' type='button' onClick={this.props.toggleSidebar}>
          <i className={togglerClass} />
        </button>
        <span className='navbar-title'>
          {title}
        </span>
        <a className='navbar-brand' href='#'><img src={Logo} alt='TorinoMeteo' /></a>
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
    history: PropTypes.shape({
      year: PropTypes.string | PropTypes.number,
      month: PropTypes.string | PropTypes.number,
      day: PropTypes.string | PropTypes.number
    })
  }),
  stations: PropTypes.array
}

export default Toolbar
