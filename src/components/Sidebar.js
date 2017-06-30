import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SidebarRealtimeTab from 'components/SidebarRealtimeTab'
import SidebarHistoryTab from 'components/SidebarHistoryTab'

export class Sidebar extends React.Component {
  static propTypes = {
    changeLiveQuantity: PropTypes.func.isRequired,
    changeHistoryQuantity: PropTypes.func.isRequired,
    changeHistoryDate: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      displaySidebar: PropTypes.bool
    }),
    map: PropTypes.shape({
      view: PropTypes.string.isRequired,
      live: PropTypes.shape({
        quantity: PropTypes.string
      }),
      history: PropTypes.shape({
        quantity: PropTypes.string
      })
    })
  }

  render () {
    let left = this.props.ui.displaySidebar ? 0 : '-340px'
    return (
      <nav className='nav-sidebar' style={{ left: left }}>
        <Tabs>
          <TabList>
            <Tab onClick={() => this.props.changeView('live')}>Live</Tab>
            <Tab onClick={() => this.props.changeView('history')}>Storico</Tab>
            <Tab>Webcam</Tab>
            <Tab>Info</Tab>
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
            />
          </TabPanel>
          <TabPanel>
            Webcam
          </TabPanel>
          <TabPanel>
            Info
          </TabPanel>
        </Tabs>
      </nav>
    )
  }
}

export default Sidebar
