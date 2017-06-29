import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from 'containers/ToolbarContainer'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='app'>
    <Toolbar />
    {children}
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node
}

export default PageLayout
