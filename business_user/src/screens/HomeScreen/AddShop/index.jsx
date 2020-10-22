import React from 'react'
import { useState } from 'react'
import './style.css'

import { useDispatch, useSelector } from 'react-redux'
import { addStore } from '../../../redux/shops'
import { useEffect } from 'react'

export default function AddShop() {
  const [toggle, setToggle] = useState(false)

  const [storeName, setStoreName] = useState('')
  const [location, setLocation] = useState('')
  const [openingTime, setOpeningTime] = useState('')
  const [closingTime, setClosingTime] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addStore({storeName, location, openingTime, closingTime, user}))
  }

  const loading = useSelector(state => state.shop.loading)

  useEffect(() => {
    if (!loading) {
      setStoreName('')
      setLocation('')
      setOpeningTime('')
      setClosingTime('')
    }
  }, [loading])
  return (
    <div>
      <button onClick={()=>setToggle(s => !s)}>Add shop</button>
      { 
        toggle && 
          <form onSubmit={handleSubmit}>
            <label>store name</label>
            <input type="text" value={storeName} onChange={e=>setStoreName(e.target.value)}/>
            <label>location</label>
            <input type="text" value={location} onChange={e=>setLocation(e.target.value)}/>
            <label>opening time</label>
            <input type="text" value={openingTime} onChange={e=>setOpeningTime(e.target.value)}/>
            <label>closing time</label>
            <input type="text" value={closingTime} onChange={e=>setClosingTime(e.target.value)}/>
            <input type="submit" value="submit"/>
          </form>
      }
    </div>
  )
}
