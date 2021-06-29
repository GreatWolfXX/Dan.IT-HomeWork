const firstName = prompt('Enter first name!');
const lastName = prompt('Enter last name!');
const birthday = prompt('Enter birthday! (Format: dd.mm.yyyy)')
const createNewUser = function(firstName, lastName, birthday) {
    const birthdaySplit = birthday.split('.');
    const date = new Date();
    const getDateToday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const birthdayDate = new Date(+birthdaySplit[2], +birthdaySplit[1], +birthdaySplit[0]);
    const birthdayNow = new Date(getDateToday.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        getLogin() {
            return (firstName[0] + lastName).toLowerCase();
        },
        getAge() {
            let age = getDateToday.getFullYear() - birthdayDate.getFullYear();
            if (getDateToday <  birthdayNow) {
                age = age - 1;
            }
            return age;
        },
        getPassword() {
            return firstName[0].toUpperCase() + lastName.toLowerCase() + birthdaySplit[2];
        }
    }
    return newUser;
}

console.log(`${createNewUser(firstName, lastName, birthday).getLogin()} ${createNewUser(firstName, lastName, birthday).getAge()} ${createNewUser(firstName, lastName, birthday).getPassword()}`);
