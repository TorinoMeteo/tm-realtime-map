import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SidebarRealtimeTab from 'components/SidebarRealtimeTab'

export class Sidebar extends React.Component {
  static propTypes = {
    changeQuantity: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      displaySidebar: PropTypes.bool
    }),
    map: PropTypes.shape({
      quantity: PropTypes.string
    })
  }

  render () {
    let left = this.props.ui.displaySidebar ? 0 : '-340px'
    return (
      <nav className='nav-sidebar' style={{ left: left }}>
        <Tabs>
          <TabList>
            <Tab>Live</Tab>
            <Tab>Storico</Tab>
            <Tab>Webcam</Tab>
            <Tab>Info</Tab>
          </TabList>
          <TabPanel>
            <SidebarRealtimeTab
              quantity={this.props.map.quantity}
              changeQuantity={this.props.changeQuantity}
            />
          </TabPanel>
          <TabPanel>
            STORICO
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
