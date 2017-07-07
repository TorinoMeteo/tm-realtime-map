import { connect } from 'react-redux'
import Map from 'components/Map'
import RealtimeApi from 'api/realtime'
import WebcamsApi from 'api/webcams'
import {
  selectWebcam,
  selectLiveStation,
  selectHistoryStation,
  changeLiveRadarPreloading,
  changeMapViewport,
  setInitBoundFit
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    realtime: state.realtime,
    history: state.history,
    webcams: state.webcams,
    map: state.map,
    radar: state.radar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRealtimeData: () => {
      dispatch(RealtimeApi.actions.realtimeData())
    },
    fetchLiveRadarImages: (year, month, day) => {
      dispatch(RealtimeApi.actions.liveRadarImages({ year, month, day }))
    },
    fetchHistoryRadarImages: (year, month, day) => {
      dispatch(RealtimeApi.actions.historyRadarImages({ year, month, day }))
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
    },
    changeLiveRadarPreloading: (preloading) => {
      dispatch(changeLiveRadarPreloading(preloading))
    },
    changeMapViewport: ({ center, zoom }) => {
      dispatch(changeMapViewport({ center, zoom }))
    },
    setInitBoundFit: () => {
      dispatch(setInitBoundFit())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
