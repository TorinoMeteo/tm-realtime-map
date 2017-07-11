import React from 'react'
import PropTypes from 'prop-types'
import SwitchButton from 'react-switch-button'
import 'styles/react-switch-button.scss'

class HeatMapController extends React.Component {
  static propTypes = {
    changeHeatMapStatus: PropTypes.func.isRequired,
    status: PropTypes.shape({
      active: PropTypes.bool
    }),
    view: PropTypes.string.isRequired
  }

  render () {
    return (
      <div>
        <SwitchButton
          name={'switch-heatmap-' + this.props.view}
          label='OFF'
          labelRight='ON'
          defaultChecked={this.props.status.active}
          onChange={() => this.props.changeHeatMapStatus(!this.props.status.active)}
        />
      </div>
    )
  }
}

export default HeatMapController
