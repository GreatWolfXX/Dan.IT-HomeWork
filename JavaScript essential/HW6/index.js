const testArray = ['hello', 'world', 23, '23', null];
const filterBy = function (array, typeItemArray) {
    return testArray.filter(element => typeof element !== typeItemArray);
}

console.log(filterBy(testArray, `string`));
