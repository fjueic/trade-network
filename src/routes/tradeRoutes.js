const express = require('express');
const router = express.Router();
const Trade = require('../models/trade');
const { kafkaProducer } = require('../config/kafka');

// Create a new trade transaction
router.post('/api/trades', async (req, res) => {
    try {
        const trade = await Trade.create(req.body);
        let message = JSON.stringify(trade)
        kafkaProducer.send([{ topic: 'trade-transactions', messages: message }], (err, data) => {
            if (err) console.error('Failed to send message to Kafka', err);
            else console.log('Kafka message sent successfully:', data);
        });
        res.status(201).json(trade);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create trade' });
    }
});

// Get trade transaction details
router.get('/api/trades/:transactionId', async (req, res) => {
    try {
        const trade = await Trade.findOne({ transactionId: req.params.transactionId });
        if (!trade) return res.status(404).json({ error: 'Trade not found' });
        res.json(trade);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve trade' });
    }
});

module.exports = router;

