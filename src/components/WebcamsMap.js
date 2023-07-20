import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap
} from 'react-google-maps'
import Modal from 'react-modal'
import WebcamMarker from 'components/WebcamMarker'

class WebcamMapClass extends React.Component {
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
    let modal = null
    if (this.props.mapData.webcams.selected) {
      let w = this.props.mapData.webcams.selected
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
          defaultZoom={this.props.mapData.zoom}
          defaultCenter={this.props.mapData.center}
          ref={(ref) => { this.gmap = ref }}
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
        </GoogleMap>
      </div>
    )
  }
}

WebcamMapClass.propTypes = {
  data: PropTypes.array,
  mapData: PropTypes.shape({
    webcams: PropTypes.shape({
      selected: PropTypes.object
    }),
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    boundFit: PropTypes.bool
  }),
  selectWebcam: PropTypes.func.isRequired,
  changeMapViewport: PropTypes.func.isRequired
}

export default withGoogleMap(WebcamMapClass)
