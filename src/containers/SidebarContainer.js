import { connect } from 'react-redux'
import Sidebar from 'components/Sidebar'
import { toggleSidebar } from 'store/ui'
import {
  changeLiveQuantity,
  changeAirQualityQuantity,
  changeHistoryQuantity,
  changeView,
  changeHistoryDate,
  changeForecastDate,
  selectWebcam,
  selectAirQualityStation
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    map: state.map,
    webcams: state.webcams,
    realtime: state.realtime,
    airquality: state.airquality
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLiveQuantity: (quantity) => {
      dispatch(changeLiveQuantity(quantity))
    },
    changeAirQualityQuantity: (quantity) => {
      dispatch(changeAirQualityQuantity(quantity))
    },
    changeHistoryQuantity: (quantity) => {
      dispatch(changeHistoryQuantity(quantity))
    },
    changeHistoryDate: (year, month, day) => {
      dispatch(changeHistoryDate(year, month, day))
    },
    changeForecastDate: (date, period) => {
      dispatch(changeForecastDate(date, period))
    },
    changeView: (view) => {
      dispatch(changeView(view))
    },
    selectWebcam: (webcam) => {
      dispatch(selectWebcam(webcam))
    },
    selectAirqualityStation: (station) => {
      dispatch(selectAirQualityStation(station))
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
