import kafkajs from 'kafkajs'
import axios from 'axios'

import { appConfig } from './config.js'

const { CompressionTypes, Kafka } = kafkajs
const kafka = new Kafka(appConfig.kafka)
const producer = kafka.producer(appConfig.producer.transfers.config)

export async function sendToTopic(transfers) {
  const messages = transfers.map((transfer) => ({
    key: transfer.operation_id,
    value: JSON.stringify(transfer),
  }))

  const metadata = await producer.send({
    topic: appConfig.producer.transfers.topic,
    compression: CompressionTypes.GZIP,
    messages,
  })

  console.log({
    message: 'Messages sended to topic',
    topic: metadata[0].topicName,
    lastLffset: metadata.at(-1).baseOffset,
    transfer_ids: transfers.map((m) => m.transfer.id),
  })

  return metadata
}

export async function startProducer() {
  await producer.connect()

  console.log({
    message: 'producer connected',
  })
}

export async function stopProducer() {
  await producer.disconnect()

  console.log({
    message: 'producer disconnected',
  })
}


const client = axios.create({
  baseURL: appConfig.akhq.url.toString(),
  headers: {
    'Content-Type': 'application/json',
  }
});


export async function produceMessageAKHQ (transfers) {  
  try {
  for await (const transfer of transfers) {
    const body = {
      headers: {},
      multiMessage: false,
      key: transfer.operation_id,
      value: JSON.stringify(transfer),
    }
    await client.post(`/api/${appConfig.akhq.node}/topic/${appConfig.producer.transfers.topic}/data`, body)
  } 
  } catch (error) {
    console.log(error)
    throw error
  }
}
