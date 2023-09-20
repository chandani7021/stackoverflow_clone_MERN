import React, { useState } from 'react'
import './UserProfile.css'
import LocationTracker from './LocationTraker'


const Location = () => {
    const[latitude, setLatitude] = useState(' ')
    const[longitude,setLongitude] = useState(' ')
    

    const getLocation = () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
        } else {
            alert("GeoLocation is not supported by this browser.");
        }
    }
    
    const showPosition= (position)=> {
    //    console.log(position)
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    // setUseradd(position.coords.)
    
    }

    const handleLocationError=(error)=> {
        switch(error.code){
            case error.PERMISSION_DENIED:
                alert("Denied request for geolocation");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable");
                break;
            case error.TIMEOUT:
                alert("Request to get user location timed out");
                break;
            case error.UNKNOWN_ERROR:
                alert("Unknown error occured");
                break;
            default:
                alert("Unknown error occured");
                break;
        }
    }

    const ulStyle = {
        listStyleType: 'none', // This removes bullet points
      };



  return (
    <div className='geo-location'>
        <h2>Geo Location</h2>
        
        <ul style={ulStyle}>
            <li><button onClick={getLocation}>Get Coordinates</button></li>
            <li>Latitude: {latitude} </li>
            <li>Longitude: {longitude}</li>
        
            <LocationTracker />
            {/* {
                latitude && longitude ?
                <img src={`https://maps.googleapis.com/maps/api/staticmap?center =${latitude},${longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7c${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`} alt=''/>
                : null
            } */}
        </ul>
    </div>
  )
}

export default Location



//To enable Google API key
// https://console.cloud.google.com/apis/credentials?project=stackoverflow-396716

// make config.js make google api key and add that in config.