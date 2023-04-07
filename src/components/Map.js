import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinner'
import LiveMap from 'components/LiveMap'
import HistoryMap from 'components/HistoryMap'
import ForecastMap from 'components/ForecastMap'
import WebcamsMap from 'components/WebcamsMap'
import AirQualityMap from 'components/AirQualityMap'
import moment from 'moment'

class Map extends React.Component {
  componentDidMount () {
    this.props.fetchRealtimeData()
    let now = moment()
    this.props.fetchLiveRadarImages(now.format('Y'), now.format('M'), now.format('D'))
  }

  componentWillReceiveProps (nextProps) {
    // fetch history data if needed
    if (
      nextProps.map.view === 'history' &&
      !this.props.history.loading && // avoid multiple requests
      (
        this.props.map.view !== 'history' ||
        !this.props.history.sync ||
        nextProps.map.history.year !== this.props.map.history.year ||
        nextProps.map.history.month !== this.props.map.history.month ||
        nextProps.map.history.day !== this.props.map.history.day
      )
    ) {
      this.props.fetchHistoricData(
        nextProps.map.history.year,
        nextProps.map.history.month,
        nextProps.map.history.day
      )
      this.props.fetchHistoryRadarImages(
        nextProps.map.history.year,
        nextProps.map.history.month,
        nextProps.map.history.day
      )
    } else if (nextProps.map.view === 'webcams' && !nextProps.webcams.data.length) {
      this.props.fetchWebcamsData()
    } else if (nextProps.map.view === 'airquality' && !nextProps.airquality.data.length) {
      this.props.fetchAirQualityData()
    } else if (
      nextProps.map.view === 'forecast' &&
        (nextProps.map.forecast.date.format('YMD') !== this.props.map.forecast.date.format('YMD'))) {
      this.props.fetchWeatherForecastData(nextProps.map.forecast.date)
    }
  }

  render () {
    let loading = null
    if (
      this.props.realtime.sync === false ||
      this.props.realtime.loading ||
      this.props.history.loading ||
      this.props.webcams.loading ||
      this.props.airquality.loading ||
      this.props.weatherForecast.loading ||
      this.props.radar.loading ||
      (this.props.map.live.radar.active && this.props.map.live.radar.preloading) ||
      (this.props.map.history.radar.active && this.props.map.history.radar.preloading)
    ) {
      loading = (
        <div className='map-loading'>
          <Spinner style={{ height: 50, width: 50 }} />
        </div>
      )
      // if data are not yet loaded, fit bounds will be called with no markers
      // => viewport is set in the middle of the ocean, lol
      if (this.props.realtime.sync === false) {
        return loading
      }
    }

    let map = null
    if (this.props.map.view === 'live') {
      map = (
        <LiveMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.realtime.data.data}
          radarImages={this.props.radar.data.live}
          mapData={this.props.map}
          selectStation={this.props.selectLiveStation}
          changeLiveRadarPreloading={this.props.changeLiveRadarPreloading}
          changeMapViewport={this.props.changeMapViewport}
          setInitBoundFit={this.props.setInitBoundFit}
        />
      )
    } else if (this.props.map.view === 'history') {
      map = (
        <HistoryMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.history.data}
          mapData={this.props.map}
          selectStation={this.props.selectHistoryStation}
          changeMapViewport={this.props.changeMapViewport}
        />
      )
    } else if (this.props.map.view === 'forecast') {
      map = (
        <ForecastMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.weatherForecast.data}
          mapData={this.props.map}
          changeMapViewport={this.props.changeMapViewport}
        />
      )
    } else if (this.props.map.view === 'webcams') {
      map = (
        <WebcamsMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.webcams.data}
          mapData={this.props.map}
          selectWebcam={this.props.selectWebcam}
          changeMapViewport={this.props.changeMapViewport}
        />
      )
    } else if (this.props.map.view === 'airquality') {
      map = (
        <AirQualityMap
          containerElement={<div className='map-container' />}
          mapElement={<div className='map-canvas' />}
          data={this.props.airquality.data}
          mapData={this.props.map}
          selectAirQualityStation={this.props.selectAirQualityStation}
          changeMapViewport={this.props.changeMapViewport}
        />
      )
    }

    return (
      <div>
        {loading}
        {map}
      </div>
    )
  }
}

Map.propTypes = {
  fetchRealtimeData: PropTypes.func.isRequired,
  fetchLiveRadarImages: PropTypes.func.isRequired,
  fetchHistoryRadarImages: PropTypes.func.isRequired,
  fetchHistoricData: PropTypes.func.isRequired,
  fetchWeatherForecastData: PropTypes.func.isRequired,
  fetchWebcamsData: PropTypes.func.isRequired,
  fetchAirQualityData: PropTypes.func.isRequired,
  selectWebcam: PropTypes.func.isRequired,
  selectAirQualityStation: PropTypes.func.isRequired,
  selectLiveStation: PropTypes.func.isRequired,
  selectHistoryStation: PropTypes.func.isRequired,
  changeLiveRadarPreloading: PropTypes.func.isRequired,
  changeMapViewport: PropTypes.func.isRequired,
  setInitBoundFit: PropTypes.func.isRequired,
  realtime: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.shape({
      data: PropTypes.array,
      stations: PropTypes.array
    })
  }),
  history: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  weatherForecast: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  webcams: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  airquality: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array
  }),
  radar: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.shape({
      live: PropTypes.array.isRequired,
      history: PropTypes.array.isRequired
    })
  }),
  map: PropTypes.shape({
    live: PropTypes.shape({
      quantity: PropTypes.string,
      radar: PropTypes.shape({
        active: PropTypes.bool,
        preloading: PropTypes.bool
      })
    }),
    history: PropTypes.shape({
      quantity: PropTypes.string,
      year: PropTypes.number | PropTypes.string,
      month: PropTypes.number | PropTypes.string,
      day: PropTypes.number | PropTypes.string,
      radar: PropTypes.shape({
        active: PropTypes.bool,
        preloading: PropTypes.bool
      })
    }),
    forecast: PropTypes.shape({
      date: PropTypes.object.isRequired
    }),
    webcams: PropTypes.shape({
      selected: PropTypes.object
    }),
    airquality: PropTypes.shape({
      selected: PropTypes.object
    }),
    view: PropTypes.string
  })
}

export default Map
