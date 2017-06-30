import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinner'
import LiveMap from 'components/LiveMap'
import HistoryMap from 'components/HistoryMap'

class Map extends React.Component {
  componentDidMount () {
    this.props.fetchRealtimeData()
  }

  componentWillReceiveProps (nextProps) {
    // fetch history data if needed
    if (
      nextProps.map.view === 'history' &&
      (
        !this.props.history.data.length ||
        nextProps.map.history.year !== this.props.map.history.year ||
        nextProps.map.history.month !== this.props.map.history.month ||
        nextProps.map.history.day !== this.props.map.history.day
      )
    ) {
      this.props.fetchHistoricData(
        nextProps.map.history.year,
        nextProps.map.history.month,
        nextProps.map.history.day
      )
    }
  }

  render () {
    if (this.props.realtime.sync === false || this.props.realtime.loading || this.props.history.loading) {
      return (
        <div className='map-loading'>
          <Spinner style={{ height: 50, width: 50 }} />
        </div>
      )
    }

    if (this.props.map.view === 'live') {
      return (
        <LiveMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.realtime.data.data}
          quantity={this.props.map.live.quantity}
        />
      )
    } else if (this.props.map.view === 'history') {
      return (
        <HistoryMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.history.data}
          quantity={this.props.map.history.quantity}
        />
      )
    }
  }
}

Map.propTypes = {
  fetchRealtimeData: PropTypes.func.isRequired,
  fetchHistoricData: PropTypes.func.isRequired,
  realtime: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.shape({
      data: PropTypes.array,
      stations: PropTypes.array
    })
  }),
  history: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  map: PropTypes.shape({
    live: PropTypes.shape({
      quantity: PropTypes.string
    }),
    history: PropTypes.shape({
      quantity: PropTypes.string,
      year: PropTypes.number | PropTypes.string,
      month: PropTypes.number | PropTypes.string,
      day: PropTypes.number | PropTypes.string
    }),
    view: PropTypes.string
  })
}

export default Map
