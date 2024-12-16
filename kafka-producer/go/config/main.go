package config

import (
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
)

func getEnv(key string, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultValue
	}
	return value
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}

func getEnvAsBool(key string, defaultValue bool) bool {
	valueStr := getEnv(key, "")
	if strings.ToLower(valueStr) == "true" {
		return true
	} else if strings.ToLower(valueStr) == "false" {
		return false
	}
	return defaultValue
}

func GetConfigs() AppConfig {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file" + err.Error())
	}

	return AppConfig{
		Kafka: KafkaConfig{
			Brokers:           strings.Split(getEnv("KAFKA_APP_HOSTS", ""), ","),
			ClientID:          getEnv("KAFKA_CLIENT_ID", "banking"),
			ConnectionTimeout: getEnvAsInt("KAFKA_CONNECTION_TIMEOUT", 30000),
			LogLevel:          getEnvAsInt("KAFKA_LOG_LEVEL", 1),
			RequestTimeout:    getEnvAsInt("KAFKA_REQUEST_TIMEOUT", 30000),
			Retry: KafkaRetryConfig{
				InitialRetryTime: getEnvAsInt("KAFKA_INITIAL_RETRY_TIME", 100),
				MaxRetryTime:     getEnvAsInt("KAFKA_MAX_RETRY_TIME", 1000),
				Retries:          getEnvAsInt("KAFKA_RETRIES", 5),
			},
			SSL: getEnvAsBool("KAFKA_SSL", false),
		},
		Producer: map[string]string{
			"topic": getEnv("KAFKA_TOPIC", ""),
			"dlq":   getEnv("KAFKA_DQL_TOPIC", ""),
		},
		Akhq: AkhqConfig{
			URL:  getEnv("AKHQ_HOST", ""),
			Node: getEnv("AKHQ_NODE", ""),
		},
	}
}
