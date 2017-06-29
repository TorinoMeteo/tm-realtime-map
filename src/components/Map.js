import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import Marker from 'components/Marker'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import Spinner from 'react-spinner'

const TmGoogleMap = withGoogleMap(props => (
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
          <Marker
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

  render () {
    if (this.props.realtime.sync === false || this.props.realtime.syncing) {
      return (
        <div className='map-loading'>
          <Spinner style={{ height: 50, width: 50 }} />
        </div>
      )
    }

    return (
      <TmGoogleMap
        containerElement={<div className='map-container' />}
        mapElement={<div className='map-canvas' />}
        data={this.props.realtime.data}
        quantity={this.props.map.quantity}
      />
    )
  }
}

Map.propTypes = {
  fetchRealtimeData: PropTypes.func.isRequired,
  realtime: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  map: PropTypes.shape({
    quantity: PropTypes.string
  })
}

export default Map
