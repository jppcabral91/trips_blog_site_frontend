import React, { useState, useEffect } from 'react';
import './TripPage.css';
import tripsData from '../data/trips.json';
import MapPart from '../component/mapPart/MapPart';

const TripPage = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filterLiked, setFilterLiked] = useState(false);

  useEffect(() => {
    if (!Array.isArray(tripsData)) {
      // Wrap tripsData in an array if it's not already an array
      setTrips([tripsData]);
    } else {
      setTrips(tripsData);
    }
  }, []);

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
  };

  const resetFilters = () => {
    setSelectedDistrict('');
    setFilterLiked(false);
    setSelectedTrip(null);
  };

  const getUniqueDistricts = (trips) => {
    const districts = trips.flatMap(trip => trip.localsVisited ? trip.localsVisited.map(local => local.district) : []);
    return [...new Set(districts)];
  };

  const locations = trips.flatMap(trip => trip.localsVisited ? trip.localsVisited : []);

  return (
    <div className="trip-page">
      <div className="trip-list">
        <h2>Minhas Viagens</h2>
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card" onClick={() => handleTripClick(trip)}>
            <h3>{trip.title}</h3>
            <p>{trip.startDate} - {trip.endDate}</p>
            <p>{trip.smallDescription}</p>
            <button className="small-button" onClick={() => handleTripClick(trip)}>Mostrar locais desta viagem</button>
          </div>
        ))}
        <button className="reset-button" onClick={resetFilters}>Redefinir Filtros</button>
      </div>
      <div className="map-container">
        <div className="filters">
          <label>
            Distrito:
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="">Todos</option>
              {getUniqueDistricts(trips).map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </label>
          <label>
            Gostou:
            <input
              type="checkbox"
              checked={filterLiked}
              onChange={(e) => setFilterLiked(e.target.checked)}
            />
          </label>
        </div>
        <MapPart 
          locations={selectedTrip ? selectedTrip.localsVisited : locations} 
          selectedDistrict={selectedDistrict} 
          filterLiked={filterLiked} 
        />
        {selectedTrip && (
          <div className="trip-detail">
            <h2>{selectedTrip.title}</h2>
            <div className="trip-summary">
              <p><strong>{selectedTrip.startDate} a {selectedTrip.endDate}</strong></p>
              <span><strong>Custo:</strong> €{selectedTrip.cost}</span>
              <span><strong>Quilômetros:</strong> {selectedTrip.kilometers} km</span>
            </div>
            <p><strong>Locais Visitados:</strong> {selectedTrip.localsVisited.map(local => local.name).join(', ')}</p>
            {selectedTrip.days && selectedTrip.days.length > 0 ? (
              selectedTrip.days.map((day, index) => (
                <div key={index} className="day">
                  <h3>{day.date}</h3>
                  <p><strong>Weather:</strong> {day.weather}</p>
                  <p>{day.description}</p>
                  {day.activities && day.activities.length > 0 && (
                    <div className="activities">
                      <h4>Atividades</h4>
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="activity">
                          <p><strong>{activity.name}</strong></p>
                          <p>{activity.description}</p>
                          {activity.time && <p><strong>Time:</strong> {activity.time}</p>}
                          {activity.cost && <p><strong>Custo:</strong> €{activity.cost}</p>}
                          <p><strong>Gostou:</strong> {activity.liked ? 'Sim' : 'Não'}</p>
                          <p><strong>Voltaria:</strong> {activity.willComeback ? 'Sim' : 'Não'}</p>
                          {activity.extra && <p><strong>Extra:</strong> {activity.extra}</p>}
                          {activity.photos && activity.photos.length > 0 && (
                            <div className="photos">
                              <h5>Fotos:</h5>
                              {activity.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`activity-${index}`} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {day.meals && day.meals.length > 0 && (
                    <div className="meals">
                      <h4>Refeições</h4>
                      {day.meals.map((meal, idx) => (
                        <div key={idx} className="meal">
                          <p><strong>{meal.type} em {meal.location}</strong></p>
                          <p>{meal.description}</p>
                          {meal.time && <p><strong>Time:</strong> {meal.time}</p>}
                          {meal.cost && <p><strong>Custo:</strong> €{meal.cost}</p>}
                          <p><strong>Gostou:</strong> {meal.liked ? 'Sim' : 'Não'}</p>
                          {meal.photos && meal.photos.length > 0 && (
                            <div className="photos">
                              <h5>Fotos:</h5>
                              {meal.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`meal-${index}`} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {day.sleep && (
                    <div className="sleep">
                      <h4>Onde Dormi</h4>
                      <p><strong>{day.sleep.location}</strong></p>
                      <p>{day.sleep.description}</p>
                      <p><strong>Custo:</strong> €{day.sleep.cost}</p>
                      <p><strong>Gostou:</strong> {day.sleep.liked ? 'Sim' : 'Não'}</p>
                      {day.sleep.photos && day.sleep.photos.length > 0 && (
                        <div className="photos">
                          <h5>Fotos:</h5>
                          {day.sleep.photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`sleep-${index}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {day.transportation && (
                    <div className="transportation">
                      <h4>Transporte</h4>
                      <p><strong>Método:</strong> {day.transportation.method}</p>
                      <p><strong>Custo:</strong> €{day.transportation.cost}</p>
                      <p><strong>Notas:</strong> {day.transportation.notes}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Não há dias registrados.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;
