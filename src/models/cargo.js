const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true },
    details: { type: Object, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cargo', cargoSchema);

