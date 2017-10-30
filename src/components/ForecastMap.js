import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import LiveMarker from 'components/LiveMarker'

class ForecastMapClass extends React.Component {
  constructor (props) {
    super(props)
    this.fitBoundsEnabled = true
    this.gmap = null
  }

  // set viewport for other maps!!
  componentWillUnmount () {
    this.props.changeMapViewport({
      center: this.gmap.getCenter(),
      zoom: this.gmap.getZoom()
    })
  }

  render () {
    return (
      <div>
        <GoogleMap
          defaultZoom={this.props.mapData.zoom}
          defaultCenter={this.props.mapData.center}
          ref={(ref) => { this.gmap = ref }}
        >
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
            {this.props.data.map((obj, index) => {
              return (
                <LiveMarker
                  quantity='weather'
                  obj={{
                    weather_icon_url: obj.icon,
                    station: obj.station
                  }}
                  key={obj.station.id}
                  onClick={() => {}}
                />
              )
            })}
          </MarkerClusterer>
        </GoogleMap>
      </div>
    )
  }
}

ForecastMapClass.propTypes = {
  data: PropTypes.array,
  mapData: PropTypes.shape({
    forecast: PropTypes.shape({
      date: PropTypes.object
    }),
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  changeMapViewport: PropTypes.func.isRequired
}

export default withGoogleMap(ForecastMapClass)
