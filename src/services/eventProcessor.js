const { kafkaConsumer } = require('../config/kafka');
const Trade = require('../models/trade');
const Cargo = require('../models/cargo');

kafkaConsumer.on('message', async (message) => {
    const { topic, value } = message;

    try {
        if (topic === 'trade-transactions') {
            const trade = JSON.parse(value);
            await Trade.create(trade);
        } else if (topic === 'cargo-updates') {
            const cargo = JSON.parse(value);
            await Cargo.create(cargo);
        }
    } catch (error) {

    }
});

