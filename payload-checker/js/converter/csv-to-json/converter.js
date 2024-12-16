const path = require('path')
const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'planilha.csv');
const jsonFilePath = path.join(__dirname, 'planilha.json');

const jsonArray = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    jsonArray.push(row);
  })
  .on('end', () => {
    console.log(jsonArray)
    // Assuming the first row of the CSV contains column headers
    const columnNames = Object.keys(jsonArray[0]);

    const jsonObjects = jsonArray.map((row) => {
      const jsonObject = {};
      for (const columnName of columnNames) {
        jsonObject[columnName] = row[columnName];
      }
      return jsonObject;
    });
  
    fs.writeFile(jsonFilePath, JSON.stringify(jsonObjects, null, 2), (error) => {
      if (error) {
        console.error('Error writing JSON file:', error);
      } else {
        console.log('CSV data has been converted and written to JSON file.');
      }
    });
  });