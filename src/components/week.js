import React from 'react';

export default function week({forecast}){
    console.log(forecast)
    return(
        <div className='week-forecast'>
            {forecast.map((weekday, key)=>{
                return(
                    <div className='day' key={key}>
                        <p>{weekday.date}</p>
                        <img style={{width: '100%', maxWidth: '75px', height:'auto'}} src={require("../images/"+weekday.condition+".png")} />
                        <div className='temps'>
                            <p>{parseInt(weekday.maxTemp)}&deg;C</p>
                            <p className='min'>{parseInt(weekday.minTemp)}&deg;C </p>
                        </div>
                    </div>
                )
            })}
            
        </div>
    )
}