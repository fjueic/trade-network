# CirclePe: Coding Assignment (Backend)

Youtube link: https://youtu.be/qGb9SyNu8WE

Data flow diagram: https://excalidraw.com/#json=zukwF_29dwLvvDP4kFX1d,3FdSOCxiFcY42Oi_Nqeswg

# Local setup

#### Clone
```bash
git clone  git@github.com:fjueic/trade-network.git
cd trade-network
touch .env
npm install
```

### Setup environment variables
```
MONGO_URI=MONGO_URI
KAFKA_HOST=localhost:9092
PORT=3000
```

### Setup Kafka
Setup Kafka on your local machine. You can follow the instructions [here](https://hub.docker.com/r/apache/kafka)
#### Create topics
```bash
# Create trade-transactions topic
kafka-topics.sh --create --topic trade-transactions --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

# Create cargo-updates topic
kafka-topics.sh --create --topic cargo-updates --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

# Create inventory-updates topic
kafka-topics.sh --create --topic inventory-updates --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

### Postman collection for API testing
- there is a postman collection in the root directory of the project. You can import it to postman and test the APIs.


# Explanation of the project
- MongoDB: Stores persistent data such as trade transactions, cargo shipments, and inventory levels.
- Socket\.IO: Facilitates real-time, bidirectional communication between the server and clients to push live updates.
- Kafka: Manages real-time event streaming and message brokering for high-throughput data handling and communication between services.
- Express: Provides a framework for building the backend server, defining API routes, and managing HTTP requests.


