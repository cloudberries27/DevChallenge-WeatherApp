import React from 'react';

export default function WeekForecast({forecast, tempType}){
    return(
        <div className='week-forecast'>
            {forecast.map((weekday, key)=>{
                return(
                    <div className='day' key={key}>
                        <p>{weekday.date}</p>
                        <img alt='' style={{width: '100%', maxWidth: '75px', height:'auto'}} src={require("../images/"+weekday.condition+".png")} />
                        { tempType==='C' ?
                            <div className='temps'>
                                <p>{parseInt(weekday.maxTemp)}&deg;C</p>
                                <p className='min'>{parseInt(weekday.minTemp)}&deg;C </p>
                            </div>
                            : 
                            <div className='temps'>
                                <p>{parseInt(weekday.maxTemp*1.8)+32}&deg;F</p>
                                <p className='min'>{parseInt(weekday.minTemp*1.8)+32}&deg;F</p>
                            </div>
                        }
                        
                    </div>
                )
            })}
            
        </div>
    )
}