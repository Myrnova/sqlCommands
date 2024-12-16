package main

import (
	"fmt"
	"myrnova/payload-checker/converter"
)

func main() {
	planilhaName := "planilha"
	converter.XslxToCsv(planilhaName)
	converter.CsvToInterface(planilhaName)
	jsonPlanilha := converter.ReadJson(planilhaName)
	jsonMarretinha := converter.ReadJson("extrato-dash")

	fmt.Println(jsonPlanilha[0])
	fmt.Println(jsonMarretinha[0])
}
