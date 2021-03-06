import React from 'react'
import PropTypes from 'prop-types'
import {
  Marker
} from 'react-google-maps'
import { blue2red, lightblue2blue } from 'utils/colors'
import { COLOR_SCALE } from 'config/scales'

let dftIcon = {
  // path: 'M 0, 0 m -18, 0 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0', // circle
  path: 'M-24 -16 H 24 V 16 H -24 L -24 -16', // square
  fillOpacity: 1,
  fillColor: 'white',
  strokeWeight: 6
}

const HistoryMarker = (props) => {
  const lat = parseFloat(props.obj.station.lat)
  const lng = parseFloat(props.obj.station.lng)

  let value = parseFloat(props.obj[props.quantity])

  let icon
  if (isNaN(value)) {
    icon = {
      ...dftIcon,
      fillColor: 'white'
    }
  } else {
    let strokeFunc = /rain/.test(props.quantity) ? lightblue2blue : blue2red
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

  return (
    <Marker
      position={{ lat: lat, lng: lng }}
      label={{
        text: `${isNaN(value) ? 'N.D.' : props.obj[props.quantity]}`,
        fontSize: '12px',
        color: '#000'
      }}
      icon={icon}
      title={props.obj.station.name}
      onClick={props.onClick}
    />
  )
}

HistoryMarker.propTypes = {
  obj: PropTypes.object.isRequired,
  quantity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default HistoryMarker
