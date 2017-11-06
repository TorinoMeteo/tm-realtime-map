import React from 'react'
import PropTypes from 'prop-types'
import {
  Marker
} from 'react-google-maps'
import { blue2red, lightblue2blue } from 'utils/colors'
import { COLOR_SCALE } from 'config/scales'
import { isOffline } from 'utils/map'

let dftIcon = {
  // path: 'M 0, 0 m -18, 0 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0', // circle
  //  path: 'M-24 -16 H 24 V 16 H -24 L -24 -16', // square
  path: 'M-18,-14 l 36,0  q4,0 4,4 l 0,18 q0,4 -4,4 l -15,0 l -3,10 l -3,-10 l -15,0  q-4,0 -4,-4 l 0,-18 q0,-4 4,-4 Z',
  fillOpacity: 1,
  fillColor: 'white',
  strokeWeight: 3
}

const LiveMarker = (props) => {
  const lat = parseFloat(props.obj.station.lat)
  const lng = parseFloat(props.obj.station.lng)
  let icon
  let value
  let label

  if (props.quantity === 'weather') {
    value = props.obj['weather_icon']
    label = null
    if (value) {
      icon = value.icon
    } else {
      icon = null
    }
  } else {
    value = parseFloat(props.obj[props.quantity])
    if (isNaN(value) || isOffline(props.obj)) {
      icon = {
        ...dftIcon,
        fillColor: 'white'
      }
    } else {
      let strokeFunc = /(rain)|(wind)/.test(props.quantity) ? lightblue2blue : blue2red
      icon = {
        ...dftIcon,
        // limit min and max to appreciate scale variability
        strokeColor: strokeFunc(
          Math.min(
            Math.max(
              value,
              COLOR_SCALE[props.quantity].min
            ),
            COLOR_SCALE[props.quantity].max
          ),
          COLOR_SCALE[props.quantity].max,
          COLOR_SCALE[props.quantity].min
        )
      }
    }
    label = {
      text: `${isNaN(value) || isOffline(props.obj) ? 'N.D.' : props.obj[props.quantity]}`,
      fontSize: '12px',
      color: '#000'
    }
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

LiveMarker.propTypes = {
  obj: PropTypes.object.isRequired,
  quantity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default LiveMarker
