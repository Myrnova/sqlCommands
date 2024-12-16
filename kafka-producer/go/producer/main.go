package producer

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"myrnova/kafka-producer/config"
)

// ProduceMessageAKHQ sends messages to AKHQ
func ProduceMessageAKHQ(transfer map[string]interface{}) error {
	kafkaConfig := config.GetConfigs()
	client := &http.Client{}
	url := fmt.Sprintf("%s/api/%s/topic/%s/data",
		kafkaConfig.Akhq.URL,
		kafkaConfig.Akhq.Node,
		kafkaConfig.Producer["topic"],
	)
	body, _ := json.Marshal(map[string]interface{}{
		"headers":      map[string]string{},
		"multiMessage": false,
		"key":          transfer["operation_id"],
		"value":        transfer,
	})

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		log.Printf("Failed to create request: %v", err)
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Failed to send request: %v", err)
		return err
	}

	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(resp.Body)
		log.Printf("Failed to send message: %s", responseData)
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}
	log.Println("Message sent to AKHQ")
	return nil
}
