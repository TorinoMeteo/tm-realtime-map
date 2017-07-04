import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinner'
import LiveMap from 'components/LiveMap'
import HistoryMap from 'components/HistoryMap'
import WebcamsMap from 'components/WebcamsMap'

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
    } else if (nextProps.map.view === 'webcams' && !nextProps.webcams.data.length) {
      this.props.fetchWebcamsData()
    }
  }

  render () {
    if (
      this.props.realtime.sync === false ||
      this.props.realtime.loading ||
      this.props.history.loading ||
      this.props.webcams.loading
    ) {
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
          viewData={this.props.map.live}
          selectStation={this.props.selectLiveStation}
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
    } else if (this.props.map.view === 'webcams') {
      return (
        <WebcamsMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.webcams.data}
          viewData={this.props.map.webcams}
          selectWebcam={this.props.selectWebcam}
        />
      )
    }
  }
}

Map.propTypes = {
  fetchRealtimeData: PropTypes.func.isRequired,
  fetchHistoricData: PropTypes.func.isRequired,
  fetchWebcamsData: PropTypes.func.isRequired,
  selectWebcam: PropTypes.func.isRequired,
  selectLiveStation: PropTypes.func.isRequired,
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
  webcams: PropTypes.shape({
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
    webcams: PropTypes.shape({
      selected: PropTypes.object
    }),
    view: PropTypes.string
  })
}

export default Map
