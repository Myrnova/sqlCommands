import dotenv from 'dotenv'
import kafkajs from 'kafkajs'

dotenv.config()


const { Partitioners } = kafkajs
const {
  KAFKA_APP_HOSTS,
  KAFKA_CONNECTION_TIMEOUT,
  KAFKA_INITIAL_RETRY_TIME,
  KAFKA_LOG_LEVEL,
  KAFKA_MAX_RETRY_TIME,
  KAFKA_REQUEST_TIMEOUT,
  KAFKA_RETRIES,
  KAFKA_SSL,
  AKHQ_HOST,
  AKHQ_NODE
} = process.env

export const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

export const appConfig = {
  kafka: {
    brokers: KAFKA_APP_HOSTS.split(','),
    clientId: 'banking',
    connectionTimeout: Number(KAFKA_CONNECTION_TIMEOUT),
    logLevel: Number(KAFKA_LOG_LEVEL),
    requestTimeout: Number(KAFKA_REQUEST_TIMEOUT),
    retry: {
      initialRetryTime: Number(KAFKA_INITIAL_RETRY_TIME),
      maxRetryTime: Number(KAFKA_MAX_RETRY_TIME),
      retries: Number(KAFKA_RETRIES),
    },
    ssl: KAFKA_SSL === 'true',
  },
  producer: {
    transfers: {
      config: {
        createPartitioner: Partitioners.DefaultPartitioner,
      },
      topic: 'topic.0',
    },
    transfersDLQ: {
      config: {
        createPartitioner: Partitioners.DefaultPartitioner,
      },
      topic: 'topic.dlq.0',
    },
  },
  akhq: {
    url: AKHQ_HOST,
    node: AKHQ_NODE,
  }
}
