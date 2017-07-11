import React from 'react'

export const ServiceUnavailableView = () => (
  <div className='page-error'>
    <h1 className='text-center'>
      <i className='ion-alert-circled' /><br />
      Servizio non disponibile 503
    </h1>
    <p className='lead text-center'>Il server è al momento incapace di risovere le richieste.</p>
  </div>
)

export default ServiceUnavailableView
