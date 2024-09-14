import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchIcon from '../assets/search-icon-png.jpg';  
import clearIcon from '../assets/sun.png';
import cloudIcon from '../assets/cloud.png';
import drizzzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import windIcon from '../assets/wind.png';
import humidityIcon from '../assets/humidity.png';


const Weather = () => {
   const inputRef=useRef();
   const[searches,setSearch]=useState('')
   const[weatherData,setWeatherData]=useState(false);
   const allIcons={
      "01d":clearIcon,
      "01n":clearIcon,
      "02d":cloudIcon,
      "02n":cloudIcon,
      "03d":cloudIcon,
      "03n":cloudIcon,
      "04d":drizzzleIcon,
      "04n":drizzzleIcon,
      "09d":rainIcon,
      "09n":rainIcon,
      "10d":rainIcon,
      "10n":rainIcon,
      "13d":snowIcon,
      "13n":snowIcon,
   }

   
   const search=async(city)=>
      {
         if(city===""){
            alert("Enter City Name");
            return;
         }
         try
         {
            const api_key="682e8d8e488b11f11c55245d724573d1";
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const response=await fetch(url);
            const data=await response.json();
            

            if(!response.ok)
               {
                  alert(data.message);
                  return;
               }
            console.log(data);
            const icon=allIcons[data.weather[0].icon]||clearIcon
            setWeatherData({
               humidity:data.main.humidity,
               windspeed:data.wind.speed,
               temperature:Math.floor(data.main.temp),
               location:data.name,
               icon:icon
            })
         }
         catch(error)
         {
            setWeatherData(false)
            console.log("Error in fetching Weather data")
         }
      }
      useEffect(()=>
         {
              search("America");
         },[])
  return (
    <div className='weather'>
       <div className='searchbox'>
              <input ref={inputRef}
               value={searches}
               onChange={(e)=>setSearch(e.target.value)}
               type='text' placeholder='search'/>
              <img src={searchIcon} alt="Search Icon" onClick={()=>{search(inputRef.current.value);setSearch("");}} 
              />
       </div>
       {weatherData?<>
         <img src={weatherData.icon} alt="" className='weather-icon'/>  
       <p  className='temperature'>{weatherData.temperature}&deg;C</p>
       <p className='location'>{weatherData.location}</p>
       <div className='weather-data'>
        <div className='col'>
             <img src={humidityIcon} alt=""/>
             <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
             </div>
        </div>
        <div className='col'>
             <img src={windIcon} alt=""/>
             <div>
                <p>{weatherData.windspeed}</p>
                <span>Windspeed</span>
             </div>
        </div>
       </div>
       </>:
       <></>}
       
    </div>
  )
}

export default Weather