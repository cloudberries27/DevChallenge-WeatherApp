import './App.css';
import React from 'react';
import TodayForecast from './components/today';
import WeekForecast from './components/week';
import Features from './components/features';

function App() {
  const [forecast, setForecast] = React.useState([])
  const [coordinates, setCoordinates] = React.useState({lat: '40.71', long: '-74.01'})
  const [location, setLocation] = React.useState('New York, USA')
  const [today, setToday] = React.useState({})
  React.useEffect(()=>{
    setForecast([])
    getWeatherData();
  }, [])

  const getWeatherData = async () => {
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&windspeed_unit=mph&timeformat=unixtime&timezone=America%2FNew_York`)
    .then(response => response.json())
    .then(data => {
      // create todays weather 
      setToday({
        date: new Date(data.hourly.time[0]*1000).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        temperature: data.hourly.temperature_2m[0], 
        condition: getWeatherType(data.hourly.weathercode[0]),
        windSpeed: data.hourly.windspeed_10m[0],
        windDirection: data.hourly.winddirection_10m[0],
        humidity: data.hourly.relativehumidity_2m[0],
        pressure: data.hourly.pressure_msl[0],
        cloudCover: data.hourly.cloudcover[0]
      })
      //create the forecast - skip 0 thats today
      for(let x = 1; x<6; x++){
        let newForecast = {
          date: '',
          condition: getWeatherType(data.daily.weathercode[x]),
          maxTemp: data.daily.temperature_2m_max[x],
          minTemp: data.daily.temperature_2m_min[x]
        }
        // set date
        if(x===1){newForecast.date = 'Tomorrow'}
        else{ newForecast.date = new Date(data.daily.time[x]*1000).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });}
        
        setForecast(forecast => [...forecast, newForecast])
      }
    })
  }

  const getWeatherType = (code) => {
    if(1 <= code && code <= 3){
      return('LightCloud')
    }else if (45 <= code && code <= 48){
      return('HeavyCloud')
    }else if (51 <= code && code <= 55){
      return('LightRain')
    }else if (61 <= code && code <= 65){
      return('HeavyRain')
    }else if (66 <= code && code  <= 67){
      return('Sleet')
    }else if (71 <= code && code <= 75){
      return('Snow')
    }else if (code===77){
      return('Hail')
    }else if (80 <= code && code <= 82){
      return('Shower')
    }else if (95 <= code && code <= 99){
      return('Thunderstorm')
    }else {
      return('Clear')
    }
  }

  return (
    <div className="App">
      <TodayForecast today={today} location={location}/>
      <div className='major'>
        <div className='degrees'>
          <button className='degrees-button active'>&deg;C</button>
          <button className='degrees-button'>&deg;F</button>
        </div>
        <WeekForecast forecast={forecast}/>
        <Features today={today}/>
      </div>
    </div>
  );
}

export default App;
