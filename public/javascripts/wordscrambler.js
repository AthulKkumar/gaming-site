const msg = document.querySelector('.msg');
const guess = document.querySelector('input');
const btn = document.getElementById('btn');
const score = document.querySelector('.score');

let play = false;
let newWord = '';
let randomWord = '';
let sWords = ['apple', "orange", 'mango', "pineapple",'grapes','banana','carrot','potato','watermelon','stawberry']
let scoreCount = 0;
//Function to pick random words from the sWords
const createNewWord = () => {
    let randomNumber = Math.floor(Math.random() * sWords.length); //To get an random number and pass in the array index
    let newTempsWords = sWords[randomNumber]; //It will choose an random element from the sWord array
    return newTempsWords;
}
//Function to scrabmble the word
const scrambleword = (arr) => {
    //Loop to shuffle the selected word
    for (let i = arr.length - 1; i >= 0; i--) {
        let temp = arr[i];
        let j = Math.floor(Math.random() * (i + 1));

        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;

}
//If the user press the click start button
btn.addEventListener('click', function () {
    if (!play) {

        play = true;
        btn.innerHTML = 'Guess';
        guess.classList.toggle('hidden');
        newWord = createNewWord();//FEtch an random word from the array
        randomWord = scrambleword(newWord.split('')).join('');//scramble the newword an split into an array and pass it and the result will be joined
        msg.innerHTML = randomWord;
        score.innerHTML = scoreCount;
    } else {

        let inputWord = guess.value;
        //If the inputed value an the word is true
        if (inputWord === newWord) {
            play = false;
            scoreCount++;
            score.innerHTML = scoreCount;
            msg.innerHTML = `Its correct`;
            btn.innerHTML = 'Start again';
            guess.classList.toggle('hidden');
            guess.value = '';

            //To give the score to the backend
            fetch('/wordscramblescore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    score: scoreCount
                }),
            })

        }
        //Else the inouted value is false
        else {
            play = false;
            msg.innerHTML = `Its incorrect`;
            guess.classList.toggle('hidden');
        }
    }
})


//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });