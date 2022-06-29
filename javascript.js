const exampleArray = [1, 2, 3, 4, 5, 6]


exampleArray.some()
//* This array method helps you determine if one or more of its values correspond to something you’re looking for.

var listHasPilots = operatives.some(function (operative) {
  return operative.pilot;
});

exampleArray.every()
//* Check if every value of the array matches your condition by using .every() . It works exactly like .some(), but will return true only if every occurence match.


exampleArray.find()

var firstPilot = operatives.find(function (operative) {
  return operative.pilot;
});

//* Will return the first value that corresponds to the passed condition.

exampleArray.map()

var officersIds = officers.map(function (officer) {
  return officer.id
});

//* Say you have received an array containing multiple objects – each one representing a person.
//The thing you really need in the end, though, is an array containing only the id of each person.

exampleArray.reduce()

var totalYears = pilots.reduce(function (accumulator, pilot) {
  return accumulator + pilot.years;
}, 0);

//* Just like .map(), .reduce() also runs a callback for each element of an array. What’s different here is that reduce passes the result of this callback (the accumulator) from one array element to the other.
//* The accumulator can be pretty much anything (integer, string, object, etc.) and must be instantiated or passed when calling .reduce(). We can also state which value will the accumulator initiate with passing a number after the function


exampleArray.filter()
var empire = pilots.filter(function (pilot) {
  return pilot.faction === "Empire";
});

//* What if you have an array, but only want some of the elements in it? That’s where .filter() comes in!

exampleArray.slice()
//* slice() method returns the selected element(s) in an array, as a new array object. Selects from a given start, up to a (not inclusive) given end and does not change the original array.

exampleArray.splice()

//* The splice() method adds and/or removes array elements and overwrites the original array.

//* https://stackoverflow.com/questions/37601282/javascript-array-splice-vs-slice

Object.defineProperties(window.HTMLElement.prototype, {
  clientHeight: {
    get: function () {
      return this.tagName === 'SECTION' ? 75 : 450
    },
    enumerable: true,
    configurable: true
  }
})

//* object.defineProperties
//* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
//* https://stackoverflow.com/questions/25517989/why-cant-i-redefine-a-property-in-a-javascript-object


Object.keys(object) // get the name of keys of the object
//* https://javascript.info/keys-values-entries

//regex
replace(/<a (.*?)>(.*?)<\/a>/g, '<a $1 ><span></span>$2</a>')
//* (.*?) is getting everything between <a and >, then the $1 corresponds to replacing the first (.*?) back in. Therefore the second occurrence is then placed where $2 is.

//* map with async inside
const paths = await Promise.all(
    allContentTypes.contentTypes.map(async ({ slug }) => {
      const { data } = await apolloClient.query({
        query: GET_POSTS_CONTENT_TYPE,
        variables: {
          contentType: `${slug}`,
          totalPost: 50
        }
      })
      return postContentType.posts.map((post) => ({
        params: {
          contentType: slug,
          slug: post.slug
        }
      }))
    })
  ).then((data) => data.flat())

//* flat The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8]


const tasks = uniq(values.taskList
  .split('\n')
  .filter((value) => !Number.isNaN(value))
  .filter(Boolean) // keep only true elements
  .map(Number)) // convert itens to number equivalent to .map((str, ind, arr) => Number(str, ind, arr));