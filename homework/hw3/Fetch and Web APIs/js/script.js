//api key holder
const api_key = "79a814e8ca0a36ff339329d31b74d59f";

//add eventListener

document.querySelector("#form-section").addEventListener("submit", function (event) {

        event.preventDefault();

        const cityName = document.querySelector("#cityName").value.trim();
        const nameError = document.querySelector("#nameError");

        console.log(document.querySelector("#displayResult").classList);

        //hidden displayResult
        document.querySelector(".displayCity").textContent = "";
        document.querySelector(".searchResult").textContent = "";
        document.querySelector(".temperature").textContent = "";

        document.querySelector(".tempImg").classList.add("hidden")

        console.log(document.querySelector("#displayResult").classList);

        //js validation
        if(cityName.length == 0){
            nameError.textContent = "A city name needed.";
            return
        }else{
            nameError.textContent = "";
        }

        fetchWeather(cityName);
})

async function fetchWeather(cityName) {

    const displayCity = document.querySelector(".displayCity");
    const searchResult = document.querySelector(".searchResult");
    const temperature = document.querySelector(".temperature");
    const tempImg = document.querySelector(".tempImg");


    //reset page
    
    tempImg.src = "";
    tempImg.alt = "";
    temperature.textContent = ""



    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${api_key}&units=imperial`;
    const response = await fetch(url);
    

    const data = await response.json();
    console.log(data);

    if(data.cod == '404'){
        displayCity.textContent = data.message;
        searchResult.textContent = "Please enter a valid city name."
        return;
    }


    document.querySelector(".tempImg").classList.remove("hidden")
    const dataTemp = data.main.temp
    const weatherCondition = data.weather[0].description;

    data.weather[0].description

    displayCity.textContent = data.name;
    searchResult.textContent = weatherCondition;
    temperature.textContent = `Temperature: ${dataTemp}°F`;

    if(dataTemp < 65){
        tempImg.src = "img/temp_cold.jpg"
        tempImg.alt = "cold temperature"
    }else if(dataTemp >= 65 && dataTemp <= 75){
        tempImg.src = "img/temp_warm.jpg"
        tempImg.alt = "warm temperature"
    }else{
        tempImg.src = "img/temp_hot.jpg"
        tempImg.alt = "hot temperature"
    }

}