const path = require('path')
const fs = require('fs');
const ramda = require('ramda')
const ids = []


const splitedArray = ramda.splitEvery(2000, ids)

splitedArray.forEach((array, index) => {
  const jsonFilePath = path.join(__dirname, `planilha${index}.json`);
  fs.writeFile(jsonFilePath, JSON.stringify(array, null, 2), (error) => {
    if (error) {
      console.error('Error writing JSON file:', error);
    } else {
      console.log('CSV data has been converted and written to JSON file.');
    }
})
})