// services/EventsAPI.jsx

const BASE_URL = "http://localhost:3000/events"; // Assuming your API endpoint is '/events'

// Function to get all events
const getAllEvents = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("bad things happened");
  }
};

// Function to get an event by its ID
const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("bad things happened");
  }
};

export default { getAllEvents, getEventById };
