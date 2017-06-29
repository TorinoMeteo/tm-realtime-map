import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

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
            <ul className='sidebar-quantity-list depth-0'>
              <li>
                <i className='wi wi-thermometer' />
                Temperatura
                <ul className='depth-1'>
                  <li>
                    <a
                      className='btn btn-controller btn-sm'
                      onClick={() => this.props.changeQuantity('temperature')}
                    >corrente
                    </a>
                  </li>
                  <li>
                    <a
                      className='btn btn-controller btn-sm'
                      onClick={() => this.props.changeQuantity('temperature_max')}
                    >massima
                    </a>
                  </li>
                  <li>
                    <a
                      className='btn btn-controller btn-sm'
                      onClick={() => this.props.changeQuantity('temperature_min')}
                    >minima
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a onClick={() => this.props.changeQuantity('pressure')}>Pressione</a>
              </li>
            </ul>
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
