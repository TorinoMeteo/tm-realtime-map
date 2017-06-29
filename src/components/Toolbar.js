import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo.png'
import { labelAndUnit } from 'config/units'

export const Toolbar = (props) => (
  <nav className='navbar navbar-inverse bg-inverse app-navbar'>
    <button className='navbar-toggler' type='button' onClick={props.toggleSidebar}>
      <i className='ion-navicon' />
    </button>
    <span className='navbar-title'>{labelAndUnit[props.map.quantity]}</span>
    <a className='navbar-brand' href='#'><img src={Logo} alt='TorinoMeteo' /></a>
  </nav>
)

Toolbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  map: PropTypes.shape({
    quantity: PropTypes.string
  })
}

export default Toolbar
