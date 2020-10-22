import React from 'react'
import './style.css'
import {ReactComponent as Spinner} from '../../assets/svg/spinner.svg';

export default function FullpageLoadingScreen() {
  return (
    <div className="spinner__overlay flex-center">
      <div className="spinner">
        <Spinner width="100%" height="100%"/>
      </div>
    </div>

  )
}
