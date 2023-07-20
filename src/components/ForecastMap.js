import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
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
            {this.props.data.filter(obj => obj.period === this.props.mapData.forecast.period).map((obj, index) => {
              return (
                <LiveMarker
                  quantity='weather'
                  obj={{
                    weather_icon: { icon : obj.icon },
                    station: obj.station
                  }}
                  key={obj.station.id}
                />
              )
            })}
        </GoogleMap>
      </div>
    )
  }
}

ForecastMapClass.propTypes = {
  data: PropTypes.array,
  mapData: PropTypes.shape({
    forecast: PropTypes.shape({
      date: PropTypes.object,
      period: PropTypes.number
    }),
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  changeMapViewport: PropTypes.func.isRequired
}

export default withGoogleMap(ForecastMapClass)
