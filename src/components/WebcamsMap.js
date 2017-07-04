import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import Modal from 'react-modal'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import WebcamMarker from 'components/WebcamMarker'

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
      let w = this.props.viewData.selected
      modal = (
        <Modal
          onRequestClose={() => this.props.selectWebcam(null)}
          className='tm-modal'
          contentLabel='Webcam Preview Modal'
          isOpen
        >
          <section className='tm-modal-content'>
            <img src={w.url + '?' + new Date().getTime()} alt='immagine' className='img-fluid' />
            <h4 style={{ marginTop: '1.5rem' }}>{w.name}</h4>
            <p>{w.technology}</p>
          </section>
        </Modal>
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
                newBounds.extend(new google.maps.LatLng(obj.latitude, obj.longitude))
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
                <WebcamMarker
                  obj={obj}
                  key={obj.id}
                  onClick={() => this.props.selectWebcam(obj)}
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
  selectWebcam: PropTypes.func.isRequired
}

export default withGoogleMap(HistoryMapClass)
