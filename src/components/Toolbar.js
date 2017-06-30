import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo.png'
import moment from 'moment'
moment.locale('it')

export const Toolbar = (props) => {
  let title
  if (props.map.view === 'live') {
    title = props.stations.length
      ? props.stations.length + ' stazioni (' + props.stations.filter(s => !s.offline).length + ' online)'
      : ''
  } else if (props.map.view === 'history') {
    let date = moment(props.map.history.year + '-' + props.map.history.month + '-' + props.map.history.day, 'Y-M-D')
    title = date.format('LL')
  }
  return (
    <nav className='navbar navbar-inverse bg-inverse app-navbar'>
      <button className='navbar-toggler' type='button' onClick={props.toggleSidebar}>
        <i className='ion-navicon' />
      </button>
      <span className='navbar-title'>
        {title}
      </span>
      <a className='navbar-brand' href='#'><img src={Logo} alt='TorinoMeteo' /></a>
    </nav>
  )
}

Toolbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
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
