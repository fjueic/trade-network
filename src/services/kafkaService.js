const { kafkaProducer } = require('../config/kafka');

const sendMessage = (topic, message) => {
    return new Promise((resolve, reject) => {
        kafkaProducer.send([{ topic, messages: [message] }], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

module.exports = { sendMessage };

