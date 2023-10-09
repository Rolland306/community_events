// services/LocationsAPI.jsx

const BASE_URL = "http://localhost:3000/"; // Assuming your API endpoint for locations is '/'

// Function to get all locations
const getAllLocations = async () => {
  try {
    console.log("here");
    const response = await fetch(BASE_URL);
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }
    console.log("whatttttt");
    // console.log(response);

    // const data = response.json();
    // console.log("all locations data: ", data);
    const text = await response.text(); // Get the response text
    const data = JSON.parse(text); // Parse the JSON data
    console.log(data);

    return data;
  } catch (error) {
    throw new Error("Failed to get locations");
  }
};

// Function to get a location by its ID
const getLocationById = async (index) => {
  console.log("index:", index);
  try {
    const response = await fetch(`${BASE_URL}${index}`);
    if (!response.ok) {
      throw new Error("Failed to fetch locationId");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("bad things happened");
  }
};

// Function to get a location by its name
const getLocationByName = async (locationName) => {
  try {
    const response = await fetch(`${BASE_URL}/${locationName}`); // Replace with the correct API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch location by name");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Bad things happened");
  }
};

export default { getAllLocations, getLocationById, getLocationByName };
