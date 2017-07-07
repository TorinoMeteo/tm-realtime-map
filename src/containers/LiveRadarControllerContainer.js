import { connect } from 'react-redux'
import RadarController from 'components/RadarController'
import {
  changeLiveRadarStatus,
  changeLiveRadarPause,
  changeLiveRadarFrequency
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    // these is not same images array as passed to overlay component
    // the overlay one is sliced, but for the purpose of this prop
    // it is the same (just len != 0 check)
    images: state.radar.data.live,
    status: state.map.live.radar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRadarStatus: (active) => {
      dispatch(changeLiveRadarStatus(active))
    },
    changeRadarPause: (pause) => {
      dispatch(changeLiveRadarPause(pause))
    },
    changeRadarFrequency: (freq) => {
      dispatch(changeLiveRadarFrequency(freq))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarController)
