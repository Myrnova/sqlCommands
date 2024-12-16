package helper

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"time"

	"github.com/oklog/ulid/v2"
)
// genMessage generates a structured message
func GenMessage() map[string]interface{} {
	return map[string]interface{}{}
	}
}

// ByteSize calculates the byte size of a JSON-encoded object
func ByteSize(obj interface{}) int {
	jsonData, err := json.Marshal(obj)
	if err != nil {
		log.Fatalf("Failed to marshal object: %v", err)
	}
	return len(jsonData)
}

// Delay pauses execution for the specified duration (in milliseconds)
func Delay(value int) {
	time.Sleep(time.Duration(value) * time.Millisecond)
}

var (
	batchSize,
	concurrency,
	delayBetweenBatches,
	messages int
)

var flags = map[string]Flags{
	"batch-size": {
		DefaultValue:    1,
		HelpMessage:     "Positive integer, size of the batches",
		Alias:           "b",
		VariableAddress: &batchSize,
	},
	"concurrency": {
		DefaultValue:    1,
		HelpMessage:     "Positive integer, number of go routines",
		Alias:           "c",
		VariableAddress: &concurrency,
	},
	"delay-between-batches": {
		DefaultValue:    1,
		HelpMessage:     "Positive integer, delay set between go routines",
		Alias:           "d",
		VariableAddress: &delayBetweenBatches,
	},
	"messages": {
		DefaultValue:    1,
		HelpMessage:     "Positive integer, number of random messages",
		Alias:           "m",
		VariableAddress: &messages,
	},
}

// ParseArgs parses command-line arguments
func ParseArgs() Args {
	for _, info := range flags {
		flag.IntVar(info.VariableAddress, info.Alias, info.DefaultValue, info.HelpMessage)
	}
	flag.Parse()

	help := func() {
		helpMessage := `
	      Example
	        go run main.go -m 200 -b 2 -c 2

	      Arguments`
		for _, info := range flags {
			helpMessage += "\n	      -" + info.Alias + ": " + info.HelpMessage
		}
		os.Exit(1)
	}

	if batchSize <= 0 || concurrency <= 0 || delayBetweenBatches <= 0 || messages <= 0 {
		help()
	}

	return Args{BatchSize: batchSize, Concurrency: concurrency, DelayBetweenBatches: delayBetweenBatches, Messages: messages}
}

// RandomID generates a random ID with an optional prefix
func RandomID(prefix string) string {
	id := ulid.Make().String()
	if prefix != "" {
		return fmt.Sprintf("%s_%s", prefix, id)
	}
	return id
}

func RandomInteger() int {
	return rand.Int()
}

func SplitEvery(slice []map[string]interface{}, chunkSize int) [][]map[string]interface{} {
	if chunkSize <= 0 {
		return nil
	}

	var chunks [][]map[string]interface{}
	for i := 0; i < len(slice); i += chunkSize {
		end := i + chunkSize
		if end > len(slice) {
			end = len(slice)
		}
		chunks = append(chunks, slice[i:end])
	}
	return chunks
}
