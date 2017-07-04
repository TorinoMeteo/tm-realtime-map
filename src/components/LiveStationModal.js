import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { isOffline } from 'utils/map'
import moment from 'moment'

const LiveStationModal = (props) => {
  let offlineWarning = isOffline(props.data)
    ? (<p className='alert alert-danger' style={{ marginTop: '1rem' }}>
      La stazione risulta offline, i valori si riferiscono all'ultima misurazione effettuata
      </p>)
    : ''

  let description = props.data.station.description
  let rexp = new RegExp('<img .*?src="(https?://www.yr.no.*?)".*?>')
  let matches = description.match(rexp)
  let newDescription = description.replace(rexp)
  let meteogramUrl = matches[1]
  return (
    <Modal
      onRequestClose={props.onRequestClose}
      className='tm-modal'
      contentLabel='Station Preview Modal'
      isOpen
    >
      <section className='tm-modal-content'>
        <h2>{props.data.station.name}</h2>
        <p style={{ marginTop: '1rem' }}>
          <img src={meteogramUrl} alt='meteogramma by www.yr.no' className='img-fluid' />
        </p>
        {offlineWarning}
        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <i className='ion-calendar' /> {moment(props.data.datetime).format('LLL')}
        </h4>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Grandezza (u.m.)</th>
                <th>Corrente</th>
                <th>Massima</th>
                <th>Minima</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura (°C)</td>
                <td>{props.data.temperature}</td>
                <td>{props.data.temperature_max}</td>
                <td>{props.data.temperature_min}</td>
              </tr>
              <tr>
                <td>Pressione (hPa)</td>
                <td>{props.data.pressure}</td>
                <td>{props.data.pressure_max}</td>
                <td>{props.data.pressure_min}</td>
              </tr>
              <tr>
                <td>Umidità relativa (%)</td>
                <td>{props.data.relative_humidity}</td>
                <td>{props.data.relative_humidity_max}</td>
                <td>{props.data.relative_humidity_min}</td>
              </tr>
              <tr>
                <td>Dewpoint (°C)</td>
                <td>{props.data.dewpoint}</td>
                <td>{props.data.dewpoint_max}</td>
                <td>{props.data.dewpoint_min}</td>
              </tr>
              <tr>
                <td>Vento (km/h)</td>
                <td>{props.data.wind}</td>
                <td>{props.data.wind_max}</td>
                <td />
              </tr>
              <tr>
                <th>Precipitazione (mm/h)</th>
                <th>Odierna (mm)</th>
                <th>Mensile (mm)</th>
                <th>Annuale (mm)</th>
              </tr>
              <tr>
                <td>{props.data.rain_rate}</td>
                <td>{props.data.rain}</td>
                <td>{props.data.rain_month}</td>
                <td>{props.data.rain_year}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-8'>
            <div className='live-station-description' dangerouslySetInnerHTML={{ __html: newDescription }} />
          </div>
          <div className='col-md-4'>
            {props.data.station.webcam_url && (
              <p>
                <img
                  src={props.data.station.webcam_url + '?' + new Date().getTime()}
                  alt='immagine webcam'
                  className='img-fluid'
                />
              </p>
            )}
            <p><img src={props.data.station.image_url} alt='immagine stazione' className='img-fluid' /></p>
          </div>
        </div>
      </section>
    </Modal>
  )
}

LiveStationModal.propTypes = {
  data: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default LiveStationModal
