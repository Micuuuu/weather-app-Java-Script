const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const icon= document.querySelector('.icon img');

  //varianta simpla

  const UpdateUi = (data) =>{
    CityDet=data.CityDet;
    weather  = data.CityWeather;

    // sau putem salva datele in aceleaasi variabile ca mai sus prin DESTRUCTURING
    /*
    const {CityDet, weather} = data;
    */
    //update the details

    details.innerHTML = 
        `
        <h5>${CityDet.EnglishName}</h5>
                <div>${weather[0].WeatherText}</div>
                <div id="details-temperature">
                    <span>${weather[0].Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
        `;
    //update the night /dat &cion images 
    const IconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
    icon.setAttribute('src', IconSrc);

    //Lesson 109 Ternary Operator   (poate inlocui partea cu if else daca verificam un bool)
    /*
    let timeSrc = weather.IsDayTime ? `img/day.svg` : `img/night.svg`
    */
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
  const getCityDetails = async (city)=>{
     const CityDet = await getCity(city);
     const CityWeather = await getWeather(CityDet.Key);

     /*
     return {
         CityDet: CityDet,
         CityWeather: CityWeather

     };
     */
     
     console.log(CityDet, CityWeather)
     //or the shorthand
     return { CityDet, CityWeather };
  };




cityForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const city = cityForm.city.value.trim();
        cityForm.reset();

        //update with city details.

    getCityDetails(city).then(
        data =>UpdateUi(data)
    ).catch(err=>console.log(err));

    //set Local Storage
        localStorage.setItem('city', city);
  });

  if(localStorage.getItem('city'))
  {
      getCityDetails(localStorage.getItem('city'))
      .then(data=>UpdateUi(data))
      .catch(err=>console.log(err));
  }

