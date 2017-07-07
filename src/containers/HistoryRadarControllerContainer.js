import { connect } from 'react-redux'
import RadarController from 'components/RadarController'
import {
  changeHistoryRadarStatus,
  changeHistoryRadarPause,
  changeHistoryRadarFrequency
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    images: state.radar.data.history,
    status: state.map.history.radar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRadarStatus: (active) => {
      dispatch(changeHistoryRadarStatus(active))
    },
    changeRadarPause: (pause) => {
      dispatch(changeHistoryRadarPause(pause))
    },
    changeRadarFrequency: (freq) => {
      dispatch(changeHistoryRadarFrequency(freq))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarController)
