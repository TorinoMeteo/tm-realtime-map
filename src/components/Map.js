import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import LiveMarker from 'components/LiveMarker'
import HistoryMarker from 'components/HistoryMarker'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import Spinner from 'react-spinner'

const TmGoogleMapLive = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45.397, lng: 7.644 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.data.map((obj, index) => {
        return (
          <LiveMarker
            obj={obj}
            key={obj.station.id}
            quantity={props.quantity}
          />
        )
      })}
    </MarkerClusterer>
  </GoogleMap>
))

const TmGoogleMapHistory = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45.397, lng: 7.644 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.data.map((obj, index) => {
        return (
          <HistoryMarker
            obj={obj}
            key={obj.station.id}
            quantity={props.quantity}
          />
        )
      })}
    </MarkerClusterer>
  </GoogleMap>
))

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
        <TmGoogleMapLive
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.realtime.data.data}
          quantity={this.props.map.live.quantity}
        />
      )
    } else if (this.props.map.view === 'history') {
      return (
        <TmGoogleMapHistory
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
