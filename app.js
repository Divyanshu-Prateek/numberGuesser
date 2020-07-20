// Game Values
let min =1, max =10, correctGuess =2, triesLeft= 3;

// UI vars
const gameType = document.querySelector('#game-type');
const gamePlay = document.querySelector('#game-play');
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const submitBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const UImessage = document.querySelector('.message');


// On DOMcontent Load
document.addEventListener('DOMContentLoaded',function(){
  gameType.style.display ='block';
  gamePlay.style.display ='none';

  // Selct Game Type
  selectGameType();
})

// Select Game Type:
function selectGameType(){
  
  const easyBtn = document.querySelector('.easy-btn');
  const hardBtn = document.querySelector('.hard-btn');
  const mediumBtn = document.querySelector('.medium-btn');
  
  // adding event listeners to the game-type display
  easyBtn.addEventListener('click',function(e){

    min =1;
    max =5;
    minNum.textContent =min;
    maxNum.textContent = max;
    setCorrectGuess();

    // Display the Game
    displayGame();
  });
  mediumBtn.addEventListener('click',function(e){

    min =1;
    max =10;
    minNum.textContent =min;
    maxNum.textContent = max;
    setCorrectGuess();

    // Display the Game
    displayGame();
  });
  hardBtn.addEventListener('click',function(e){
    
    min =1;
    max =20;
    minNum.textContent =min;
    maxNum.textContent = max;
    setCorrectGuess();

    // Display the Game
    displayGame();
  });

  

}

// Set Correct Guess
function setCorrectGuess(){
  correctGuess =Math.floor(Math.random()*(max-min+1)+min);
  //console.log(correctGuess,"Here");
  
}

// display game and hide game-type
function displayGame(){
  gameType.style.display ='none';
  gamePlay.style.display ='block';
}

// event Listener on click btn
submitBtn.addEventListener('click',function(e){
  if(submitBtn.value=== 'Play Again'){
    location.reload();
  }
  else{
    const guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess >max){
      // show Error
      showError(`Please Enter a Number between ${min} and ${max}`)
      showMessage(`Please Enter a Number between ${min} and ${max}`,'red');
    }else{
      if(guess=== correctGuess){
        // show Winning Message
        showMessage(`${guess} is the right answer. You have won!!`,'green');
        // End Game red, true,'Play Again'
        endGame('green',true,'Play Again');
        // Clear the input
        //guessInput.value = '';
      }
      else{
        triesLeft -=1;
        if(triesLeft > 0){
            // show Not Correct Message
          showMessage(`${guess} is the wrong answer. You have ${triesLeft} tries left.`,'red');
          // change border color
          guessInput.style.borderColor ='yellow';
          // Clear the input
          guessInput.value = '';
        }
        else{
            // show Losing Message
          showMessage(`${guess} is the Wrong answer. You Lost !. Correct guess is ${correctGuess}`,'red');
          
          // End Game red, true,'Play Again'
          endGame('red',true,'Play Again');
          // Clear the input
          //guessInput.value = '';
        }
      }
    }
    //console.log(guess);
  }
})

//show Message Function
function showMessage(message, color){
  UImessage.textContent = message;
  UImessage.style.color = color;
}

//function endGame
function endGame(bColor,disableGuessInput,valueBtn='submit'){
   //Change border Color
   guessInput.style.borderColor =bColor;
   // disable Input
   guessInput.disabled =disableGuessInput;
   // set submit to Play again
   submitBtn.value = valueBtn;
}

// show Error Function
function showError(errorMessage){
  const container = document.querySelector('#game-play');
  // Create Alert
  const alert = document.createElement('p');
  alert.className = 'alert alert-error';
  alert.appendChild(document.createTextNode(errorMessage));
  // Inserting Alert to the UI
  container.insertBefore(alert,game);
  //Remove Alert after 2 sec
  setTimeout(removeErrorMessage,2000);
}

// remove error Message
function removeErrorMessage(){
  document.querySelector('.alert').remove();
}