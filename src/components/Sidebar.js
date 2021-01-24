import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SidebarRealtimeTab from 'components/SidebarRealtimeTab'
import SidebarHistoryTab from 'components/SidebarHistoryTab'
import SidebarForecastTab from 'components/SidebarForecastTab'
import SidebarWebcamTab from 'components/SidebarWebcamTab'
import SidebarAirQualityTab from 'components/SidebarAirQualityTab'
import SidebarSettingsTab from 'components/SidebarSettingsTab'
import SidebarInfoTab from 'components/SidebarInfoTab'
import { isApp } from 'utils/app'

export class Sidebar extends React.Component {
  static propTypes = {
    changeLiveQuantity: PropTypes.func.isRequired,
    changeAirQualityQuantity: PropTypes.func.isRequired,
    changeHistoryQuantity: PropTypes.func.isRequired,
    changeHistoryDate: PropTypes.func.isRequired,
    changeForecastDate: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    selectWebcam: PropTypes.func.isRequired,
    selectAirqualityStation: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      displaySidebar: PropTypes.bool
    }),
    map: PropTypes.shape({
      view: PropTypes.string.isRequired,
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
        day: PropTypes.number | PropTypes.string
      }),
      forecast: PropTypes.shape({
        date: PropTypes.object
      }),
      webcams: PropTypes.shape({
        selected: PropTypes.object
      }),
      airquality: PropTypes.shape({
        quantity: PropTypes.string,
        selected: PropTypes.object
      })
    }),
    webcams: PropTypes.shape({
      sync: PropTypes.bool,
      syncing: PropTypes.bool,
      loading: PropTypes.bool,
      data: PropTypes.array
    }),
    realtime: PropTypes.shape({
      sync: PropTypes.bool,
      syncing: PropTypes.bool,
      loading: PropTypes.bool,
      data: PropTypes.shape({
        stations: PropTypes.array.isRequired
      })
    }),
    airquality: PropTypes.shape({
      sync: PropTypes.bool,
      syncing: PropTypes.bool,
      loading: PropTypes.bool,
      data: PropTypes.array
    })
  };

  render () {
    let left = this.props.ui.displaySidebar ? 0 : '-340px'
    let navClasses = isApp() ? 'nav-sidebar bg-android' : 'nav-sidebar'

    let settingsTab = (
      <Tab>
        <i className='ion-gear-a' />
      </Tab>
    )
    let settingsPanel = (
      <TabPanel>
        <SidebarSettingsTab stations={this.props.realtime.data.stations} />
      </TabPanel>
    )
    if (isApp()) {
      settingsTab = null
      settingsPanel = null
    }

    return (
      <nav className={navClasses} style={{ left: left }}>
        <Tabs>
          <TabList>
            <Tab onClick={() => this.props.changeView('live')}>
              <i title='Live' className='ion ion-ios-pulse-strong' />
            </Tab>
            <Tab onClick={() => this.props.changeView('history')}>
              <i title='Storico' className='ion ion-calendar' />
            </Tab>
            <Tab onClick={() => this.props.changeView('webcams')}>
              <i title='Webcam' className='ion ion-ios-camera' />
            </Tab>
            <Tab onClick={() => this.props.changeView('airquality')}>
              <i title="Qualità dell'aria" className='ion ion-no-smoking' />
            </Tab>
            {settingsTab}
            <Tab>
              <i className='ion-information-circled' />
            </Tab>
          </TabList>
          <TabPanel>
            <SidebarRealtimeTab
              quantity={this.props.map.live.quantity}
              changeLiveQuantity={this.props.changeLiveQuantity}
            />
          </TabPanel>
          <TabPanel>
            <SidebarHistoryTab
              quantity={this.props.map.history.quantity}
              changeHistoryQuantity={this.props.changeHistoryQuantity}
              changeHistoryDate={this.props.changeHistoryDate}
              dataDate={{
                year: this.props.map.history.year,
                month: this.props.map.history.month,
                day: this.props.map.history.day
              }}
            />
          </TabPanel>
          <TabPanel>
            <SidebarWebcamTab
              webcams={this.props.webcams.data}
              selected={this.props.map.webcams.selected}
              onSelectWebcam={this.props.selectWebcam}
              toggleSidebar={this.props.toggleSidebar}
            />
          </TabPanel>
          <TabPanel>
            <SidebarAirQualityTab
              stations={this.props.airquality.data}
              selected={this.props.map.airquality.selected}
              onSelectStation={this.props.selectAirqualityStation}
              toggleSidebar={this.props.toggleSidebar}
              changeAirQualityQuantity={this.props.changeAirQualityQuantity}
              quantity={this.props.map.airquality.quantity}
            />
          </TabPanel>
          {settingsPanel}
          <TabPanel>
            <SidebarInfoTab />
          </TabPanel>
        </Tabs>
      </nav>
    )
  }
}

export default Sidebar
