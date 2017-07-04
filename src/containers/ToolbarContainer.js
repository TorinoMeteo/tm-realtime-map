import { connect } from 'react-redux'
import Toolbar from 'components/Toolbar'
import { toggleSidebar } from 'store/ui'
import {
  changeHistoryDate
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    map: state.map,
    stations: state.realtime.data.stations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar())
    },
    changeHistoryDate: (year, month, day) => dispatch(changeHistoryDate(year, month, day))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
