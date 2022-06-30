import React from 'react';

export default function todayForecast({today, location}){
    return(
        <div className='minor'>
            <div className='minor-buttons'>
                <button className='minor-button'>Search for places</button>
                <button className='minor-button exact'>
                <span className="material-icons">my_location</span>
                </button>
            </div>
            <div className='weather-icon'>
                <img src={today.condition ? require("../images/"+today.condition+".png") : require("../images/Shower.png")}/>
            </div>
            <h1 className='low'><span className='temperature'>{parseInt(today.temperature)}</span>&deg;C</h1>
            <h2 className='low' >{today.condition}</h2>
            <div>
                <p className='low' >Today &bull; {today.date}</p>
                <p className='low'><span className="material-icons">location_on</span>{location}</p>
            </div>
        </div>
    )
}