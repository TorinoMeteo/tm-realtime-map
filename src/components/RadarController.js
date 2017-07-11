import React from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'react-slider'
import SwitchButton from 'react-switch-button'
import 'styles/react-switch-button.scss'

class RadarController extends React.Component {
  static propTypes = {
    changeRadarStatus: PropTypes.func.isRequired,
    changeRadarPause: PropTypes.func.isRequired,
    changeRadarFrequency: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    status: PropTypes.shape({
      active: PropTypes.bool,
      preloading: PropTypes.bool,
      image: PropTypes.object,
      pause: PropTypes.bool,
      frequency: PropTypes.number
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      frequency: props.status.frequency
    }
  }

  render () {
    // no images? no controller
    if (!this.props.images.length) {
      return (<span>N.D.</span>)
    }

    let controllers = null
    if (this.props.status.active) {
      controllers = (
        <div className='radar-controllers'>
          <div className='radar-controller-slider'>
            <i className='ion-minus' />
            <ReactSlider
              min={100}
              max={2000}
              step={100}
              invert
              defaultValue={this.state.frequency}
              onChange={(value) => {
                this.setState({ frequency: value })
              }}
              onAfterChange={(value) => {
                this.setState({ frequency: value })
                this.props.changeRadarFrequency(value)
              }}
            >
              <div className='handle'>
                {this.state.frequency / 1000 + 's'}
              </div>
            </ReactSlider>
            <i className='ion-plus-round' />
          </div>
          <div>
            <i
              onClick={() => this.props.changeRadarPause(!this.props.status.pause)}
              className={this.props.status.pause ? 'ion-play' : 'ion-pause'}
            />
          </div>
        </div>
      )
    }

    return (
      <div>
        <SwitchButton
          name={'switch-radar'}
          label='OFF'
          labelRight='ON'
          defaultChecked={this.props.status.active}
          onChange={() => this.props.changeRadarStatus(!this.props.status.active)}
        />
        {controllers}
      </div>
    )
  }
}

export default RadarController
