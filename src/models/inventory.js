const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    stationId: { type: String, required: true },
    items: { type: Object, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);

