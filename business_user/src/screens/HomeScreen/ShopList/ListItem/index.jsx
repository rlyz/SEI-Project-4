import React from 'react'
import './style.css'

export default function ListItem({storeName, location, openingTime, closingTime, currentCount, alerts}) {
  let style;
  if (alerts === 0) {
    style = 'green'
  } else if (alerts === 1) {
    style = 'orange'
  } else if (alerts === 2) {
    style = 'red'
  } else {
    style = 'grey'
  }

  return (
    <div className={style}>
      {storeName} | {location} | {openingTime} | {closingTime} | {currentCount}
    </div>
  )
}

ListItem.defaultProps = 
    {
      storeName: "store",
      location: "here",
      openingTime: "now",
      closingTime: "later",
      currentCount: 0,
      alerts: "-1"
    }

