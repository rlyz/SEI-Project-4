import React, { useState } from 'react'
import QRCode from 'qrcode.react'

// find the endpoint to hit from the list of shops
// get the url and set it as the qrcode value

// flow
// click to generate
// if no shops throw error
// if only one shop generate that one
// choose which shop to generate from
// show the qr code

export default function QrGenerator({user, storeName}) {
  const [toggle, setToggle] = useState(false)



  const base_url = `http://192.168.1.106:3000/?location=test&business=hi1man`
  return (
    <div>
    <button onClick={()=>setToggle(s => !s)}>Generate QR code</button>
    { 
      toggle && 
        <QRCode value={base_url}/>
    }
  </div>
  )
}
