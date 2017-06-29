import React from 'react'
import Sidebar from 'containers/SidebarContainer'
import Map from 'containers/MapContainer'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <Sidebar />
    <Map />
  </div>
)

export default HomeView
