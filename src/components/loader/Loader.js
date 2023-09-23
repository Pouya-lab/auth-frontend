import React from "react";
import "./Loader.scss";
import RingLoader from 'react-spinners/RingLoader'
import './Loader.scss'


function Loader() {
    
  return (
    <div className="wrapper">
        <div className="loader">
        <RingLoader size={150} color='#30E3CA'  />
        </div>
    </div>
  )
}

export default Loader