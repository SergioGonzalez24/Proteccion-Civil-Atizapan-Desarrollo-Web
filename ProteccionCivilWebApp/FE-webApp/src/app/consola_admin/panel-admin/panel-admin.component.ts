import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  public reportes?: ReportesActuales[];

  reportesHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET"
  });

  constructor(private http: HttpClient) {
    http.get<ReportesActuales[]>('https://jwtauth-webapi.azurewebsites.net/api/reporte/showall',
    { headers: this.reportesHeaders }).subscribe(result => {
      this.reportes = result;
      console.log(result);
    });
   }

  ngOnInit(): void {
  }

}

interface ReportesActuales {
  id: number;
  estatus: string;
  
  evento_id: number;
  prioridad: string;
  
  verificacion: string;

}