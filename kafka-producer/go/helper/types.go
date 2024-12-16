package helper

type Flags struct {
	DefaultValue    int
	HelpMessage     string
	VariableAddress *int
	Alias           string
}

type Args struct {
	BatchSize           int
	Messages            int
	DelayBetweenBatches int
	Concurrency         int
}
