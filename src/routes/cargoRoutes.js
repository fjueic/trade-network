const express = require('express');
const router = express.Router();
const Cargo = require('../models/cargo');
const { kafkaProducer } = require('../config/kafka');

// Create a new cargo shipment
router.post('/api/cargo', async (req, res) => {
    try {
        const cargo = await Cargo.create(req.body);
        const message = JSON.stringify(cargo);
        kafkaProducer.send([{ topic: "cargo-update", messages: message }], (err, data) => {
            if (err) console.error('Failed to send message to Kafka', err);
            else console.log('Kafka message sent successfully:', data);
        });
        res.status(201).json(cargo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create cargo' });
    }
});

// Get cargo shipment details
router.get('/api/cargo/:shipmentId', async (req, res) => {
    try {
        const cargo = await Cargo.findOne({ shipmentId: req.params.shipmentId });
        if (!cargo) return res.status(404).json({ error: 'Cargo not found' });
        res.json(cargo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cargo' });
    }
});

module.exports = router;

