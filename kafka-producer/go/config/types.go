package config

type KafkaRetryConfig struct {
	InitialRetryTime int
	MaxRetryTime     int
	Retries          int
}

type KafkaConfig struct {
	Brokers           []string
	ClientID          string
	ConnectionTimeout int
	LogLevel          int
	RequestTimeout    int
	Retry             KafkaRetryConfig
	SSL               bool
}

type AkhqConfig struct {
	URL  string
	Node string
}

type AppConfig struct {
	Kafka    KafkaConfig
	Producer map[string]string
	Akhq     AkhqConfig
}
