
//Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();
displayQ6Choices();

//Global variables
let score = 0;
let attempts = localStorage.getItem("total_attempts");

//get q5 range value
let sliderq5 = document.querySelector("#q5")
let q5ValueDisplay = document.querySelector("#value5")
sliderq5.oninput = () => q5ValueDisplay.textContent = sliderq5.value;


//Functions
function displayQ4Choices(){

    let q4ChoicesArray = ["Maine", "RhodeIsland", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    for(let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += 
        `
            <input type = "radio" name = "q4" id = "${q4ChoicesArray[i]}"
            value = "${q4ChoicesArray[i]}"> <label for ="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label>

        `;
    }
}

function displayQ6Choices(){

    let q6ChoicesArray = ["Texas", "Alaska", "California", "Montana"];
    q6ChoicesArray = _.shuffle(q6ChoicesArray);

    for(let i = 0; i < q6ChoicesArray.length; i++){
        document.querySelector("#q6Choices").innerHTML += 
        `
            <input type = "radio" name = "q6" id = "${q6ChoicesArray[i]}"
            value = "${q6ChoicesArray[i]}"> <label for ="${q6ChoicesArray[i]}">${q6ChoicesArray[i]}</label>

        `;
    }
}


function isFormValid(){

    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
        
    }
    return isValid;

}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src = 'img/checkmark.png' alt = 'Checkmark'>";
    score += 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src = 'img/xmark.png' alt = 'xmark'>";
}

function gradeQuiz(){
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = "";
    if(!isFormValid()){
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;

    const selectedQ4 = document.querySelector("input[name=q4]:checked");
    let q4Response = "";
    if(selectedQ4){
        q4Response = selectedQ4.value;
    }


    let q5Response = document.querySelector("#q5").value;

    const selectedQ6 = document.querySelector("input[name=q6]:checked");
    let q6Response = "";
    if(selectedQ6){
        q6Response = selectedQ6.value;
    }

    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value;
    
    console.log(q1Response);

    //Grading question 1
    if(q1Response == "sacramento"){
        rightAnswer(1);
    }
    else{
        wrongAnswer(1);
    }

    //Grading question 2
    if(q2Response == "mo"){
        rightAnswer(2);
    }
    else{
        wrongAnswer(2);
    }

    //Grading question 3
    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked
        && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked){
        rightAnswer(3);
    }
    else{
        wrongAnswer(3);
    }

    //Grading question 4
    if(q4Response == "RhodeIsland"){
        rightAnswer(4);
    }
    else{
        wrongAnswer(4);
    }

    //Grading question 5
    if(q5Response <= 41 && q5Response >= 37){
        rightAnswer(5);
    }
    else{
        wrongAnswer(5);
    }

    //Grading question 6
    if(q6Response == "Alaska"){
        rightAnswer(6);
    }
    else{
        wrongAnswer(6);
    }

    //Grading question 7
    if(q7Response == "florida"){
        rightAnswer(7);
    }
    else{
        wrongAnswer(7);
    }

      //Grading question 8
    if(!document.querySelector("#Whitney").checked && !document.querySelector("#Rainier").checked
        && document.querySelector("#Denali").checked && !document.querySelector("#Elbert").checked){
        rightAnswer(8);
    }
    else{
        wrongAnswer(8);
    }

    //Grading question 9
    if(q9Response == "Albany"){
        rightAnswer(9);
    }
    else{
        wrongAnswer(9);
    }

    //Grading question 10
    if(q10Response == "1959"){
        rightAnswer(10);
    }
    else{
        wrongAnswer(10);
    }

    //color of the score
    if(score < 80){
        document.querySelector("#totalScore").className = "text-danger";
    }else{
        document.querySelector("#totalScore").className = "text-success";
    }

    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

    if(score > 80){
        document.querySelector("#totalScore").innerHTML += " Congratulation, great job!";
    }



    

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts)

}