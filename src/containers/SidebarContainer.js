import { connect } from 'react-redux'
import Sidebar from 'components/Sidebar'
import { toggleSidebar } from 'store/ui'
import {
  changeLiveQuantity,
  changeHistoryQuantity,
  changeView,
  changeHistoryDate,
  changeForecastDate,
  selectWebcam
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    map: state.map,
    webcams: state.webcams,
    realtime: state.realtime
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLiveQuantity: (quantity) => {
      dispatch(changeLiveQuantity(quantity))
    },
    changeHistoryQuantity: (quantity) => {
      dispatch(changeHistoryQuantity(quantity))
    },
    changeHistoryDate: (year, month, day) => {
      dispatch(changeHistoryDate(year, month, day))
    },
    changeForecastDate: (date) => {
      dispatch(changeForecastDate(date))
    },
    changeView: (view) => {
      dispatch(changeView(view))
    },
    selectWebcam: (webcam) => {
      dispatch(selectWebcam(webcam))
    },
    toggleSidebar: () => {
      dispatch(toggleSidebar())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
