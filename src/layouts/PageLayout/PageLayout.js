import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from 'containers/ToolbarContainer'
import Refresh from 'containers/RefreshContainer'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='app'>
    <Toolbar />
    {children}
    <Refresh />
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node
}

export default PageLayout
