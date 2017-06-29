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
    let left = this.props.ui.displaySidebar ? 0 : '-300px'
    return (
      <nav className='nav-sidebar' style={{ left: left }}>
        <Tabs>
          <TabList>
            <Tab>Realtime</Tab>
            <Tab>Storico</Tab>
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
        </Tabs>
      </nav>
    )
  }
}

export default Sidebar
