import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import LiveMarker from 'components/LiveMarker'

class LiveMapClass extends React.Component {
  constructor () {
    super()
    this.fitBoundsEnabled = true
    this.gmap = null
  }

  render () {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 45.397, lng: 7.644 }}
        ref={(ref) => { this.gmap = ref }}
        onTilesLoaded={() => {
          if (this.fitBoundsEnabled) {
            const newBounds = new google.maps.LatLngBounds()
            this.props.data.forEach((obj, index) => {
              newBounds.extend(new google.maps.LatLng(obj.station.lat, obj.station.lng))
            })
            this.gmap.fitBounds(newBounds)
            this.fitBoundsEnabled = false
          }
        }}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {this.props.data.map((obj, index) => {
            return (
              <LiveMarker
                obj={obj}
                key={obj.station.id}
                quantity={this.props.quantity}
              />
            )
          })}
        </MarkerClusterer>
      </GoogleMap>
    )
  }
}

LiveMapClass.propTypes = {
  data: PropTypes.array,
  quantity: PropTypes.string
}

export default withGoogleMap(LiveMapClass)
