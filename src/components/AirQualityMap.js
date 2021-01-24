import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import { time } from '../utils/map'
import Modal from 'react-modal'
import AirQualityMarker from 'components/AirQualityMarker'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import WebcamMarker from 'components/WebcamMarker'

class AirQualityMapClass extends React.Component {
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
    if (this.props.mapData.airquality.selected) {
      let s = this.props.mapData.airquality.selected
      modal = (
        <Modal
          onRequestClose={() => this.props.selectAirQualityStation(null)}
          className='tm-modal'
          contentLabel='Webcam Preview Modal'
          isOpen
        >
          <section className='tm-modal-content'>
            <h4 style={{ margin: '1.5rem 0' }}>
              {s.name} ({s.elevation}m)
            </h4>
            <div dangerouslySetInnerHTML={{ __html: s.description }} />
            <div className='airquality-index'>
              <span className='label'>Indice qualità dell'aria (AQI):</span>{' '}
              <span className='value'>{s.last_data.air_quality_index}</span>
            </div>
            <table className='table table-bordered table-sm table-airquality'>
              <thead>
                <tr>
                  <th>Grandezza</th>
                  <th>Attuale</th>
                  <th>Massimo giornaliero</th>
                  <th>Minimo giornaliero</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className='label'>PM 1</span></td>
                  <td><span className='value'>{s.last_data.pm1}</span></td>
                  <td><span className='value'>{s.last_data.pm1_max}</span> alle <span className='time'>{time(s.last_data.pm1_max_time)}</span></td>
                    <td><span className='value'>{s.last_data.pm1_min}</span> alle <span className='time'>{time(s.last_data.pm1_min_time)}</span></td>
                </tr>
                <tr>
                  <td><span className='label'>PM 2.5</span></td>
                  <td><span className='value'>{s.last_data.pm25}</span></td>
                  <td><span className='value'>{s.last_data.pm25_max}</span> alle <span className='time'>{time(s.last_data.pm25_max_time)}</span></td>
                    <td><span className='value'>{s.last_data.pm25_min}</span> alle <span className='time'>{time(s.last_data.pm25_min_time)}</span></td>
                </tr>
                <tr>
                  <td><span className='label'>PM 10</span></td>
                  <td><span className='value'>{s.last_data.pm10}</span></td>
                  <td><span className='value'>{s.last_data.pm10_max}</span> alle <span className='time'>{time(s.last_data.pm10_max_time)}</span></td>
                    <td><span className='value'>{s.last_data.pm10_min}</span> alle <span className='time'>{time(s.last_data.pm10_min_time)}</span></td>
                </tr>
              </tbody>
            </table>
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
          ref={ref => {
            this.gmap = ref
          }}
        >
          <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            {this.props.data.map((obj, index) => {
              return (
                <AirQualityMarker
                  obj={obj}
                  quantity={this.props.mapData.airquality.quantity}
                  key={obj.id}
                  onClick={() => this.props.selectAirQualityStation(obj)}
                />
              )
            })}
          </MarkerClusterer>
        </GoogleMap>
      </div>
    )
  }
}

AirQualityMapClass.propTypes = {
  data: PropTypes.array,
  mapData: PropTypes.shape({
    airquality: PropTypes.shape({
      quantity: PropTypes.string,
      selected: PropTypes.object
    }),
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    boundFit: PropTypes.bool
  }),
  selectAirQualityStation: PropTypes.func.isRequired,
  changeMapViewport: PropTypes.func.isRequired
}

export default withGoogleMap(AirQualityMapClass)
