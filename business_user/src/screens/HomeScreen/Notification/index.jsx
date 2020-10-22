import React from 'react'
import NotifItem from './NotifItem'

export default function Notifications() {
  const notifs = [{message: "Monitor these shops"}]
  if (notifs.length === 0) {
    return <h3>All clear</h3>
  }
  return (
    <div>
      {
        notifs.map((notif, index) => {
          return <NotifItem key={index} {...notif}/>
        })
      }
    </div>
  )
}
