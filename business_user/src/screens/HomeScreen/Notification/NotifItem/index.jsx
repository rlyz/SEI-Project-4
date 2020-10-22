import React from 'react'

export default function NotifItem({message}) {
  return (
    <div>
      <h2>{message}</h2>
    </div>
  )
}

NotifItem.defaultProps = {
  message: "smth da bad"
}
