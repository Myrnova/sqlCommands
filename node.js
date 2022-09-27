// how to write a file using csv-write-stream

const csvWriter = require('csv-write-stream')
const fs = require('fs')

const headers = [
  'Coluna 1',
  'Coluna 2',
  'Coluna 3',
  'Coluna 4',
]
const writer = csvWriter({
  headers
})
writer.pipe(fs.createWriteStream('out.csv'))
writer.write([
  'Linha 1 Valor 1',
  'Linha 1 Valor 2',
  'Linha 1 Valor 3',
  'Linha 1 Valor 4',

])
writer.write([
  'Linha 1 Valor 1',
  'Linha 2 Valor 2',
  'Linha 2 Valor 3',
  'Linha 2 Valor 4',
])
writer.end()