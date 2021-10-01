
.some()

This array method helps you determine if one or more of its values correspond to something you’re looking for.

var listHasPilots = operatives.some(function (operative) {
  return operative.pilot;
});

.every()

Check if every value of the array matches your condition by using .every() . It works exactly like .some(), but will return true only if every occurence match.

.find()

Will return the first value that corresponds to the passed condition.

var firstPilot = operatives.find(function (operative) {
  return operative.pilot;
});

.map()

Say you have received an array containing multiple objects – each one representing a person. The thing you really need in the end, though, is an array containing only the id of each person.

var officersIds = officers.map(function (officer) {
  return officer.id
});

.reduce()

Just like .map(), .reduce() also runs a callback for each element of an array. What’s different here is that reduce passes the result of this callback (the accumulator) from one array element to the other.
The accumulator can be pretty much anything (integer, string, object, etc.) and must be instantiated or passed when calling .reduce().
Time for an example! Say you have an array with these pilots and their respective years of experience:

var totalYears = pilots.reduce(function (accumulator, pilot) {
  return accumulator + pilot.years;
}, 0);


.filter()

What if you have an array, but only want some of the elements in it? That’s where .filter() comes in!

var empire = pilots.filter(function (pilot) {
  return pilot.faction === "Empire";
});