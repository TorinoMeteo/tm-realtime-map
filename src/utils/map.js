import moment from 'moment'
import config from 'config'

export function isOffline (data) {
  if (!data.datetime) {
    return true
  }
  if (moment(data.datetime) < moment().subtract(config.map.offlineInterval, 'minutes')) {
    return true
  }
  return false
}
