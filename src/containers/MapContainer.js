import { connect } from 'react-redux'
import Map from 'components/Map'
import RealtimeApi from 'api/realtime'
import WebcamsApi from 'api/webcams'
import {
  selectWebcam,
  selectLiveStation,
  selectHistoryStation
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    realtime: state.realtime,
    history: state.history,
    webcams: state.webcams,
    map: state.map
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRealtimeData: () => {
      dispatch(RealtimeApi.actions.realtimeData())
    },
    fetchHistoricData: (year, month, day) => {
      dispatch(RealtimeApi.actions.historicData({ year, month, day }))
    },
    fetchWebcamsData: () => {
      dispatch(WebcamsApi.actions.webcams())
    },
    selectWebcam: (webcam) => {
      dispatch(selectWebcam(webcam))
    },
    selectLiveStation: (stationData) => {
      dispatch(selectLiveStation(stationData))
    },
    selectHistoryStation: (stationData) => {
      dispatch(selectHistoryStation(stationData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
