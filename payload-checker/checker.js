const R = require('ramda')
const planilha = require('./planilha.json')
const marretinha = require('./marretinha.js')

const foundArray = []
const notFound = []

planilha.forEach((item) => {
  marretinha.forEach((payload, index) => {
    const found = R.allPass([
      R.propEq(item['key1'], 'key'),
      R.pathEq(item['key1'], ['value','operation_id']),
      R.pathEq(item['company'], ['value', 'metadata', 'company']),      
      R.pathEq(item['key1'], ['value','metadata']),      
      R.pathEq(parseInt(item['amount']), ['value','amount'])
    ])(payload)

    
    if (found && item['recipient'] === transfer.target) {     
      foundArray.push(payload)
      return
    }
  }) 
})


const doesNotContainObject = (array, objectId) => {
  return !array.some(item => item.target === objectId);
};

planilha.forEach((payload) => {
  const result = doesNotContainObject(foundArray, payload.recipient)
  if(result) notFound.push(payload)
})

const totalAmount = foundArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)

console.log(foundArray.length)
console.log(planilha.length)

console.log(marretinha.length)
console.log(notFound)
// console.log(totalAmount)
