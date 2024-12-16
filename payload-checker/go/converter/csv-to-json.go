package converter

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func readCsvFile(filePath string) [][]string {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file "+filePath, err)
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
	}

	return records
}

func CsvToInterface(fileName string) {
	csvRecords := readCsvFile("./converter/files/" + fileName + ".csv")
	columnNames := csvRecords[0]
	csvRecords = csvRecords[1:]
	var csvRecordsArrayMap []map[string]string
	for _, csvRow := range csvRecords {
		csvRecordMap := map[string]string{}
		for i, value := range csvRow {
			csvRecordMap[columnNames[i]] = value
		}
		csvRecordsArrayMap = append(csvRecordsArrayMap, csvRecordMap)
	}

	jsonString, _ := json.Marshal(csvRecordsArrayMap)
	os.WriteFile("./converter/files/"+fileName+".json", jsonString, os.ModePerm)
}

func ReadJson(fileName string) []interface{} {
	file, _ := os.ReadFile("./converter/files/" + fileName + ".json")

	var data []interface{}

	err := json.Unmarshal(file, &data)

	if err != nil {
		fmt.Println(err)
	}
	return data
}
