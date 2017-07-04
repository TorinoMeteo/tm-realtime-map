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
  constructor (props) {
    super(props)
    this.startDate = moment('2010-08-01').startOf('day').format('X')
    let endDate = moment().subtract(1, 'day').startOf('day').format('X')
    this.days = (endDate - this.startDate) / (60 * 60 * 24)
    let dataDate = moment(props.dataDate.year + '-' + props.dataDate.month + '-' + props.dataDate.day, 'YYYY-M-D')
      .endOf('day').format('X')
    this.state = {
      day: (dataDate - this.startDate) / (60 * 60 * 24)
    }
    this.years = []
    for (var y = 2010, m = moment().year(); y <= m; y++) {
      this.years.push(y)
    }
    this.windowWidth = window.innerWidth
    this.scroll = null
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.dataDate.year !== this.props.dataDate.year ||
      nextProps.dataDate.month !== this.props.dataDate.month ||
      nextProps.dataDate.day !== this.props.dataDate.day
    ) {
      let dataDate = moment(
        nextProps.dataDate.year + '-' + nextProps.dataDate.month + '-' + nextProps.dataDate.day, 'YYYY-M-D'
      ).endOf('day').format('X')
      let day = Math.floor((dataDate - this.startDate) / (60 * 60 * 24))
      // let day = (dataDate - this.startDate) / (60 * 60 * 24)
      // scroll control only when date was changed through calendar
      // => actual day different from state day
      if (this.scroll && day !== this.state.day) {
        let scrollTo = 4000 / this.days * (this.days - day) - 40
        this.scroll.scrollArea.scrollYTo(scrollTo > 0 ? scrollTo : 0)
      }
      this.setState({
        day: day
      })
    }
  }

  slider () {
    // on mobile devices slider + scrolling doesn't work properly
    // use datepicker placed as toolbar title
    if (this.windowWidth < 900) {
      return null
    }

    let changeHistoryDate = this.props.changeHistoryDate
    // unique key is given to have the slider redraw itself when date is changed
    // from toolbar calendar
    let key = 'key-' + this.props.dataDate.year + this.props.dataDate.month + this.props.dataDate.day
    return (
      <ScrollArea ref={(ref) => { this.scroll = ref }} className='scroll-area'>
        <ReactSlider
          key={key}
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
    )
  }

  render () {
    let changeHistoryQuantity = this.props.changeHistoryQuantity
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
            <li key='history-rain'>
              <i className='wi wi-umbrella' />
              Precipitazione
              <ul className='depth-1'>
                <li>
                  <a
                    onClick={() => changeHistoryQuantity('rain')}
                    className={'btn btn-controller btn-sm' +
                      (quantity === 'rain' ? ' active' : '')}>
                      giornaliera
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {this.slider()}
      </div>
    )
  }
}

SidebarHistoryTab.propTypes = {
  quantity: PropTypes.string.isRequired,
  dataDate: PropTypes.shape({
    year: PropTypes.number | PropTypes.string,
    month: PropTypes.number | PropTypes.string,
    day: PropTypes.number | PropTypes.string
  }),
  changeHistoryQuantity: PropTypes.func.isRequired,
  changeHistoryDate: PropTypes.func.isRequired
}

export default SidebarHistoryTab
