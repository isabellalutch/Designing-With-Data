
 // THE DAILY EDIT
 // Weather-based outfit recommendation website


 // cities

 let cities = {
     oakville: {
         name: "Oakville",
         latitude: 43.45,
         longitude: -79.68
     },

     toronto: {
         name: "Toronto",
         latitude: 43.65,
         longitude: -79.38
     },

     newyork: {
         name: "New York",
         latitude: 40.71,
         longitude: -74.01
     },

     london: {
         name: "London",
         latitude: 51.51,
         longitude: -0.13
     },

     paris: {
         name: "Paris",
         latitude: 48.86,
         longitude: 2.35
     },

     miami: {
         name: "Miami",
         latitude: 25.76,
         longitude: -80.19
     }
 };


 let currentTemperature = 0;
 let currentWeatherCode = 0;
 let currentRain = 0;
 let weatherLoaded = false;


 // data from API

 async function getWeather() {

     let selectedCity =
         document.getElementById("city").value;

     let city = cities[selectedCity];

     let apiURL =
         "https://api.open-meteo.com/v1/forecast" +
         "?latitude=" + city.latitude +
         "&longitude=" + city.longitude +
         "&current=temperature_2m,weather_code,precipitation" +
         "&timezone=auto";

     document.getElementById("temperature").textContent =
         "Loading weather...";

     document.getElementById("outfitDescription").textContent =
         "Finding your outfit...";

     weatherLoaded = false;

     try {

         let response = await fetch(apiURL);

         if (!response.ok) {
             throw new Error("Weather request failed");
         }

         let data = await response.json();

         console.log(data);

         // json data

         currentTemperature =
             data.current.temperature_2m;

         currentWeatherCode =
             data.current.weather_code;

         currentRain =
             data.current.precipitation;

         weatherLoaded = true;

         // weather info

         document.getElementById("cityName").textContent =
             city.name;

         document.getElementById("temperature").textContent =
             currentTemperature + "°C";

         displayWeather();

         // outfit

         recommendOutfit();

     } catch (error) {

         console.error("Error:", error);

         document.getElementById("temperature").textContent =
             "Weather unavailable";

         document.getElementById("weatherDescription").textContent =
             "Please try again.";

         document.getElementById("outfitTitle").textContent =
             "Unable to load your outfit";

         document.getElementById("outfitDescription").textContent =
             "We couldn't retrieve the weather right now.";

         document.getElementById("outfitItems").textContent = "";

         document.getElementById("outfitPhoto").removeAttribute("src");

     }
 }


 // description of weather 

 function displayWeather() {

     let description = "";

     if (currentWeatherCode >= 51 &&
         currentWeatherCode <= 67) {

         description = "Rainy weather";

     } else if (currentWeatherCode >= 80 &&
                currentWeatherCode <= 82) {

         description = "Rain showers";

     } else if (currentWeatherCode >= 95) {

         description = "Thunderstorms";

     } else if (currentWeatherCode >= 71 &&
                currentWeatherCode <= 86) {

         description = "Snowy weather";

     } else if (currentWeatherCode === 0) {

         description = "Clear skies";

     } else if (currentWeatherCode <= 3) {

         description = "Partly cloudy";

     } else {

         description = "Cloudy or misty weather";
     }

     document.getElementById("weatherDescription").textContent =
         description;
 }


 // outfit based on weather

 function recommendOutfit() {

     if (weatherLoaded === false) {
         return;
     }

     let selectedStyle =
         document.getElementById("style").value;

     let outfitTitle = "";
     let outfitDescription = "";
     let outfitItems = "";
     let outfitImage = "";
     let weatherTheme = "";

     // rain

     let isRainy = false;

     if (currentWeatherCode >= 51 &&
         currentWeatherCode <= 67) {

         isRainy = true;

     } else if (currentWeatherCode >= 80 &&
                currentWeatherCode <= 82) {

         isRainy = true;

     } else if (currentWeatherCode >= 95) {

         isRainy = true;

     } else if (currentRain > 0) {

         isRainy = true;
     }


     // rainy

     if (isRainy === true) {

         weatherTheme = "rainy";

         if (selectedStyle === "casual") {

             outfitTitle = "The Rainy Day Edit";

             outfitDescription =
                 "A little rain shouldn't ruin your outfit. " +
                 "Stay comfortable with practical layers " +
                 "and waterproof essentials.";

             outfitItems =
                 "Light coat, comfy trousers, " +
                 "and an umbrella.";

             outfitImage = "rainy-casual.jpg";

         } else {

             outfitTitle = "Rainy Day Chic";

             outfitDescription =
                 "Keep your look polished while staying " +
                 "prepared for unpredictable weather.";

             outfitItems =
                 "Tailored trench coat, trousers, " +
                 "ankle boots and umbrella.";

             outfitImage = "rainy-dressy.jpg";
         }

     }


     // cold

     else if (currentTemperature < 10) {

         weatherTheme = "cold";

         if (selectedStyle === "casual") {

             outfitTitle = "The Cozy Edit";

             outfitDescription =
                 "It's a chilly day. Think warm layers, " +
                 "soft textures and effortless comfort.";

             outfitItems =
                 "Oversized coat, cozy sweater, " +
                 "and jeans.";

             outfitImage = "cold-casual.jpg";

         } else {

             outfitTitle = "Cold Weather Chic";

             outfitDescription =
                 "Stay warm without compromising " +
                 "on a polished look.";

             outfitItems =
                 "Warm trench coat, elegant bag, " +
                 "and tall boots.";

             outfitImage = "cold-dressy.jpg";
         }

     }


     // mild

     else if (currentTemperature < 23) {

         weatherTheme = "mild";

         if (selectedStyle === "casual") {

             outfitTitle = "The Everyday Edit";

             outfitDescription =
                 "The perfect weather for an easy, " +
                 "relaxed outfit with light layers.";

             outfitItems =
                 "Light jacket, leggings " +
                 "hat and sneakers.";

             outfitImage = "mild-casual.jpg";

         } else {

             outfitTitle = "Effortlessly Put Together";

             outfitDescription =
                 "A simple, elevated outfit for " +
                 "a comfortable day out.";

             outfitItems =
                 "Fitted turtle-neck sweater, " +
                 "skirt with tights underneath, and tall boots.";

             outfitImage = "mild-dressy.jpg";
         }

     }


     // hot

     else {

         weatherTheme = "hot";

         if (selectedStyle === "casual") {

             outfitTitle = "The Summer Edit";

             outfitDescription =
                 "Keep things light, breathable and " +
                 "comfortable in the warm weather.";

             outfitItems =
                 "Jean shorts, casual tee, " +
                 "and sandals.";

             outfitImage = "hot-casual.jpg";

         } else {

             outfitTitle = "Warm Weather Elegance";

             outfitDescription =
                 "An airy, polished look that's " +
                 "perfect for a sunny day.";

             outfitItems =
                 "Linen dress, sandals, sunglasses " +
                 "and a small handbag.";

             outfitImage = "hot-dressy.jpg";
         }

     }


     // update of website

     document.getElementById("outfitTitle").textContent =
         outfitTitle;

     document.getElementById("outfitDescription").textContent =
         outfitDescription;

     document.getElementById("outfitItems").textContent =
         outfitItems;

     document.getElementById("outfitPhoto").src =
         outfitImage;

     // background colours

     document.body.className = weatherTheme;

 }


 document.getElementById("outfitButton").addEventListener(
     "click",
     getWeather
 );

 document.getElementById("refreshButton").addEventListener(
     "click",
     getWeather
 );

 document.getElementById("style").addEventListener(
     "change",
     recommendOutfit
 );


 getWeather();
