let number = +prompt('Enter number');

if(number < 5 && number > -5) {
    console.log('Sorry, no numbers')
} else if(number > 0) {
    for (let i = 0; i <= number; i++) {
        let result = i % 5;
        if (result === 0) {
            console.log(i);
        }
    }
} else if (number < 0) {
    for (let i = number; i <= 0; i++) {
        let result = i % 5;
        if (result === 0) {
            console.log(i);
        }
    }
}
