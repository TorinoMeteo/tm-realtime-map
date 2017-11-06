import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { isOffline } from 'utils/map'
import moment from 'moment'

const LiveStationModal = (props) => {
  let offlineWarning = isOffline(props.data)
    ? (<p className='alert alert-danger'>
      La stazione risulta offline, i valori si riferiscono all'ultima misurazione effettuata
      </p>)
    : ''

  let description = props.data.station.description
  let rexp = new RegExp('<img .*?src="(https?://www.yr.no.*?)".*?>')
  let matches = description.match(rexp)
  let meteogramUrl = matches && matches[1] ? matches[1] : null
  let weatherIconUrl = props.data.weather_icon ? props.data.weather_icon.icon : ''
  let weatherIconCredits = props.data.weather_icon_credits
  let weatherIconImg = weatherIconUrl
    ? (
      <a target='_blank' href={weatherIconCredits}>
        <img style={{ marginLeft: '15px' }} src={weatherIconUrl} />
      </a>
    )
    : null

  return (
    <Modal
      onRequestClose={props.onRequestClose}
      className='tm-modal tm-modal-sm'
      contentLabel='Station Preview Modal'
      isOpen
    >
      <section className='tm-modal-content'>
        <h2 style={{ marginBottom: '1rem' }}>
          {props.data.station.name}
          {weatherIconImg}
          <a
            href={'https://www.torinometeo.org/realtime/' + props.data.station.slug}
            target='_blank'
            className='float-right btn btn-sm btn-secondary btn-detail'>
            dettaglio stazione{' '}
            <i className='ion-ios-arrow-forward' />
          </a>
        </h2>
        {offlineWarning}
        <h5 className='modal-station-datetime'>
          <i className='ion-calendar' /> {moment(props.data.datetime).format('LLL')}
        </h5>
        <div className='modal-station-main'>
          <div className='row'>
            <div className='col-md-7 push-md-5'>
              <table className='table-modal-data'>
                <tbody>
                  <tr>
                    <td>
                      <span className='modal-temperature'>
                        <i className='wi wi-thermometer' /> {props.data.temperature} °C
                      </span>
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <span className='modal-temperature-max'>
                        <i className='ion-chevron-up' /> {props.data.temperature_max} °C
                      </span><br />
                      <span className='modal-temperature-min'>
                        <i className='ion-chevron-down' /> {props.data.temperature_min} °C
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='modal-pressure'>
                        <i className='wi wi-barometer' /> {props.data.pressure} hPa
                      </span><br />
                      <span className='modal-relative_humidity'>
                        <i className='wi wi-humidity' /> {props.data.relative_humidity} %
                      </span><br />
                      <span className='modal-dewpoint'>
                        <i className='wi wi-raindrop' /> {props.data.dewpoint} °C
                      </span>
                    </td>
                    <td>
                      <span className='modal-rain-rate'>
                        <i className='wi wi-raindrops' /> {props.data.rain_rate} mm/h
                      </span><br />
                      <span className='modal-rain'>
                        <i className='wi wi-umbrella' /> {props.data.rain} mm
                      </span><br />
                      <span className='modal-wind'>
                        <i className='wi wi-windy' /> {props.data.wind}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-5 pull-md-7'>
              <p>
                <img src={props.data.station.image_url} alt='immagine stazione' className='img-fluid' />
              </p>
            </div>
          </div>
        </div>
        <p className='modal-icon-expand'>
          {props.data.station.webcam_url && (
            <i
              onClick={() => {
                let wb = document.getElementById('webcam-image-' + props.data.station.id)
                let mg = document.getElementById('meteogram-' + props.data.station.id)
                let disp = wb.style.display
                wb.style.display = disp === 'none' ? 'block' : 'none'
                if (mg) {
                  mg.style.display = 'none'
                }
              }}
              className='ion-camera' />
          )}
          {meteogramUrl && (
            <i
              onClick={() => {
                let wb = document.getElementById('webcam-image-' + props.data.station.id)
                let mg = document.getElementById('meteogram-' + props.data.station.id)
                let disp = mg.style.display
                mg.style.display = disp === 'none' ? 'block' : 'none'
                if (wb) {
                  wb.style.display = 'none'
                }
              }}
              className='ion-ios-partlysunny' />
          )}
        </p>
        {props.data.station.webcam_url && (
          <img
            src={props.data.station.webcam_url + '?' + new Date().getTime()}
            alt='immagine webcam'
            className='img-fluid img-margin-bottom'
            id={'webcam-image-' + props.data.station.id}
            style={{ display: 'none' }}
          />
        )}
        {meteogramUrl && (
          <img
            src={meteogramUrl}
            alt='meteogramma'
            id={'meteogram-' + props.data.station.id}
            className='img-fluid img-margin-bottom'
            style={{ display: 'none' }}
          />
        )}
      </section>
    </Modal>
  )
}

LiveStationModal.propTypes = {
  data: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default LiveStationModal
