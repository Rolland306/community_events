import { pool } from './database.js'
import './dotenv.js'
import eventsData from "../data/events.js"
import locationsData from "../data/locations.js"


const createEventsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      event_image_url TEXT NOT NULL
    )
  `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    eventsData.forEach((event) => {
        const formattedDate = event.date;
        const insertQuery = {
            text: `INSERT INTO events (event_name, date, time, location, address, event_image_url) 
            VALUES ($1, to_date($2, 'YYYY-MM-DD'), $3, $4, $5, $6)`
        }

        const values = [
            event.event_name,
            event.date,
            event.time,
            event.location,
            event.address,
            event.event_image_url
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }
            console.log(`✅ ${event.event_name} - event name added successfully`)
        })
    })
}
seedEventsTable()

const createLocationsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      address VARCHAR(255) NOT NULL,
      image TEXT NOT NULL
    );
  `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 locations table created successfully');
    } catch (err) {
        console.error('⚠️ error creating locations table', err);
    }
};

const seedLocationsTable = async () => {
    await createLocationsTable();

    locationsData.forEach(async (location) => {
        // If no record with the same location exists, insert it
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, image) VALUES ($1, $2, $3)',
        };

        const values = [location.name, location.address, location.image];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err);
                return;
            }
            console.log(`✅ ${location.name} location added successfully`);
        });

    });
};

seedLocationsTable();
