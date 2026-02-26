import React, { useState } from 'react';
import { MapPin, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

const LocationStatus = ({ targetLat, targetLon, radius, onVerificationChange }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [status, setStatus] = useState('pending'); // 'pending', 'verified', 'failed'

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const verifyLocation = () => {
    setLoading(true);
    setErrorMsg('');

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation not supported by this browser.");
      setLoading(false);
      return;
    }

    // Professional options for higher accuracy
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = calculateDistance(
          position.coords.latitude, 
          position.coords.longitude, 
          targetLat, 
          targetLon
        );
        
        if (dist <= radius) {
          setStatus('verified');
          onVerificationChange(true);
        } else {
          setStatus('failed');
          setErrorMsg(`You are ${Math.round(dist)}m away from the office.`);
          onVerificationChange(false);
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setStatus('failed');
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg("Permission denied. Please enable location in browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setErrorMsg("The request to get user location timed out.");
            break;
          default:
            setErrorMsg("An unknown error occurred.");
            break;
        }
      },
      options
    );
  };

  return (
    <div className={`bento-item verification-bento ${status}`}>
      <div className="verification-content">
        <div className="verification-text">
          <label>Presence Verification</label>
          {status === 'pending' && <p>Please verify your location to start logging.</p>}
          {status === 'verified' && <p className="text-success"><CheckCircle size={14}/> Location Confirmed.</p>}
          {status === 'failed' && <p className="text-danger"><AlertTriangle size={14}/> {errorMsg}</p>}
        </div>
        
        <button className="btn-verify-corporate" onClick={verifyLocation} disabled={loading || status === 'verified'}>
          {loading ? <RefreshCw className="spin" size={16} /> : <MapPin size={16} />}
          {status === 'verified' ? "Verified" : "Check My Location"}
        </button>
      </div>
    </div>
  );
};

export default LocationStatus;