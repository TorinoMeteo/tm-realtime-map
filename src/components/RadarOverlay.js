import React from 'react'
import PropTypes from 'prop-types'
import {
  OverlayView
} from 'react-google-maps'
var Preload = require('react-preload').Preload

const STYLES = {
  overlayView: {
    // background: `red`,
    height: '100%',
    width: '100%'
  }
}

class RadarOverlay extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    preloading: PropTypes.bool,
    pause: PropTypes.bool,
    frequency: PropTypes.number,
    images: PropTypes.array,
    activeImage: PropTypes.object,
    changeRadarPreloading: PropTypes.func.isRequired,
    changeRadarImage: PropTypes.func.isRequired,
    changeRadarPause: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.imageIndex = this.props.activeImage
      ? this.props.images.map(img => img.filename).indexOf(this.props.activeImage.filename)
      : 0
    this.timeout = null
    this.changeImage = this.changeImage.bind(this)
  }

  startAnimation () {
    this.props.changeRadarImage(this.props.images[this.imageIndex])
    setTimeout(this.changeImage, this.props.frequency)
  }

  nextImageIndex () {
    if (this.imageIndex === this.props.images.length - 1) {
      this.imageIndex = 0
    } else {
      this.imageIndex++
    }
    return this.imageIndex
  }

  changeImage () {
    this.props.changeRadarImage(this.props.images[this.nextImageIndex()])
    this.timeout = setTimeout(this.changeImage, this.props.frequency)
  }

  componentWillReceiveProps (nextProps) {
    // pausing or deactivating?
    if ((nextProps.pause && !this.props.pause) || (!nextProps.active && this.props.active)) {
      clearTimeout(this.timeout)
    }
    // resuming?
    if (!nextProps.pause && this.props.pause) {
      this.startAnimation()
    }
  }

  componentWillUnmount () {
    // set in pause if active
    clearTimeout(this.timeout)
    if (this.props.active) {
      this.props.changeRadarPause(true)
    }
  }

  render () {
    let preloadRadar = null
    if (this.props.active && this.props.preloading) {
      let images = this.props.images.map(obj => obj.file_url)
      console.log('FUCK', 'preloading images', images)
      preloadRadar = (
        <Preload
          loadingIndicator={<div />}
          images={images}
          onError={(e) => console.log('FUCK', 'error preloading', e)}
          onSuccess={() => {
            console.log('FUCK', 'preloading success')
            this.props.changeRadarPreloading(false)
            if (!this.props.pause) {
              this.startAnimation()
            }
          }}
          resolveOnError={false}
          mountChildren={false}
        >
          <div />
        </Preload>
      )
    }
    let swBound = new google.maps.LatLng(43.8189833, 5.868697222222223)
    let neBound = new google.maps.LatLng(46.6995, 9.664697222222223)
    let bounds = new google.maps.LatLngBounds(swBound, neBound)

    let radarOverlay = null
    if (this.props.active && !this.props.preloading && this.props.activeImage) {
      let image = this.props.activeImage.file_url
      radarOverlay = (
        <OverlayView
          mapPaneName={OverlayView.OVERLAY_LAYER}
          bounds={bounds}
        >
          <img src={image} style={STYLES.overlayView} />
        </OverlayView>
      )
    }

    return (
      <div>
        {preloadRadar}
        {radarOverlay}
      </div>
    )
  }
}

export default RadarOverlay
