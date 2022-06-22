//? generic-types

const identity = <Type>(value: Type): Type => value

const number = identity<number>(2)
// const falha = identity<number>("2") // não aceita pois o tipo esta errado


const object = identity<{ a: number, b: boolean}>({
  a: 1,
  b: false,
})


//? generic-extends

const identityWithLength = <Type extends { length: number}>(value: Type) {
  console.log(value.length)
  return value
}


// identityWithLength(10) // não tem length

identityWithLength('adsa') // string tem a função length

identityWithLength({ length: 10 })


// prop('name', { name: 'Test'}) //Test

function getProperty<Type, Key extends keyof Type>(object: Type, key: Key) {
  return object[key]
}

getProperty({ 
  name: 'Test',
  age: 25
}, 'name')

// getProperty({ name: 'Test'}, 'dasdsa') // erro porque dasdsa nao existe no type { name: 'Test'} 


//? create-types

interface Person {
  name: string
  age: number
}

interface Employee extends Person {
  job: {
    title: string
    description?: string
  }
}

type Job = Employee['job']
type JobTitle = Employee['job']['title']


type JobWithPerson = Job & Person


type JobWithSalary = Job & { salary: number}