import { connect } from 'react-redux'
import RadarOverlay from 'components/RadarOverlay'
import {
  changeLiveRadarImage,
  changeLiveRadarPreloading,
  changeLiveRadarPause
} from 'store/map'
import * as Db from 'utils/db'

let radarLiveHistory = Db.get('radarLiveHistory') || 20

const sliceImages = (images) => {
  if (!images) {
    return []
  }
  let len = images.length
  let filtered = (len > radarLiveHistory && radarLiveHistory !== 0) ? images.slice(len - radarLiveHistory) : images
  return filtered
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
