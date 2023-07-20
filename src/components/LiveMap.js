import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  HeatmapLayer
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import LiveMarker from 'components/LiveMarker'
import LiveStationModal from 'components/LiveStationModal'
import LiveRadarOverlayContainer from 'containers/LiveRadarOverlayContainer'
import { isOffline } from 'utils/map'

class LiveMapClass extends React.Component {
  constructor (props) {
    super(props)
    this.gmap = null
  }

  componentWillReceiveProps (nextProps) {
    // new radar frames!
    if (nextProps.radarImages.length !== this.props.radarImages.length) {
      this.props.changeLiveRadarPreloading(true)
    }
  }

  // set viewport for other maps!!
  componentWillUnmount () {
    this.props.changeMapViewport({
      center: this.gmap.getCenter(),
      zoom: this.gmap.getZoom()
    })
  }

  shouldComponentUpdate (nextProps) {
    // if just the radar props are changing, do not re-render! otherwise murker clusters
    // will flash at every image frame change
    if (
      nextProps.mapData.live.radar.image &&
      this.props.mapData.live.radar.image &&
      nextProps.mapData.live.radar.image.filename !== this.props.mapData.live.radar.image.filename) {
      return false
    }
    return true
  }

  heatMap () {
    if (!this.props.mapData.live.heatmap.active) {
      return null
    }
    let quantity = this.props.mapData.live.quantity
    let weight = quantity === 'wind'
      ? 'wind_strength'
      : (quantity === 'wind_max'
          ? 'wind_strength_max'
          : quantity
        )
    console.log('HEATMAP', this.props.data.filter(obj => !isOffline(obj)).map((obj) => {
          return {
            location: new google.maps.LatLng(obj.station.lat, obj.station.lng),
            weight: parseFloat(obj[weight])
          }
        })) // eslint-disable-line
    return (
      <HeatmapLayer
        options={{
          radius: 0.2,
          dissipating: false
        }}
        data={this.props.data.filter(obj => !isOffline(obj)).map((obj) => {
          return {
            location: new google.maps.LatLng(obj.station.lat, obj.station.lng),
            weight: parseFloat(obj[weight]) + 50 // no negative numbers 
          }
        })}
      />
    )
  }

  render () {
    let modal = null
    if (this.props.mapData.live.selected) {
      let data = this.props.data.filter(d => d.station.id === this.props.mapData.live.selected.id)[0]
      modal = (
        <LiveStationModal
          onRequestClose={() => this.props.selectStation(null)}
          data={data}
        />
      )
    }
    // setting center and zoom and
    // onZoomChanged={() => this.setState({ zoom: this.gmap.getZoom() })}
    // onBoundsChanged={() => this.setState({ center: this.gmap.getCenter() })}
    // causes the map to work insanely slow on pan and zoom, a lot of
    // [violation] setTimeout took....
    // need to find a way to keep center and zoom state but without redrawing at any time
    return (
      <div>
        {modal}
        <GoogleMap
          defaultZoom={this.props.mapData.zoom}
          defaultCenter={this.props.mapData.center}
          ref={(ref) => { this.gmap = ref }}
          onTilesLoaded={() => {
            // @TODO set as default const init value
            if (!this.props.mapData.boundFit) {
              const newBounds = new google.maps.LatLngBounds()
              this.props.data.forEach((obj, index) => {
                newBounds.extend(new google.maps.LatLng(obj.station.lat, obj.station.lng))
              })
              this.gmap.fitBounds(newBounds)
              this.props.setInitBoundFit()
            }
          }}
        >
          {this.heatMap()}
          <LiveRadarOverlayContainer />
          {this.props.data.map((obj, index) => {
            return (
              <LiveMarker
                obj={obj}
                key={obj.station.id}
                quantity={this.props.mapData.live.quantity}
                onClick={() => this.props.selectStation(obj.station)}
              />
            )
          })}
        </GoogleMap>
      </div>
    )
  }
}

/*
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
                  quantity={this.props.mapData.live.quantity}
                  onClick={() => this.props.selectStation(obj.station)}
                />
              )
            })}
          </MarkerClusterer>
*/

LiveMapClass.propTypes = {
  data: PropTypes.array,
  mapData: PropTypes.shape({
    live: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    boundFit: PropTypes.bool
  }),
  selectStation: PropTypes.func.isRequired,
  radarImages: PropTypes.array.isRequired,
  changeLiveRadarPreloading: PropTypes.func.isRequired,
  changeMapViewport: PropTypes.func.isRequired,
  setInitBoundFit: PropTypes.func.isRequired
}

export default withGoogleMap(LiveMapClass)
