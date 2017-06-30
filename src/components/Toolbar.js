import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo.png'

export const Toolbar = (props) => (
  <nav className='navbar navbar-inverse bg-inverse app-navbar'>
    <button className='navbar-toggler' type='button' onClick={props.toggleSidebar}>
      <i className='ion-navicon' />
    </button>
    <span className='navbar-title'>
      {props.stations.length
        ? props.stations.length + ' stazioni (' + props.stations.filter(s => !s.offline).length + ' online)'
        : ''}
    </span>
    <a className='navbar-brand' href='#'><img src={Logo} alt='TorinoMeteo' /></a>
  </nav>
)

Toolbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  // map: PropTypes.shape({
  //   quantity: PropTypes.string
  // }),
  stations: PropTypes.array
}

export default Toolbar
