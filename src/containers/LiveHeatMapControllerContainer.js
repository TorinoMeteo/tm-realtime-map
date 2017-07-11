import { connect } from 'react-redux'
import HeatMapController from 'components/HeatMapController'
import {
  changeLiveHeatMapStatus
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    status: state.map.live.heatmap,
    view: state.map.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeHeatMapStatus: (active) => {
      dispatch(changeLiveHeatMapStatus(active))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatMapController)
