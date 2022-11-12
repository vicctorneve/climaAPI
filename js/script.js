// Variaveis e seleção de elementos
const apiKey = "86a41a83aad096c8374353b242de9087";
let j = 0;
// const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const weatherContainer = document.querySelector("#weather-data");

const containerBack = document.querySelector('.container-back');
const btnBack = document.querySelector('#back');

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const containerError = document.querySelector(".container-error")
const loader = document.querySelector("#loader");

const suggestionsContainer = document.querySelector("#suggestions");
const suggestionsBtns = document.querySelectorAll("#suggestions button");
const suggestionsList = [];

// Funções

const getWeatherData = async(city) =>{
   toggleLoader();
   try {
      const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
   
      const res = await fetch(apiWeatherURL);
   
      const data = await res.json();
      toggleLoader();
      return data
   } catch (error) {
      console.error(error)
   }
}

const showWeatherData = async(city) =>{
   hideInformations()
   const data = await getWeatherData(city);
   if(data.cod === "404"){
      showErrorMenssage()
      return
   }
   // addBgClima(data)
   removeClass();
   cleanInput()
   cityElement.innerText = data.name;
   tempElement.innerHTML = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
   weatherIconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
   );
   // countryElement.setAttribute(
   //    'src',
   //    apiCountryURL + data.sys.country
   // )
   humidityElement.innerText = `${data.main.humidity}%`;
   windElement.innerText = `${data.wind.speed}km/h`;
}

const removeClass = () => {
   weatherContainer.classList.remove('hide');
   containerBack.classList.remove('hide')
}

const cleanInput = () => cityInput.value = '';

const toggleLoader = () => loader.classList.toggle("hide");

const addBgClima = (data) =>{
   if(data.weather[0].description = "nublado"){
      document.body.style.backgroundImage = "url(../assets/img/ceu-nublado.png)"
   }
}

// Tratamento de erros
const showErrorMenssage = () =>{
   containerError.classList.remove('hide');
   containerBack.classList.remove('hide')
   cleanInput()
} 

const hideInformations = () =>{
   containerError.classList.add("hide");
   suggestionsContainer.classList.add('hide');
   weatherContainer.classList.add("hide");
   containerBack.classList.add("hide");
}
// Eventos

searchBtn.addEventListener('click', function(e){
   e.preventDefault();
   if(cityInput.value !== ""){
      const city = cityInput.value;
      showWeatherData(city);
      
   }
})

cityInput.addEventListener('keyup', function(e){
   if(e.code === "Enter"){
      if(e.target.value !== ""){
         const city = e.target.value;
         showWeatherData(city);
      }
   }
})

suggestionsBtns.forEach( function(btn){
   btn.addEventListener("click", function(){
      const city = btn.innerHTML;
      showWeatherData(city);
   })
})

btnBack.addEventListener('click', function(){
   hideInformations()
   suggestionsContainer.classList.remove('hide')
   
})


