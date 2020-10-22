import React from 'react'
import ListTable from './ListTable'
import './style.css'
import { useSelector } from 'react-redux'

export default function ShopList() {
  const shops = useSelector(state => state.shop.shops)

  return (
    <div>
      <div>
        storename | location | opening time | closing time | count
      </div>      
      <ListTable lists={shops}/>
    </div>
  )
}
