import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RealtimeApi from 'api/realtime'
import moment from 'moment'

class Refresh extends React.Component {
  static propTypes = {
    onRefresh: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.interval = null
  }

  componentDidMount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
    setInterval(() => {
      this.props.onRefresh()
    }, 3 * 60 * 1000)
  }

  render () {
    return <div />
  }
}

const mapStateToProps = (state) => {
  return {
    // these is not same images array as passed to overlay component
    // the overlay one is sliced, but for the purpose of this prop
    // it is the same (just len != 0 check)
    images: state.radar.data.live,
    status: state.map.live.radar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRefresh: () => {
      dispatch(RealtimeApi.actions.realtimeData())

      let now = moment()
      dispatch(RealtimeApi.actions.liveRadarImages({
        year: now.format('Y'),
        month: now.format('M'),
        day: now.format('D')
      }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refresh)
