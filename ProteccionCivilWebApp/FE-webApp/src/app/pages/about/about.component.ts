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
    "Access-Control-Allow-Origin":  "https://jwtauth-webapi.azurewebsites.net"
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

