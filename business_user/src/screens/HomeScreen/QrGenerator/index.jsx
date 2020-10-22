import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import { useSelector } from 'react-redux'

// find the endpoint to hit from the list of shops
// get the url and set it as the qrcode value

// flow
// click to generate
// if no shops throw error
// if only one shop generate that one
// choose which shop to generate from
// show the qr code

export default function QrGenerator() {
  const [toggle, setToggle] = useState(false)
  const shops = useSelector(state => state.shop.shops.map(shop => shop.storeName))
  const business = useSelector(state => state.auth.user)
  
  const [shop, setShop] = useState(null)
  let base = "https://glacial-cliffs-92997.herokuapp.com/" 
  //|| "http://192.168.1.106:5000"
  const base_url = `${base}/?location=${shop}&business=${business}`
  return (
    <div>
    {/* <button onClick={()=>setToggle(s => !s)}>Generate QR code</button> */}

    <label for="shopee">Generate QR code</label>
    <input list="shopees" name="shopee" id="shopee" onChange={e => setShop(e.target.value)}/>

    <datalist id="shopees" autocomplete="off" list="" style={toggle ? {display: "block"} : {display: "none"}}>
      {
        shops.map((storeName, key) => {
          return <option key={key} value={storeName}/>
        })
      }
    </datalist>

    { 
      shop && 
        <QRCode value={base_url}/>
    }
  </div>
  )
}
