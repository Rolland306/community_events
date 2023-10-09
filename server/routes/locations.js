import express from 'express'
// import controllers for events and locations
import locationsController from "../controllers/locations.js"


const router = express.Router()

// define routes to get events and locations
router.get('/', locationsController.getAllLocations)

router.get('/:id', locationsController.getLocationById)
router.get('/:locationName', locationsController.getLocationByName)


export default router

