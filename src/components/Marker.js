import React from 'react'
import PropTypes from 'prop-types'
import {
  Marker
} from 'react-google-maps'
import { blue2red } from 'utils/colors'
import { COLOR_SCALE } from 'config/scales'
import { isOffline } from 'utils/map'

let dftIcon = {
  // path: 'M 0, 0 m -18, 0 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0', // circle
  path: 'M-24 -16 H 24 V 16 H -24 L -24 -16', // square
  fillOpacity: 1,
  strokeColor: 'white',
  strokeWeight: 3
}

const TmMarker = (props) => {
  const lat = parseFloat(props.obj.station.lat)
  const lng = parseFloat(props.obj.station.lng)

  let value = parseFloat(props.obj[props.quantity])

  let icon
  if (isNaN(value) || isOffline(props.obj)) {
    icon = {
      ...dftIcon,
      fillColor: 'white'
    }
  } else {
    icon = {
      ...dftIcon,
      // limit min and max to appreciate scale variability
      fillColor: blue2red(
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
        text: `${isNaN(value) || isOffline(props.obj) ? 'N.D.' : value}`,
        fontSize: '12px',
        color: '#000'
      }}
      icon={icon}
    />
  )
}

TmMarker.propTypes = {
  obj: PropTypes.object.isRequired,
  quantity: PropTypes.string.isRequired
}

export default TmMarker
