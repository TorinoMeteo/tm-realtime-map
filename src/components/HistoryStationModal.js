import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import moment from 'moment'

const HistoryStationModal = (props) => {
  return (
    <Modal
      onRequestClose={props.onRequestClose}
      className='tm-modal'
      contentLabel='Station History Preview Modal'
      isOpen
    >
      <section className='tm-modal-content'>
        <h2>{props.data.station.name}</h2>
        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <i className='ion-calendar' /> {moment(props.data.date).format('LL')}
        </h4>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Grandezza (u.m.)</th>
                <th>Media</th>
                <th>Massima</th>
                <th>Minima</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura (°C)</td>
                <td>{props.data.temperature_mean}</td>
                <td>{props.data.temperature_max}</td>
                <td>{props.data.temperature_min}</td>
              </tr>
              <tr>
                <td>Pressione (hPa)</td>
                <td>{props.data.pressure_mean}</td>
                <td>{props.data.pressure_max}</td>
                <td>{props.data.pressure_min}</td>
              </tr>
              <tr>
                <td>Umidità relativa (%)</td>
                <td>{props.data.relative_humidity_mean}</td>
                <td>{props.data.relative_humidity_max}</td>
                <td>{props.data.relative_humidity_min}</td>
              </tr>
              <tr>
                <th colSpan={4}>Precipitazione giornaliera (mm)</th>
              </tr>
              <tr>
                <td colSpan={4}>{props.data.rain}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Modal>
  )
}

HistoryStationModal.propTypes = {
  data: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default HistoryStationModal
