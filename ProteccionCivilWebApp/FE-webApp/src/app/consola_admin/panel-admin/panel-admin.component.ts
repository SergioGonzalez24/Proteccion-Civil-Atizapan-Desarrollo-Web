import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  // Variables declaradas
  alerta: FormGroup;
  actualizacionEstatus: FormGroup;
  MapsData: any;
  ItemSelected: any;
  cords: any;

  public reportes?: ReportesActuales[];

  // Configuracion para la API de REPORTES y ALERTAS
  reportesHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  });

  // Parametros de configuracion para el API de Maps
  mapsParams = new HttpParams()
    // .set('latlng', '19.563698,-99.296310')
    .set('key', 'AIzaSyCZMk0vPiAPI9qWXg-KwxNVp9ufc_85J2U');

  constructor(private http: HttpClient, private fb: FormBuilder) {

      http.get<ReportesActuales[]>('https://jwtauth-webapi.azurewebsites.net/api/reporte/showall',
      { headers: this.reportesHeaders }).subscribe(result => {
        this.reportes = result;
        
      });

      this.alerta = this.fb.group({
        textoAlerta: ['']
      });
      this.actualizacionEstatus = this.fb.group({
        idInput: [''],
        estatusInput: ['']
      });

      this.MapsData = {
        results : []
      };
   }

  ngOnInit(): void {

  }

  selectItem(item: any) {
    this.getEvento(item.evento_id);
  }

  getEvento(itemSlected: any) {
    this.http.get('https://jwtauth-webapi.azurewebsites.net/api/evento/' + itemSlected, 
    { headers: this.reportesHeaders }).subscribe(data => {
      this.setEvento(data);
    
    });
  }


  setEvento(data: any) {
    this.ItemSelected = data;
    this.cords = this.ItemSelected.order_location;
    this.getCordenadasData(new String(this.cords).toString());
  }

  getCordenadasData(cords: string) {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + cords , {params: this.mapsParams}).subscribe(data => {
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

