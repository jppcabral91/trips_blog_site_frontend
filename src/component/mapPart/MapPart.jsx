import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapPart.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapPart = ({ locations, selectedDistrict, filterLiked }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!locations.length) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-8.224454, 39.3999], // Center of Portugal
      zoom: 6
    });

    const filteredLocations = locations.filter(local => 
      (!selectedDistrict || local.district === selectedDistrict) && 
      (!filterLiked || local.liked)
    );

    filteredLocations.forEach(local => {
      new mapboxgl.Marker()
        .setLngLat(local.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(`<h3>${local.name}</h3><p>${local.notes || ''}</p>`))
        .addTo(map);
    });

    return () => map.remove();
  }, [locations, selectedDistrict, filterLiked]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapPart;
