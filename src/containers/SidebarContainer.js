import { connect } from 'react-redux'
import Sidebar from 'components/Sidebar'
import { changeQuantity } from 'store/map'

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    map: state.map
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (quantity) => {
      dispatch(changeQuantity(quantity))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
