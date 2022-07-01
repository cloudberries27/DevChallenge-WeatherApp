import React from 'react';

export default function TodayForecast({today, location, tempType, getLocation, setLocation, setCoordinates}){
    const[overlay, setOverlay] = React.useState(false)
    const [results, setResults] = React.useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('https://geocoding-api.open-meteo.com/v1/search?name='+e.target.city.value)
        .then(response => response.json())
        .then(data => {
            setResults(data.results)
        })
    }
    const handleClick = async (city) => {
        setCoordinates({lat: city.latitude, long: city.longitude})
        setLocation(city.name + ', ' + city.country)
        setOverlay(false);
        document.body.style.overflow = "auto";
    }
    return(
        <div className='minor'>
            <div className='minor-buttons'>
                <button className='minor-button' onClick={()=>{setOverlay(true);document.body.style.overflow = "hidden";}}>Search for places</button>
                <button className='minor-button exact' onClick={()=>getLocation()}>
                    <span className="material-icons">my_location</span>
                </button>
            </div>
            <div className='weather-icon'>
                <img src={today.condition ? require("../images/"+today.condition+".png") : require("../images/Shower.png")} alt=''/>
            </div>
            {tempType==='C' ?
            <h1 className='low'><span className='temperature'>{parseInt(today.temperature)}</span>&deg;C</h1>
            :
            <h1 className='low'><span className='temperature'>{parseInt(today.temperature*1.8)+32}</span>&deg;F</h1>
            }
            <h2 className='low'>{today.condition}</h2>
            <div>
                <p className='low'>Today &bull; {today.date}</p>
                <p className='low'><span className="material-icons">location_on</span>{location}</p>
            </div>
            <div className={overlay ? 'overlay active' : 'overlay'}>
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '1em'}}>
                    <span className='material-icons ' onClick={()=>{setOverlay(false); document.body.style.overflow = "auto";}}>close</span>
                </div>
                <form className='search-location' onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <span className='material-icons'>search</span>
                        <input type="text" placeholder='search location' name='city'></input>
                    </div>
                    <button type='submit'>Search</button>
                </form>
                <div>
                    {results.map((city, key)=>{
                        return( 
                            <button key={key} className='city-button' onClick={() => handleClick(city)}>
                                {city.name}, {city.admin1}, {city.country}
                                <span className='material-icons'>navigate_next</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}