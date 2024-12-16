package main

import (
	"log"
	"myrnova/kafka-producer/helper"
	"myrnova/kafka-producer/producer"
	"os"
	"os/signal"
	"sync"
	"syscall"
)

func main() {
	args := helper.ParseArgs()
	batchSize := args.BatchSize
	concurrency := args.Concurrency
	delayBetweenBatches := args.DelayBetweenBatches
	messagesCount := args.Messages
	var messages []map[string]interface{}
	for i := 0; i < messagesCount; i++ {
		messages = append(messages, helper.GenMessage())
	}
	messageBatches := helper.SplitEvery(messages, batchSize)

	signalTraps := []os.Signal{syscall.SIGINT, syscall.SIGTERM}
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, signalTraps...)

	go func() {
		for sig := range signalChan {
			log.Printf("Received shutdown signal: %s", sig)
			os.Exit(0)
		}
	}()

	var wg sync.WaitGroup

	for _, batch := range messageBatches {
		if delayBetweenBatches > 0 {
			helper.Delay(delayBetweenBatches)
		}
		wg.Add(concurrency)
		for _, message := range batch {
			go func(batch []map[string]interface{}) {
				defer wg.Done()
				err := producer.ProduceMessageAKHQ(message)
				if err != nil {
					log.Printf("Failed to send batch: %v", err)
				}
			}(batch)
		}

	}
	wg.Wait()

	log.Println("All messages sent successfully")
}
