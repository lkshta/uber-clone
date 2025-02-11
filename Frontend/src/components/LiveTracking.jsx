import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

const initialPosition = [28.613, 77.208]; // Default initial position
const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = ({  }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
 
  const [position, setPosition] = useState(initialPosition);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (mapRef.current != undefined) {
      mapRef.current.remove();
    }
    mapRef.current = L.map('map').setView(initialPosition, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    markerRef.current = L.marker(initialPosition).addTo(mapRef.current);

    const updatePosition = (pos) => {
      const { latitude, longitude } = pos.coords;
      
      setPosition([latitude, longitude]);

      markerRef.current.setLatLng([latitude, longitude]);
      mapRef.current.setView([latitude, longitude], 16);
    };

    const handleError = (error) => {
      console.error("Error getting user's location:", error);
      setError("Unable to retrieve your location. Please enable location services."); 
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition, handleError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }

    return () => {
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(updatePosition);
      }
    };
  }, [initialPosition]);

  return(
    // <div  style={containerStyle}  >
    //   {error && <p className="text-red-500">{error}</p>}
      <div id="map" className="h-full w-full object-cover" ></div>
    // </div>
  );
};

export default LiveTracking;




// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';

// const LiveTracking = () => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [position, setPosition] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const initializeMap = (initialPosition) => {
//       mapRef.current = L.map('map').setView(initialPosition, 16);

//       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       }).addTo(mapRef.current);

//       markerRef.current = L.marker(initialPosition).addTo(mapRef.current);
//     };

//     const updatePosition = (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const newPosition = [latitude, longitude];
//       setPosition(newPosition);

//       if (!mapRef.current) {
//         initializeMap(newPosition);
//       } else {
//         markerRef.current.setLatLng(newPosition);
//         mapRef.current.setView(newPosition, 16);
//       }
//     };

//     const handleError = (error) => {
//       console.error("Error getting user's location:", error);
//       setError("Unable to retrieve your location. Please enable location services.");
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(updatePosition, handleError, {
//         enableHighAccuracy: true,
//         maximumAge: 0,
//         timeout: 5000,
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setError("Geolocation is not supported by this browser.");
//     }

//     return () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.clearWatch(updatePosition);
//       }
//     };
//   }, []);

//   return (
//     <div>
//       {error && <p className="text-red-500">{error}</p>}
//       <div id="map" className="w-full h-full"></div>
//     </div>
//   );
// };

// export default LiveTracking;