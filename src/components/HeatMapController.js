import React from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'

class HeatMapController extends React.Component {
  static propTypes = {
    changeHeatMapStatus: PropTypes.func.isRequired,
    status: PropTypes.shape({
      active: PropTypes.bool
    }),
    view: PropTypes.string.isRequired
  };

  render () {
    return (
      <div>

        <div className='switch-wrapper'>
          <span>OFF</span>
          <Switch
            name={'switch-heatmap-' + this.props.view}
            defaultChecked={this.props.status.active}
            checked={this.props.status.active}
            onChange={() =>
              this.props.changeHeatMapStatus(!this.props.status.active)
            }
          />
          <span>ON</span>
        </div>
      </div>
    )
  }
}

export default HeatMapController
