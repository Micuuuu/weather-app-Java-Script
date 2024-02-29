const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const icon= document.querySelector('.icon img');
const forecast = new Forecast();

//varianta cu clase

const UpdateUi = (data) =>{
  CityDet=data.CityDet;
  weather  = data.CityWeather;
  details.innerHTML = 
      `
      <h5>${CityDet.EnglishName}</h5>
              <div>${weather[0].WeatherText}</div>
              <div id="details-temperature">
                  <span>${weather[0].Temperature.Metric.Value}</span>
                  <span>&deg;C</span>
              </div>
      `;
  //update the night /dat &icon images 
  const IconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
  icon.setAttribute('src', IconSrc);
  let timeSrc=null;
      if(weather[0].IsDayTime)
      {
          timeSrc=`img/day.svg`;
      }
      else {
          timeSrc = `img/night.svg`;
      }
      time.setAttribute('src',timeSrc);
      
      if(card.classList.contains('none'))
      {
          card.classList.remove('none');
      }
}

cityForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update with city details.

forecast.getCityDetails(city).then(
  data =>UpdateUi(data)
).catch(err=>console.log(err));

//set Local Storage
  localStorage.setItem('city', city)
});

if(localStorage.getItem('city'))
{
forecast.getCityDetails(localStorage.getItem('city'))
.then(data=>UpdateUi(data))
.catch(err=>console.log(err));
}


