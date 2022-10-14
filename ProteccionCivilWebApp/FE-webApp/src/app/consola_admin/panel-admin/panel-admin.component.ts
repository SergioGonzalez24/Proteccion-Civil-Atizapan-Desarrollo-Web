import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  personalInfo: any;

  public reportes?: ReportesActuales[];

  vinculoMapa = '';

  


  reportesHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET"
  });

  constructor(private http: HttpClient) {
    http.get<ReportesActuales[]>('https://jwtauth-webapi.azurewebsites.net/api/reporte/showall',
    { headers: this.reportesHeaders }).subscribe(result => {
      this.reportes = result;
      this.setPersonalInfo(result);

    });
   }

  ngOnInit(): void {
  }

  setPersonalInfo(dataReporte: any) {
    this.personalInfo = dataReporte;

  }

  print() {
    console.log('click');
    console.log(this.personalInfo.evento_id);
    this.personalInfo.forEach((element: any) => {
      console.log(element.evento_id);
    });
  }

}



interface ReportesActuales {
  id: number;
  estatus: string;
  
  evento_id: number;
  prioridad: string;
  
  verificacion: string;
}