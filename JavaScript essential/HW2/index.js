let number = +prompt('Enter number');

if(number >= 5) {
    for (let i = 0; i <= number; i++) {
        let result = i % 5;
        if (result === 0) {
            console.log(i);
        }
    }
} else if(number < 5) {
    console.log('Sorry, no numbers')
}
