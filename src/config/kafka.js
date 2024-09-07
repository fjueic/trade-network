const kafka = require('kafka-node');

const kafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
const kafkaProducer = new kafka.Producer(kafkaClient);
const kafkaConsumer = new kafka.Consumer(
    kafkaClient,
    [{ topic: 'trade-transactions', partition: 0 },
    { topic: 'cargo-update', partition: 0 },
    { topic: 'inventory-updates', partition: 0 }
    ],
    { autoCommit: true }
);

module.exports = { kafkaProducer, kafkaConsumer };

