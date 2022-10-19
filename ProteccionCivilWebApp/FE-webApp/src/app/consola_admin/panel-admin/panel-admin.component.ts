import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { delay } from 'rxjs';





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
  mapsParams = new HttpParams().set('key', 'AIzaSyCZMk0vPiAPI9qWXg-KwxNVp9ufc_85J2U');


  // Constructor
  constructor(private http: HttpClient, private fb: FormBuilder) {

    // Mostar los reportes
      http.get<ReportesActuales[]>('https://jwtauth-webapi.azurewebsites.net/api/reporte/showall',
      { headers: this.reportesHeaders }).subscribe(result => {
        this.reportes = result;
        
      });

      this.alerta = this.fb.group({
        textoAlerta: ['']
      });
      
      this.actualizacionEstatus = this.fb.group({
        id: [''],
        estatus: [''],
        evento_id: [''],
        prioridad: [''],
        verificacion: ['']
      });

      this.MapsData = {
        results : []
      };
   }
   // Fin Constructor

  ngOnInit(): void {

  }



  // Seleccion de reporte

  selectItem(item: any) {
    this.getItem(item.id);
    this.changeStatus(item);
  }

  getItem(itemSlected: any) {
    this.http.get('https://jwtauth-webapi.azurewebsites.net/api/evento/' + itemSlected, 
    { headers: this.reportesHeaders }).subscribe(data => {
      this.setItem(data);
    
    });
  }

  setItem(data: any) {
    this.ItemSelected = data;
    this.cords = this.ItemSelected.order_location;
    this.getCordenadasInfo(new String(this.cords).toString());
  }

  // Funcion para obtener la informacion de las cordenadas
  getCordenadasInfo(cords: string) {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + cords , 
    {params: this.mapsParams}).subscribe(data => {
      this.setDireccion(data);
      this.addMarker(data);
    }, error => { this.setDireccion('error'); });
  }
  
// Funcion para obtener la direccion de las cordenadas
  setDireccion(data: any) {
    if(data != 'error') {
      this.MapsData = data;
      this.MapsData.direccion = this.MapsData.results[0].formatted_address;
    } else {
      alert("No se pudo obtener la direccion de las cordenadas favor de llamar al ciuadano");
      this.MapsData.direccion = 'No se pudo obtener la direccion';
    }
  }

  // GOOGLE MAPS
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  

  center: google.maps.LatLngLiteral = {lat: 19.59387, lng: -99.25025};
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  addMarker(cords: any) {
    this.markerPositions.push(cords.results[0].geometry.location);
  }

  openInfoWindow(marker: MapMarker) {
    if(this.infoWindow != undefined)
    this.infoWindow.open(marker);
  }

  // Funcion para cambiar el estado de un reporte
  public dataCambiada: any;

  changeStatus(reporte: any) {
    this.actualizacionEstatus = this.fb.group({
      id: reporte.id,
      evento_id: reporte.evento_id,
      prioridad: reporte.prioridad,
      estatus: reporte.estatus,
      verificacion: reporte.verificacion
    });
    this.dataCambiada = this.actualizacionEstatus.value;
    console.log(this.actualizacionEstatus.value);

  }

  cambio() {
    let estatus = this.actualizacionEstatus.value.estatus;
    this.dataCambiada.estatus = estatus;
    let id = this.dataCambiada.id;

    this.http.put('https://jwtauth-webapi.azurewebsites.net/api/reporte/' + id, 
    this.dataCambiada, { headers: this.reportesHeaders })
    .subscribe(data => { console.log(data); }
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }

  // AutoRefrescar la pagina


    

}



interface ReportesActuales {
  id: number;
  estatus: string;
  
  evento_id: number;
  prioridad: string;
  
  verificacion: string;
}

