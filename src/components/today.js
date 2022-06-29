import React from 'react';
import Shower from '../images/Shower.png';

export default function today(){
    return(
        <div className='minor'>
            <div className='minor-buttons'>
                <button className='minor-button'>Search for places</button>
                <button className='minor-button exact'>
                <span className="material-icons">my_location</span>
                </button>
            </div>
            <div className='weather-icon'>
               <img src={Shower}/> 
            </div>
            <h1>15 C</h1>
            <h2>Shower</h2>
            <p>Today : Wednesday, 29 June</p>
            <p><span className="material-icons">location_on</span> New York</p>
        </div>
    )
}