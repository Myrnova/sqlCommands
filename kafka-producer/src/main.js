import { splitEvery } from 'ramda'
import { signalTraps } from './config.js'
import { byteSize, delay, genMessage, parseArgs } from './helper.js'
import { sendToTopic, startProducer, stopProducer, produceMessageAKHQ } from './producer.js'


async function main () {
  const { batchSize, concurrency, delayBetweenBatches, messages } = parseArgs()
  
  const messagesInBatchesPromise = batchSize > 1
    ? splitEvery(batchSize, Array.from({ length: messages }, genMessage))
    : Array.from({ length: messages }, genMessage)

  const messagesInBatches = await Promise.all(messagesInBatchesPromise);
  const batchesConcurrently = splitEvery(concurrency, messagesInBatches)

  try {
  //   await startProducer()
    for (const batches of batchesConcurrently) {
      delayBetweenBatches > 0 && await delay(delayBetweenBatches)
      await Promise.all(batches.map(produceMessageAKHQ))
      console.log({
        message: 'message batch sended',
        batchSize,
        delayBetweenBatches,
        byteLengthOfTheBatch: batches.reduce((acc, obj) => acc + byteSize(obj), 0)

      });
    }

    console.log({
      message: 'all messages sended with success',
      batchSize,
      delayBetweenBatches,
      concurrency,
      messages
    });
  // } finally {
  //   await stopProducer()
  } catch (err) {
    console.error(err)
  }
}

signalTraps.forEach((type) => {
  process.once(type, async (signal) => {
    try {
      logger.info({
        message: 'Transfers consumer receives a shutdown signal and will disconnect',
        code: 'financial_movement',
        data: {
          signal,
        },
      })

      // await stopProducer()
    } finally {
      process.kill(process.pid, type)
    }
  })
})

main()
