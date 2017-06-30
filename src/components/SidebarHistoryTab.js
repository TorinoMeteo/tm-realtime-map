import React from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'react-slider'
import ScrollArea from 'react-scrollbar'
import moment from 'moment'

const qProps = {
  temperature: {
    icon: 'wi wi-thermometer',
    label: 'Temperatura'
  },
  pressure: {
    icon: 'wi wi-barometer',
    label: 'Pressione'
  },
  relative_humidity: {
    icon: 'wi wi-humidity',
    label: 'Umidità relativa'
  }
}

const exProps = {
  mean: {
    label: 'media'
  },
  max: {
    label: 'massima'
  },
  min: {
    label: 'minima'
  }
}

export class SidebarHistoryTab extends React.Component {
  constructor () {
    super()
    this.startDate = moment('2010-08-01').startOf('day').format('X')
    let endDate = moment().subtract(1, 'day').startOf('day').format('X')
    this.days = (endDate - this.startDate) / (60 * 60 * 24)
    this.state = {
      day: this.days
    }
  }
  render () {
    let changeHistoryQuantity = this.props.changeHistoryQuantity
    let changeHistoryDate = this.props.changeHistoryDate
    let quantity = this.props.quantity
    return (
      <div>
        <div style={{ position: 'fixed' }}>
          <ul className='sidebar-quantity-list depth-0'>
            {['temperature', 'pressure', 'relative_humidity'].map((q) => {
              return (
                <li key={'history-' + q}>
                  <i className={qProps[q].icon} />
                  {qProps[q].label}
                  <ul className='depth-1'>
                    {['mean', 'max', 'min'].map((ex) => {
                      return (
                        <li key={'history-' + q + ex}>
                          <a
                            onClick={() => changeHistoryQuantity(q + '_' + ex)}
                            className={'btn btn-controller btn-sm' +
                              (quantity === q + '_' + ex ? ' active' : '')}>
                            {exProps[ex].label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        <ScrollArea className='scroll-area'>
          <ReactSlider
            min={0}
            max={this.days}
            step={1}
            defaultValue={this.state.day}
            orientation='vertical'
            invert
            onChange={(value) => {
              this.setState({ day: value })
            }}
            onAfterChange={(value) => {
              this.setState({ day: value })
              let date = moment.unix(parseInt(this.startDate) + (parseInt(value) * 60 * 60 * 24))
              console.log(date.format('Y'), date.format('M'), date.format('D'))
              changeHistoryDate(date.format('Y'), date.format('M'), date.format('D'))
            }}
          >
            <div className='handle'>
              {moment.unix(
                parseInt(this.startDate) + parseInt(this.state.day) * 60 * 60 * 24
              ).format('DD/MM/YY')}
            </div>
          </ReactSlider>
        </ScrollArea>
      </div>
    )
  }
}

SidebarHistoryTab.propTypes = {
  quantity: PropTypes.string.isRequired,
  changeHistoryQuantity: PropTypes.func.isRequired,
  changeHistoryDate: PropTypes.func.isRequired
}

export default SidebarHistoryTab
