const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');
const { kafkaProducer } = require('../config/kafka');

// Get inventory levels for a space station
router.get('/api/inventory/:stationId', async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ stationId: req.params.stationId });
        if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
});

// POST: Add or update inventory for a space station
router.post('/api/inventory', async (req, res) => {
    try {
        const { stationId, items } = req.body;
        if (!stationId || !items) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if inventory exists for the station
        let inventory = await Inventory.findOne({ stationId });
        if (inventory) {
            // Update existing inventory
            inventory.items = items;
        } else {
            // Create new inventory
            inventory = new Inventory({ stationId, items });
        }

        // Save to database
        await inventory.save();

        // Produce Kafka message
        const message = JSON.stringify({
            type: 'inventory-update',
            stationId,
            items
        });

        kafkaProducer.send([{ topic: 'inventory-updates', messages: message }], (err, data) => {
            if (err) {
                console.error('Failed to send Kafka message', err);
                return res.status(500).json({ error: 'Failed to send Kafka message' });
            }
            console.log('Kafka message sent successfully:', data);
        });

        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add or update inventory' });
    }
});

module.exports = router;

