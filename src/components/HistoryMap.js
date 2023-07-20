import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  HeatmapLayer
} from 'react-google-maps'
import HistoryMarker from 'components/HistoryMarker'
import HistoryStationModal from 'components/HistoryStationModal'
import HistoryRadarOverlayContainer from 'containers/HistoryRadarOverlayContainer'

class HistoryMapClass extends React.Component {
  constructor (props) {
    super(props)
    this.gmap = null
  }

  // set viewport for other maps!!
  componentWillUnmount () {
    this.props.changeMapViewport({
      center: this.gmap.getCenter(),
      zoom: this.gmap.getZoom()
    })
  }

  shouldComponentUpdate (nextProps) {
    // just experiments
    if (
      nextProps.mapData.history.radar.image &&
      this.props.mapData.history.radar.image &&
      nextProps.mapData.history.radar.image.filename !== this.props.mapData.history.radar.image.filename) {
      return false
    }
    return true
  }

  heatMap () {
    if (!this.props.mapData.history.heatmap.active) {
      return null
    }
    let quantity = this.props.mapData.history.quantity
    return (
      <HeatmapLayer
        options={{
          radius: 0.2,
          dissipating: false
        }}
        data={this.props.data.map((obj) => {
          return {
            location: new google.maps.LatLng(obj.station.lat, obj.station.lng),
            weight: obj[quantity]
          }
        })}
      />
    )
  }

  render () {
    let modal = null
    if (this.props.mapData.history.selected) {
      let data = this.props.mapData.history.selected
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
          defaultZoom={this.props.mapData.zoom}
          defaultCenter={this.props.mapData.center}
          ref={(ref) => { this.gmap = ref }}
        >
          {this.heatMap()}
          <HistoryRadarOverlayContainer />
            {this.props.data.map((obj, index) => {
              return (
                <HistoryMarker
                  obj={obj}
                  key={obj.station.id}
                  quantity={this.props.mapData.history.quantity}
                  onClick={() => this.props.selectStation(obj)}
                />
              )
            })}
        </GoogleMap>
      </div>
    )
  }
}

HistoryMapClass.propTypes = {
  data: PropTypes.array,
  mapData: PropTypes.object,
  changeMapViewport: PropTypes.func.isRequired,
  selectStation: PropTypes.func.isRequired
}

export default withGoogleMap(HistoryMapClass)
