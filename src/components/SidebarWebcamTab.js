import React from 'react'
import PropTypes from 'prop-types'

class SidebarWebcamTab extends React.Component {
  static propTypes = {
    webcams: PropTypes.array.isRequired,
    selected: PropTypes.object,
    onSelectWebcam: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='sidebar-content nopadding'>
        <h2>Webcams</h2>
        <ul className='sidebar-webcams-list'>
          {this.props.webcams.map((w) => {
            return (
              <li
                className={this.props.selected && this.props.selected.id === w.id ? 'active' : ''}
                style={{ cursor: 'pointer' }}
                key={w.slug}
                onClick={() => { this.props.onSelectWebcam(w) }}
              >{w.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default SidebarWebcamTab
