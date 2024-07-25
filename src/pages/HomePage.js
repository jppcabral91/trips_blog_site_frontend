import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to My Travel Tracker</h1>
        <p>Explore and keep track of all your amazing trips and travels.</p>
      </header>
      <Carousel className="homepage-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Trip+1"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Paris</h3>
            <p>Visited the Eiffel Tower and Louvre Museum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Trip+2"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Tokyo</h3>
            <p>Enjoyed sushi and visited the Tokyo Skytree.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Trip+3"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>New York</h3>
            <p>Explored Central Park and the Statue of Liberty.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="homepage-buttons">
        <Button variant="primary" size="lg" href="/trips">Go to Trip Page</Button>
      </div>
    </div>
  );
};

export default HomePage;
