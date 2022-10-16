//Game constants and variables
const gameOver = new Audio('Audio/game over.mp3')
const foodEat = new Audio('Audio/food.wav');
let inputDir = { x: 0, y: 0 }
let lastPaintTime = 0;
let speed = 5;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }

//Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //If you bump youself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true;
    }
}

function gameEngine() {
    //Update the snake array and food 
    if(isCollide(snakeArr)){
        gameOver.play();
        inputDir = {x: 0, y: 0};
        alert('Game over')
        score = 0;
        snakeArr = [{x: 13, y: 15}]
    }

    //If you have eaten the food increment the score and regenerate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score += 1;

        if(score>hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem('HigScore',JSON.stringify(hiScoreVal));
            hiScore.innerHTML = 'High Score : '+ hiScoreVal;
        }

        scoreBox.innerHTML = 'Score :' + score;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random())}
    } 

    //Moving the sanke
    for (let i = snakeArr.length - 2 ; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display the snake and food
    //Display snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        sankeElement = document.createElement('div');
        sankeElement.style.gridRowStart = e.y;
        sankeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            sankeElement.classList.add('head');
        } else {
            sankeElement.classList.add('snake');
        }

        board.appendChild(sankeElement);
    })
    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic starts here
let highScore = localStorage.getItem('HigScore');
if(highScore === null){
    hiScoreVal = 0;
    localStorage.setItem('HigScore',JSON.stringify(hiScoreVal))
}else{
    hiScoreVal = JSON.parse(highScore)
    hiScore.innerHTML = 'High Score : '+ highScore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//Start game
    switch (e.key) {

        case 'ArrowUp':
            console.log('arrow up');
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log('arrow down');
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log('arrow uleft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log('arrow rigth');
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})
