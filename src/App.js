import './App.css';
import React from 'react';
import TodayForecast from './components/today';
import WeekForecast from './components/week';
import Features from './components/features';
// https://open-meteo.com/en

function App() {
  const [forecast, setForecast] = React.useState([])
  React.useEffect(()=>{
    setForecast([])
    getWeatherData();
   }, [])

   const getWeatherData = async () => {
    await fetch('')
    .then(response => response.json())
    .then(data => {
      //create the forecast - skip 0 thats today
      for(let x = 1; x<6; x++){
        let newForecast = {
          date: '',
          condition: '',
          maxTemp: data.daily.temperature_2m_max[x],
          minTemp: data.daily.temperature_2m_min[x]
        }
        // set date
        if(x===1){newForecast.date = 'Tomorrow'}
        else{ newForecast.date = new Date(data.daily.time[x]*1000).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });}
        // set weather condition
        let code = data.daily.weathercode[x];
        if(1 <= code && code <= 3){
            newForecast.condition = 'LightCloud'
        }else if (45 <= code && code <= 48){
            newForecast.condition = 'HeavyCloud'
        }else if (51 <= code && code <= 55){
            newForecast.condition = 'LightRain'
        }else if (61 <= code && code <= 65){
            newForecast.condition = 'HeavyRain'
        }else if (66 <= code && code  <= 67){
            newForecast.condition = 'Sleet'
        }else if (71 <= code && code <= 75){
            newForecast.condition = 'Snow'
        }else if (code===77){
            newForecast.condition = 'Hail'
        }else if (80 <= code && code <= 82){
            newForecast.condition = 'Shower'
        }else if (95 <= code && code <= 99){
            newForecast.condition = 'Thunderstorm'
        }else {
            newForecast.condition = 'Clear'
        }
        setForecast(forecast => [...forecast, newForecast])
      }
    })
  }

  return (
    <div className="App">
      <TodayForecast/>
      <div className='major'>
        <div className='degrees'>
          <button className='degrees-button active'>C</button>
          <button className='degrees-button'>F</button>
        </div>
        <WeekForecast forecast={forecast}/>
        <Features/>
      </div>
    </div>
  );
}

export default App;
