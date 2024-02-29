// Varianta cu classes

class Forecast{
    constructor(){
        
    this.key = '8GiAuf02GkMoWze9heb70ESGSRXZNXQG';
    this.weatherUPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityUPI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async getCityDetails(city){
        const CityDet = await this.getCity(city);
        const CityWeather = await this.getWeather(CityDet.Key);
   
        return { CityDet, CityWeather };
     };
    
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherUPI + query);
        const data = response.json();

    return data;
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch( this.cityUPI + query);
        const data = await response.json();
        return data[0];
    }
}




