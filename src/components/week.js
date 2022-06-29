import React from 'react';

export default function week({forecast}){
    console.log(forecast)
    return(
        <div className='week-forecast'>
            {forecast.map((weekday, key)=>{
                return(
                    <div className='day' key={key}>
                        <p>{weekday.date}</p>
                        <img style={{width: '75px'}} src={require("../images/"+weekday.condition+".png")} />
                        <p>{weekday.maxTemp} / {weekday.minTemp}</p>
                    </div>
                )
            })}
            
        </div>
    )
}