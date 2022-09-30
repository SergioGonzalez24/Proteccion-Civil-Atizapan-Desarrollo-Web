import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.css']
})
export class PanelInfoComponent implements OnInit {



  title = 'FE-webApp';

  public dato: string = "";

  public forecasts?: WeatherForecast[];

  headers = new HttpHeaders({
    		'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
    		'x-rapidapi-key': '5ae35c7978msh8ae5b33b67848eap1dd4d6jsncee7be56e0ce'
    	});

  constructor(private http: HttpClient) {
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

  getData() {
    this.http.get('https://random-facts2.p.rapidapi.com/getfact',
    {headers: this.headers}).subscribe((res) => {
    console.log(res);
    
    this.dato = JSON.stringify(res);
  });
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


/** 
  export class AppComponent {
    
    public forecasts?: WeatherForecast[];

    constructor(http: HttpClient) {
      http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));
    }
    constructor(http: HttpClient) {}
    title = 'FE-webApp';
  }

  interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
  }
**/