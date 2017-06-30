import { connect } from 'react-redux'
import Map from 'components/Map'
import RealtimeApi from 'api/realtime'

const mapStateToProps = (state) => {
  return {
    realtime: state.realtime,
    history: state.history,
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
