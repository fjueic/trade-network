const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    details: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);

