import React from 'react'
import PropTypes from 'prop-types'
import {
  Marker
} from 'react-google-maps'

const WebcamMarker = (props) => {
  const lat = parseFloat(props.obj.latitude)
  const lng = parseFloat(props.obj.longitude)

  return (
    <Marker
      position={{ lat: lat, lng: lng }}
      onClick={props.onClick}
    />
  )
}

WebcamMarker.propTypes = {
  obj: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default WebcamMarker
