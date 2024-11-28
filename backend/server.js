const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const router = express.Router(); // Create a router instance
const PORT = 5003;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/real-estate";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model for listings
const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, minlength: 20, maxlength: 500 },
    size: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 1 },
    streetAddress: { type: String, required: true, maxlength: 150 },
    city: { type: String, required: true, maxlength: 50 },
    state: { type: String, required: true, maxlength: 50 },
    postalCode: { type: String, required: true, match: /^\d{6}$/ },
    mapLink: { type: String },
    propertyType: { type: String, required: true },
    purpose: { type: String, required: true },
    contact: {
        contactName: { type: String, required: true, maxlength: 100 },
        phone: { type: String, required: true, match: /^[789]\d{9}$/ },
        email: { type: String, required: true }
    },
    media: [{ type: { type: String, enum: ['image', 'video'] }, url: String }]
});

const Listing = mongoose.model('Listing', ListingSchema);

// POST route to create a new listing
app.post('/api/listings', async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        console.error('Error saving listing:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch all listings
router.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE route to delete a listing by its ID
router.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        await Listing.findByIdAndDelete(id);
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ message: 'Server error, failed to delete listing' });
    }
});

// Use the router
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
