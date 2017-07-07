import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
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
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
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
          </MarkerClusterer>
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
