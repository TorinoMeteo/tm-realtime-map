import { connect } from 'react-redux'
import HeatMapController from 'components/HeatMapController'
import {
  changeHistoryHeatMapStatus
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    status: state.map.history.heatmap,
    view: state.map.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeHeatMapStatus: (active) => {
      dispatch(changeHistoryHeatMapStatus(active))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatMapController)
