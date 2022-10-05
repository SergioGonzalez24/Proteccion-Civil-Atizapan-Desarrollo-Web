import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.css']
})

export class PanelInfoComponent implements OnInit {


  // Configuracion para el API de Terremotos
  terremotoHeaders = new HttpHeaders({
    'x-rapidapi-host': 'everyearthquake.p.rapidapi.com',
    'x-rapidapi-key': '5ae35c7978msh8ae5b33b67848eap1dd4d6jsncee7be56e0ce'
  });

  // Parametros de configuracion para el API de Terremotos
  configTerremoto = new HttpParams()
  .set('start', '1')
  .set('count','1')
  .set('type', 'earthquake')
  .set('latitude', '19.4319')
  .set('longitude', '-99.132896')
  .set('radius', '1000')
  .set('units', 'kilometers')
  .set('magnitude', '3')
  .set('intensity', '1');

  WeatherData:any;
  TerremotoData:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Obtener datos del clima
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);

    // Obtener datos de terremotos
    this.TerremotoData = {
      data: []
    }
    this.getTerremotoData();
    console.log(this.TerremotoData);
    
  }

  // Inicio de API de Clima

  getWeatherData(){
    this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=19.4319&lon=-99.132896&appid=68b800823cf8c5d32ecea64627e8c994&units=metric').subscribe((data) => {
      this.setWeatherData(data);
    });
  }
  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min ).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like).toFixed(0);
  }
  // Fin de API de Clima

  // Inicio de API de Terremotos

  getTerremotoData() {
    this.http.get('https://everyearthquake.p.rapidapi.com/earthquakes', 
    {headers: this.terremotoHeaders, params: this.configTerremoto}).subscribe((data) => {
      this.setTerremotoData(data);
    });
  }
  setTerremotoData(data: any){
    this.TerremotoData = data;
    this.TerremotoData.pais = this.TerremotoData.data[0].country;
    this.TerremotoData.ciudad = this.TerremotoData.data[0].subnational;
    this.TerremotoData.fecha = this.TerremotoData.data[0].date.split('T')[0];
    this.TerremotoData.hora = this.TerremotoData.data[0].date.split('T')[1];
    this.TerremotoData.magnitud = this.TerremotoData.data[0].magnitude;
  }
  // Fin de API de Terremotos



}




/*
COMENTADO
  title = 'FE-webApp';

  public dato: string = "";
  public climas?: ClimaActual[];

  WeatherData: any;

  public forecasts?: WeatherForecast[];
  //public climasActuales?: ClimaActual[];

  datosHeaders = new HttpHeaders({
    		'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
    		'x-rapidapi-key': '5ae35c7978msh8ae5b33b67848eap1dd4d6jsncee7be56e0ce'
    	});

  climaHeaders = new HttpHeaders({
    'x-rapidapi-host': 'forecast9.p.rapidapi.com',
    'x-rapidapi-key': '5ae35c7978msh8ae5b33b67848eap1dd4d6jsncee7be56e0ce'
  });
  
  // Configuracion para el API de Yahoo Weather
  climaYahooHeaders = new HttpHeaders({
    'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
    'x-rapidapi-key': '5ae35c7978msh8ae5b33b67848eap1dd4d6jsncee7be56e0ce'
  });

  config = new HttpParams().set('location', 'Mexico City, Mexico').set('format', 'json').set('u', 'c');
  // Fin de configuracion para el API de Yahoo Weather
  
  constructor(private http: HttpClient) {
    // API CALL TO .NET
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

  // API CALL TO RAPIDAPI FORECAST
    // http.get('https://forecast9.p.rapidapi.com/rapidapi/forecast/Mexico/summary/',
    //   {headers: this.climaHeaders}).subscribe((res) => {
    //   console.log(res);
    // });

    // API CALL TO Yahoo Weather
    http.get<ClimaActual[]>('https://yahoo-weather5.p.rapidapi.com/weather',
      {params: this.config, headers: this.climaYahooHeaders}).subscribe((res) => {
      console.log(res);
      this.climas = res;
    });
  }

  
  // API CALL TO RAPIDAPI FACTS
  getData() {
    this.http.get('https://random-facts2.p.rapidapi.com/getfact',
    {headers: this.datosHeaders}).subscribe((res) => {
    console.log(res);
    
    this.dato = JSON.stringify(res);
  });
  }
*/
  



/*
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface ClimaActual {
  // avg: number;
  temperature: number;
}
*/