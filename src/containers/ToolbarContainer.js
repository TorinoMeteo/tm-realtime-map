import { connect } from 'react-redux'
import Toolbar from 'components/Toolbar'
import { toggleSidebar } from 'store/ui'

const mapStateToProps = (state) => {
  return {
    map: state.map,
    stations: state.realtime.data.stations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
