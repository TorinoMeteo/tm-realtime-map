import { connect } from 'react-redux'
import RadarOverlay from 'components/RadarOverlay'
import {
  changeLiveRadarImage,
  changeLiveRadarPreloading,
  changeLiveRadarPause
} from 'store/map'

const sliceImages = (images) => {
  if (!images) {
    return []
  }
  let len = images.length
  return len > 19 ? images.slice(len - 20) : images
}

const mapStateToProps = (state) => {
  return {
    active: state.map.live.radar.active,
    preloading: state.map.live.radar.preloading,
    pause: state.map.live.radar.pause,
    frequency: state.map.live.radar.frequency,
    images: sliceImages(state.radar.data.live),
    activeImage: state.map.live.radar.image
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRadarPreloading: (preloading) => {
      dispatch(changeLiveRadarPreloading(preloading))
    },
    changeRadarImage: (image) => {
      dispatch(changeLiveRadarImage(image))
    },
    changeRadarPause: (pause) => {
      dispatch(changeLiveRadarPause(pause))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarOverlay)
