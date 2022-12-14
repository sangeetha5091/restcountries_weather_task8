const api = "https://restcountries.com/v3.1/all";

async function getDataFromAPI() {
  try {
    const res = await fetch(`${api}`);
    const data = await res.json();
    displayData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getDataFromAPI();

function displayData(data) {
  // console.log(" displayData ", data);
  data.forEach((items, index) => {
    const card_div = document.createElement("div");
    card_div.setAttribute(
      "class",
      "card d-flex justify-content-center align-content-center mx-auto my-3 p-0 mt-5 shadow  bg-body rounded"
    );
    card_div.style.width = "18rem";

    card_div.innerHTML = ` 
 <div class="card-header text-center bg-dark bg-gradient text-light fs-4">
     ${items.name.common}
  </div>
       <img src="${items.flags.png}" class="card-img-top p-3" alt=${items.capital} width="300px" />
       <div class="card-body">
         <div class="text-center">
           <p class="card-text">Capital: ${items.capital}</p>
           <p class="card-text">Region: ${items.continents}</p>
           <p class="card-text">Country Code: ${items.cca3}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getweatherData(${items.latlng[0]},${items.latlng[1]})">  Click For Weather  </button>
         </div>
       </div>  
`;
    document.querySelector(".row").append(card_div);
  });
}

// WeatherData
async function getweatherData(latlng0, latlng1) {
  console.log("getweatherData", latlng0, latlng1);
  document.querySelector(".modal-body").innerHTML = "";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latlng0}&lon=${latlng1}&appid&units=metric`
  );
  const data = await res.json();
  console.log(data);
  console.log(data.main.temp);

  const weather_div = document.createElement("div");

  weather_div.innerHTML = ` 
  <p>Latitude: ${latlng0}</p>
  <p>Longitude: ${latlng1}</p>
  <p>Current Temperature: ${data.main.temp}</p>
  <p>Name: ${data.name}</p>`;
  document.querySelector(".modal-body").append(weather_div);
}

