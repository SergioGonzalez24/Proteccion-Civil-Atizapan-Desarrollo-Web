import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  public ContactosData: any;

  directorioHeader = new HttpHeaders({
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS"
  });

  constructor(private http: HttpClient) {

    
  }

  ngOnInit(): void {
    this.getContactosData();
  }

  getContactosData() {
    this.http.get('https://jwtauth-webapi.azurewebsites.net/api/directorio/showall',
    { headers: this.directorioHeader }).subscribe(data => {
      this.setContactoData(data);
    });
  }

  setContactoData(data: any) {
    this.ContactosData = data;
    this.ContactosData.id = this.ContactosData[0].id;
    this.ContactosData.departamento = this.ContactosData[0].departamento;
    this.ContactosData.telefono = this.ContactosData[0].contacto;
  }



}



