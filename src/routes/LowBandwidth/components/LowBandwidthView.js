import React from 'react'

export const LowBandwidthView = () => (
  <div className='page-error'>
    <h1 className='text-center'>
      <i className='ion-alert-circled' /><br />
        Connessione internet insufficiente
    </h1>
    <p className='lead text-center'>
      La tua connesione ad internet non è al momento sufficiente per gestire la quantità di dati necessaria
      all'applicazione.
    </p>
  </div>
)

export default LowBandwidthView
