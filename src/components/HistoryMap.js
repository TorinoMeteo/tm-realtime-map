import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import HistoryMarker from 'components/HistoryMarker'
import HistoryStationModal from 'components/HistoryStationModal'

class HistoryMapClass extends React.Component {
  constructor (props) {
    super(props)
    this.fitBoundsEnabled = true
    this.gmap = null
    this.state = {
      zoom: 8,
      center: { lat: 45.397, lng: 7.644 }
    }
  }

  render () {
    let modal = null
    if (this.props.viewData.selected) {
      let data = this.props.viewData.selected
      modal = (
        <HistoryStationModal
          onRequestClose={() => this.props.selectStation(null)}
          data={data}
        />
      )
    }
    return (
      <div>
        {modal}
        <GoogleMap
          zoom={this.state.zoom}
          center={this.state.center}
          ref={(ref) => { this.gmap = ref }}
          onZoomChanged={() => this.setState({ zoom: this.gmap.getZoom() })}
          onBoundsChanged={() => this.setState({ center: this.gmap.getCenter() })}
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
                <HistoryMarker
                  obj={obj}
                  key={obj.station.id}
                  quantity={this.props.viewData.quantity}
                  onClick={() => this.props.selectStation(obj)}
                />
              )
            })}
          </MarkerClusterer>
        </GoogleMap>
      </div>
    )
  }
}

HistoryMapClass.propTypes = {
  data: PropTypes.array,
  viewData: PropTypes.object,
  selectStation: PropTypes.func.isRequired
}

export default withGoogleMap(HistoryMapClass)
