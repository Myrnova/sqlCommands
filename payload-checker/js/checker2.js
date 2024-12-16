const R = require('ramda')
const extratoBanking = require('./extrato-banking.json')
const extratoDash = require('./extrato-dash.json')
const extratoBanco = require('./extrato-banco.json')

const foundArray = []
const notFound = []

// planilha.forEach((item) => {
//   marretinha.forEach((payload, index) => {
//     const found = R.allPass([
//       R.propEq(item['key1'], 'key'),
//       R.pathEq(item['key1'], ['value','operation_id']),
//       R.pathEq(item['company'], ['value', 'metadata', 'company']),      
//       R.pathEq(item['key1'], ['value','metadata']),      
//       R.pathEq(parseInt(item['amount']), ['value','amount'])
//     ])(payload)

    
//     if (found && item['recipient'] === transfer.target) {     
//       foundArray.push(payload)
//       return
//     }
//   }) 
// })


// const doesNotContainObject = (array, objectId) => {
//   return !array.some(item => item.target === objectId);
// };

// planilha.forEach((payload) => {
//   const result = doesNotContainObject(foundArray, payload.recipient)
//   if(result) notFound.push(payload)
// })
let amountTransfers = 0
let amountTransfersBanking = 0
extratoBanco.forEach((banco) => {
  if(banco.object_type === 'transfer') {
    amountTransfers += banco.amount - banco.fee
    extratoBanking.forEach((banking) => {
      if (banking.subtitle.includes('TED') && Number(banking.amount) === banco.amount - banco.fee) {
        amountTransfersBanking += Number(banking.amount)
        foundArray.push(banco)
      }
    })
  }
})

const totalAmountBanking = extratoBanking.reduce(
  (accumulator, currentValue) => accumulator + Number(currentValue.amount), 0)
const totalAmountBanco = extratoBanco.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.amount) - Number(currentValue.fee)), 0)
const totalAmountDash = extratoDash.reduce(
  (accumulator, currentValue) => {
    if (Number(currentValue['Entrada líquida'].replace(',', '').replace('.', ''))) {
      return accumulator + Number(currentValue['Entrada líquida'].replace(',', '').replace('.', ''))
    }
    return accumulator +  Number(currentValue['Saída líquida'].replace(',', '').replace('.', '')) 
   }, 0)

// console.log(foundArray.length)
// console.log(planilha.length)

// console.log(marretinha.length)
// console.log(notFound)
console.log(amountTransfers)
console.log(amountTransfersBanking)
console.log(foundArray)
