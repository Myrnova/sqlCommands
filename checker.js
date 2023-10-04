const R = require('ramda')
const planilha = require('./planilha.json')
const marretinha = require('./marretinha.json')


const foundArray = []
const notFound = []

planilha.forEach((item) => {
  marretinha.forEach((payload) => {
    const found = R.allPass([
      R.propEq(item.recipient_id, 'source_id'),
      R.propEq(item.amount, 'amount'),
    ])(payload)


    if (found) {
      foundArray.push(payload)
      return
    }
  }) 
})


const doesNotContainObject = (array, objectId) => {
  return !array.some(item => item.source_id === objectId);
};

planilha.forEach((transfer) => {
  const result = doesNotContainObject(foundArray, transfer.recipient_id)
  if(result) notFound.push(transfer)
})

const totalAmount = foundArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)

console.log(foundArray.length)
console.log(planilha.length)

console.log(marretinha.length)


console.log(notFound)

console.log(totalAmount)
