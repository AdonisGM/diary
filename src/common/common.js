const convertTimeToTextAgo = (time) => {
  function pluralize(time, label) {
    return time + label
  }

  // utc time
  const between = Date.now() / 1000 - Number(new Date(time) / 1000)

  const seconds = Math.floor(between)
  if (seconds < 60) return 'Vừa xong'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return pluralize(minutes, ' phút trước')
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return pluralize(hours, ' giờ trước')
  const days = Math.floor(hours / 24)
  if (days < 30) return pluralize(days, ' ngày trước')
  const months = Math.floor(days / 30)
  if (months < 12) return pluralize(months, ' tháng trước')
  const years = Math.floor(months / 12)
  return pluralize(years, ' năm trước')
}

export {
  convertTimeToTextAgo,
}