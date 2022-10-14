import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  alerta: FormGroup;
  actualizacionEstatus: FormGroup;


  personalInfo: any;

  public elementos: Array<any> = [
    {
      id: null,
      estatus: null,
      evento_id: null,
      prioridad_id: null,
      verificacion: null,
    }
  ];

  public reportes?: ReportesActuales[];
  public evento?: any;
  MapsData: any;

  reportesHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET"
  });

  mapsParams = new HttpParams()
    .set('latlng', '19.563698,-99.296310')
    .set('key', 'AIzaSyCZMk0vPiAPI9qWXg-KwxNVp9ufc_85J2U');

  constructor(
    private http: HttpClient,
    private fb: FormBuilder) {

    http.get<ReportesActuales[]>('https://jwtauth-webapi.azurewebsites.net/api/reporte/showall',
    { headers: this.reportesHeaders }).subscribe(result => {
      this.reportes = result;
      this.setPersonalInfo(result);
    });

    this.alerta = this.fb.group({
      textoAlerta: ['']
    });

    this.actualizacionEstatus = this.fb.group({
      idInput: [''],
      estatusInput: ['']
    });

   }

  ngOnInit(): void {
    this.MapsData = {
      results : []
    };
    this.getCordenadasData();
    console.log(this.MapsData);
  }

  setPersonalInfo(dataReporte: any) {
    this.personalInfo = dataReporte;
    this.print(this.personalInfo);
  }

  print(elemento: Array<any>) {
    this.elementos = elemento;
    this.personalInfo.evento_id = 1;

    console.log(this.personalInfo.evento_id);
    this.elementos.push(elemento);
    console.log(this.elementos);
    console.log('click');
    console.log(this.personalInfo.evento_id);
    this.personalInfo.forEach((element: any) => {
      console.log(element.evento_id );
    });
  }



  // Funciones para llamar a la API de alertas
  getAlerta() {
    alert("Notificación enviada");
    let data = this.alerta.value;
    console.log(data);
  }

  // setAlertaData(data: any) {}

  // Funciones para llamar a la API de actualización de estatus
  getActualizacionEstatus() {
    let data = this.actualizacionEstatus.value;
    console.log(data);
  }

  // setActualizacionEstatusData(data: any) {}


  getEventoData() {
    this.http.get('https://jwtauth-webapi.azurewebsites.net/api/evento/' + this.personalInfo.evento_id, 
    { headers: this.reportesHeaders }).subscribe(data => {
      this.evento = data;
      console.log(data);
    });

  }

  getCordenadasData() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: this.mapsParams}).subscribe(data => {
      console.log(data);
      this.setCordenadasData(data);
    });
  }

  setCordenadasData(data: any) {
    this.MapsData = data;
    this.MapsData.direccion = this.MapsData.results[0].formatted_address;
    
  }






}



interface ReportesActuales {
  id: number;
  estatus: string;
  
  evento_id: number;
  prioridad: string;
  
  verificacion: string;
}