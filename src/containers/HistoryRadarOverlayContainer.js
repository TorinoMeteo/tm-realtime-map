import { connect } from 'react-redux'
import RadarOverlay from 'components/RadarOverlay'
import {
  changeHistoryRadarImage,
  changeHistoryRadarPreloading,
  changeHistoryRadarPause
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    active: state.map.history.radar.active,
    preloading: state.map.history.radar.preloading,
    pause: state.map.history.radar.pause,
    frequency: state.map.history.radar.frequency,
    images: state.radar.data.history,
    activeImage: state.map.history.radar.image
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRadarPreloading: (preloading) => {
      dispatch(changeHistoryRadarPreloading(preloading))
    },
    changeRadarImage: (image) => {
      dispatch(changeHistoryRadarImage(image))
    },
    changeRadarPause: (pause) => {
      dispatch(changeHistoryRadarPause(pause))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarOverlay)
