
//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click",initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let number_win = 0;
let number_loss = 0;
let attemp_left_num = 7;

//show initial win and loss
let total_wins = document.querySelector(".total_wins"); 
total_wins.textContent = "Total win(s): " + number_win;

let total_loss = document.querySelector(".total_loss");
total_loss.textContent = "Total loss(es)" + number_loss;


// attemp left text
let attempt_left = document.querySelector(".attempt_left");
attempt_left.textContent = "Attempt left: " + attemp_left_num;




document.querySelector(".total_loss").textContent = "Total loss(es): " + number_loss;

initializeGame();

function initializeGame(){

    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("rangomNumber: " + randomNumber);
    attempts = 0;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to textbox
    playerGuess.value = "";

    //clearing the feedback
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    //clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    //reset attempt number
    attemp_left_num = 7;
    attempt_left.textContent = "Attempt left: " + attemp_left_num;

}

function checkGuess() {

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;

    console.log("Player guess: " + guess)
    
    if(guess < 1 || guess > 99){
        
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        

        return;
    }

    attempts++;

    attemp_left_num--;
    attempt_left.textContent = "Attempt left: " + attemp_left_num;


    console.log("Attempts:" + attempts);
    feedback.style.color = "orange";

    if(guess == randomNumber){
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        number_win ++;
        total_wins.textContent = "Total win(s): " + number_win;
        gameOver();
    }else{
        document.querySelector("#guesses").textContent += guess + " ";

        if(attempts == 7){
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";
            number_loss ++;
            total_loss.textContent = "Total loss(es)" + number_loss;
            gameOver();
        }else if(guess > randomNumber){
            feedback.textContent = "Guess was high";
        }else{
            feedback.textContent = "Guess was low";
        }

    }


}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}






