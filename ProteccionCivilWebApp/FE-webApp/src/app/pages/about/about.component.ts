import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

 

  directoriosData: any;

  heder = new HttpHeaders({
    "Access-Control-Allow-Origin":  "https://ambitious-field-09e96df0f.2.azurestaticapps.net",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS"


  });

  constructor(private http: HttpClient) {
    http.get('https://jwtauth-webapi.azurewebsites.net/api/directorio/showall',
    {headers: this.heder }).subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
  }




}

