import React from 'react'

const RadarLegend = props => {
  return (
    <div>
      <span
        style={{
          'background-color': '#91FADC',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        0.2
      </span>
      {' '}
      <span
        style={{
          'background-color': '#64AF91',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        1
      </span>
      {' '}
      <span
        style={{
          'background-color': '#55C80A',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        2
      </span>
      {' '}
      <span
        style={{
          'background-color': '#DCFF46',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        4
      </span>
      {' '}
      <span
        style={{
          'background-color': '#FF6E78',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        6
      </span>
      {' '}
      <span
        style={{
          'background-color': '#FA7355',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        10
      </span>
      {' '}
      <span
        style={{
          'background-color': '#FA0A3C',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        20
      </span>
      {' '}
      <span
        style={{
          'background-color': '#0A8CD2',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        40
      </span>
      {' '}
      <span
        style={{
          'background-color': '#A00A7D',
          padding: '1px 6px',
          color: 'white',
          'text-shadow': '0px 0px 2px black'
        }}
      >
        60
      </span>
    </div>
  )
}

export default RadarLegend
