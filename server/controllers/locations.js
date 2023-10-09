import { pool } from '../config/database.js';

// Function to get all locations
const getAllLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Function to get a location by its ID
const getLocationById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT name, address, image
        FROM locations
        WHERE id=$1`;

        const locationId = req.params.locationId;

        const results = await pool.query(selectQuery, [locationId]);
        console.log("results: ", results)
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Function to get a location by its name
const getLocationByName = async (req, res) => {
    try {
        const selectQuery = `
        SELECT id, address, image
        FROM locations
        WHERE name=$1`;

        const locationName = req.params.locationName;

        const results = await pool.query(selectQuery, [locationName]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getAllLocations,
    getLocationById,
    getLocationByName,
};
