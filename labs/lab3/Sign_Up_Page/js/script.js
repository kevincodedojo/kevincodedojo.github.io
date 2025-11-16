//even listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", generatePwd);
document.querySelector("#signupForm").addEventListener("submit", function (event) {
    validateForm(event);
})

displayStates();

//functions


//Display city from Web API after entering a zip code
async function displayCity() {

    // alert(document.querySelector("#zip").value);

    let zipCode = document.querySelector("#zip").value;

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    if (!data.city) {
        document.querySelector("#zipNotFound").innerHTML = "Zip code not found.";
        document.querySelector("#zipNotFound").style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";

    } else {
        document.querySelector("#zipNotFound").innerHTML = "";
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;

    }
}

async function displayStates() {
    let state = document.querySelector("#state");

    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();

    for (let i of data) {
        let option = document.createElement("option");
        option.value = i.usps.toLowerCase();
        option.textContent = i.state;

        state.appendChild(option);

    }

}


async function displayCounties() {

    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option>Select County</option>";

    // for(let i = 0; i < data.length; i++){
    //     countyList.innerHTML += `<option> ${data[i].county} </option>`;
    // }

    for (let i of data) {
        countyList.innerHTML += `<option> ${i.county} </option>`;
    }

}

// checking whether the username is available
async function checkUsername() {

    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");

    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username taken";
        usernameError.style.color = "red";
    }

}

// generatePwd
async function generatePwd() {
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();

    let suggestedPwd = document.querySelector("#suggestedPwd");

    suggestedPwd.innerHTML = data.password;
    suggestedPwd.style.color = "black"
    
}

//Validating form data
function validateForm(e) {
    //Prevent submission of a blank form.
    e.preventDefault();

    let isValid = true;

    //check username
    let username = document.querySelector("#username").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    }

    //check password length
    let password = document.querySelector("#password").value;
    let suggestedPwd_LengthError = document.querySelector("#suggestedPwd");

    if (password.length < 6) {
        suggestedPwd_LengthError.innerHTML = "The password must be at least 6 characters.";
        suggestedPwd_LengthError.style.color = "red";
        isValid = false;
    } else {
        suggestedPwd_LengthError.innerHTML = "Valid password.";
        suggestedPwd_LengthError.style.color = "green";
    }

    //check retype password
    let retypePW = document.querySelector("#retypePW").value;
    let passwordError = document.querySelector("#passwordError");

    if (password.length > 0 && retypePW !== password) {
        passwordError.innerHTML = "Retyped password didn't match!";
        passwordError.style.color = "red";
        isValid = false;
    } else if (password.length > 0 && retypePW === password) {
        passwordError.innerHTML = "Retyped password matches!";
        passwordError.style.color = "green";
    }



    if (isValid) {
        document.querySelector("#signupForm").submit();
    }


}