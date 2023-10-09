import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import EventsAPI from "../services/EventsAPI";
import LocationsAPI from "../services/LocationsAPI";
import "../css/LocationEvents.css";

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch location data by index from LocationsAPI
    const fetchLocationData = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(index); // Assuming getLocationById takes an index parameter
        setLocation(locationData);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    // Fetch events data from EventsAPI
    const fetchEventsData = async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents(); // You might need to pass any necessary parameters here
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    // Call the functions to fetch data when the component mounts
    fetchLocationData();
    fetchEventsData();
  }, [index]); // Run this effect whenever the 'index' prop changes

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.address}</p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.event_name}
              date={event.date}
              time={event.time}
              image={event.event_image_url}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
