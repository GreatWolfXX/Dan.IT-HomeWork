let name = prompt('Enter Name');
let age = +prompt('Enter your age');
if(age < 18 || isNaN(age)){
    alert('You are not allowed to visit this website');
} else if (age > 22) {
    alert(`Welcome, ${name}`)
} else if (age => 18 && age <= 22) {
    let isContinue = confirm('Are you sure you want to continue?');
    if(isContinue){
        alert(`Welcome, ${name}`)
    } else if(!isContinue) {
        alert('You are not allowed to visit this website')
    }
}
