import React from 'react'
import PropTypes from 'prop-types'

export class Sidebar extends React.Component {
  static propTypes = {
    changeQuantity: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      displaySidebar: PropTypes.bool
    }),
    map: PropTypes.shape({
      quantity: PropTypes.string
    })
  }

  render () {
    let left = this.props.ui.displaySidebar ? 0 : '-300px'
    return (
      <nav className='nav-sidebar' style={{ left: left }}>
        <ul>
          <li>
            <a onClick={() => this.props.changeQuantity('temperature')}>Temperatura</a>
          </li>
          <li>
            <a onClick={() => this.props.changeQuantity('pressure')}>Pressione</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Sidebar
