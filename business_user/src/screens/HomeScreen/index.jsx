import React from 'react'
import AddShop from './AddShop'
import Notifications from './Notification'
import QrGenerator from './QrGenerator'
import ShopList from './ShopList'
import './style.css'

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <Notifications />
      <AddShop />
      <ShopList />
      <QrGenerator />
    </div>
  )
}
