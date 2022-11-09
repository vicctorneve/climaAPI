// Variaveis e seleção de elementos
const apiKey = "86a41a83aad096c8374353b242de9087";
const apiCountryURL = "https://countryflagsapi.com/png/";
let j = 0;

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const weatherContainer = document.querySelector("#weather-data");
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

const suggestionsList = ["Nova york", "Tokyo", "Las vegas", "Florida", "Londres", "Miami"];

for (let i = 0; i < suggestionsList.length; i++) {
   suggestionsBtns[i].innerText = suggestionsList[i]  
}

// Funções

const addSuggestions = () =>{
   suggestionsList[j] = cityInput.value
   console.log(suggestionsList)
   if(j >= 5){
      j=0
   }else{
      j++
   }
   backupLocalStorage()
}

const backupLocalStorage = () =>{
   localStorage.setItem("item1", JSON.stringify(suggestionsList));
}

const restoreBackup = () =>{
   if(localStorage.length != 0){
      let item = JSON.parse(localStorage.getItem("item1"))
      for (let i = 0; i < item.length; i++) {
         suggestionsBtns[i].innerText = item[i]
      }
   }
   
}
restoreBackup()

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
      return;
   }
   addSuggestions()
   removeClass();
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

const removeClass = () => weatherContainer.classList.remove('hide');

const cleanInput = () => cityInput.value = '';

const toggleLoader = () => loader.classList.toggle("hide");

// Tratamento de erros
const showErrorMenssage = () => containerError.classList.remove('hide');

const hideInformations = () =>{
   containerError.classList.add("hide");
   suggestionsContainer.classList.add('hide');
   weatherContainer.classList.add("hide");
}

// Eventos

searchBtn.addEventListener('click', (e) =>{
   e.preventDefault();
   if(cityInput.value !== ""){
      const city = cityInput.value;
      showWeatherData(city);
      
      
   }
})

cityInput.addEventListener('keyup', (e) =>{
   if(e.code === "Enter"){
      if(e.target.value !== ""){
         const city = e.target.value;
         showWeatherData(city);
         
         
      }
   }
})

suggestionsBtns.forEach((btn) =>{
   btn.addEventListener("click", function(){
      const city = btn.innerHTML;
      showWeatherData(city);

      
   })
})

const sucess =(pos) =>{
   const crd = pos.coords; 
}

function error(err){
   console.warn('Error(' + err.code + ') metros.')
}
navigator.geolocation.getCurrentPosition(sucess, error, {
   enableHighAccuracy: true,
   timeout: 5000
});

