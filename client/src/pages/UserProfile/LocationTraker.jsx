import React, { useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../configure';

function LocationTracker() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      renderMap();
    }
  }, [userLocation]);

  function renderMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: userLocation,
      map: map,
    });
  }

  return (
    <div>
      <h2>User Location:</h2>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
        defer
      ></script>
    </div>
  );
}

export default LocationTracker;
