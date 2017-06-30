import { connect } from 'react-redux'
import Sidebar from 'components/Sidebar'
import {
  changeLiveQuantity,
  changeHistoryQuantity,
  changeView,
  changeHistoryDate
} from 'store/map'

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    map: state.map
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
    changeView: (view) => {
      dispatch(changeView(view))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
