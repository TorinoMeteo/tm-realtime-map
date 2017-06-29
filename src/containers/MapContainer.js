import { connect } from 'react-redux'
import Map from 'components/Map'
import RealtimeApi from 'api/realtime'

const mapStateToProps = (state) => {
  return {
    realtime: state.realtime,
    map: state.map
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRealtimeData: (action) => {
      dispatch(RealtimeApi.actions.realtimeData())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
