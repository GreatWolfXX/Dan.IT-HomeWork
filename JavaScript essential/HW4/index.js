const createNewUser = function() {
    const firstName = prompt('Enter first name!');
    const lastName = prompt('Enter last name!');
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        getLogin() {
            return (firstName[0] + lastName).toLowerCase();
        },
    }
    return newUser;
}

console.log(createNewUser().getLogin());
