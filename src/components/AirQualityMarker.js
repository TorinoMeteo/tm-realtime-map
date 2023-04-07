import React from 'react'
import PropTypes from 'prop-types'
import {
  Marker
} from 'react-google-maps'

let dftIcon = {
  // path: 'M 0, 0 m -18, 0 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0', // circle
  //  path: 'M-24 -16 H 24 V 16 H -24 L -24 -16', // square
  path: 'M-18,-14 l 36,0  q4,0 4,4 l 0,18 q0,4 -4,4 l -15,0 l -3,10 l -3,-10 l -15,0  q-4,0 -4,-4 l 0,-18 q0,-4 4,-4 Z',
  fillOpacity: 1,
  fillColor: 'white',
  strokeWeight: 3
}

const AirQualityMarker = (props) => {
  if (!props.obj.station) return null
  const lat = parseFloat(props.obj.station.lat)
  const lng = parseFloat(props.obj.station.lng)
  let icon
  let label

  icon = {
    ...dftIcon,
    fillColor: 'white'
  }
  label = {
    text: props.obj.last_data ? props.obj.last_data[props.quantity] : '',
    fontSize: '12px',
    color: '#000'
  }

  return (
    <Marker
      position={{ lat: lat, lng: lng }}
      label={label}
      icon={icon}
      title={props.obj.station.name}
      onClick={props.onClick}
    />
  )
}

AirQualityMarker.propTypes = {
  obj: PropTypes.object.isRequired,
  quantity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AirQualityMarker
