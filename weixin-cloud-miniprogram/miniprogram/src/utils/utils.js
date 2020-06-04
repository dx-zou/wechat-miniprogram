const formatTime = date => {
  const hour = Math.floor( date / 60 / 60)
  const minute = Math.floor( date / 60)
  const second = Math.floor( date % 60)
  const list = hour === 0 ? [minute, second] : [hour, minute, second]
  return list.map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime
}