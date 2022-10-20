import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { timer } from 'rxjs';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  // Variables declaradas
  actualizacionEstatus: FormGroup;
  MapsData: any;
  ItemSelected: any;
  cords: any;
  servicio: any;
  ServicioData: any;
  status:any;

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

      this.ServicioData = {
        results: []
      };

      this.ItemSelected= {
        lat: null,
        lng:null
      };

   }
   // Fin Constructor

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => this.getReportes());;
    

  }

  getReportes() {
    this.http.get<ReportesActuales[]>('https://jwtauth-webapi.azurewebsites.net/api/reporte/showall',
    { headers: this.reportesHeaders }).subscribe(result => {
      this.reportes = result;
  });
}

setStatus(data: any) {
    this.status = data;
  }


  // Seleccion de reporte

  selectItem(item: any) {

    console.log(item);

    this.getItem(item.id);
    this.changeStatus(item);
    this.setStatus(item.estatus);
  }

  getItem(itemSlected: any) {
    this.http.get('https://jwtauth-webapi.azurewebsites.net/api/evento/' + itemSlected, 
    { headers: this.reportesHeaders }).subscribe(data => {
      this.setItem(data);
      console.log("data ", data);

    });
  }

  setItem(data: any) {
    this.ItemSelected = data;
    this.ItemSelected.identificador = this.ItemSelected.id
    this.cords = this.ItemSelected.order_location;
    this.servicio = this.ItemSelected.directorio_id;
    this.getServicios(this.servicio);

    this.getCordenadasInfo(new String(this.cords).toString());
  }

  // Funciones para obtener la informacion y direccion de las cordenadas
  getCordenadasInfo(cords: string) {
    console.log("cord ",cords);
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + cords , 
    {params: this.mapsParams}).subscribe(data => {
      this.setDireccion(data);
      this.addMarker(data);
    }, error => { this.setDireccion('error'); });
  }

  setDireccion(data: any) {
    if(data != 'error') {
      this.MapsData = data;
      this.MapsData.direccion = this.MapsData.results[0].formatted_address;
    } else {
      alert("No se pudo obtener la direccion de las cordenadas favor de llamar al ciuadano");
      this.MapsData.direccion = 'No se pudo obtener la direccion';
    }
  }

  // Funcion para obtener Info del Servicio
  getServicios(id: any) {
    this.http.get('https://jwtauth-webapi.azurewebsites.net/api/directorio/' + id, 
    { headers: this.reportesHeaders }).subscribe(data => {
      // console.log(data)
      this.setServicios(data);
    });
  }
  
  setServicios(data: any) {
    this.ServicioData = data;
    this.ServicioData.nombre = this.ServicioData.departamento;
    this.ServicioData.telefono = this.ServicioData.contacto;
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

  Finalizar() {
    this.actualizacionEstatus.value.estatus = 'Finalizada';
    this.dataCambiada = this.actualizacionEstatus.value;
    this.cambio();
    // console.log(this.actualizacionEstatus.value);
  }
  
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
    // console.log(this.actualizacionEstatus.value);

  }

  cambio() {
    let estatus = this.actualizacionEstatus.value.estatus;
    this.dataCambiada.estatus = estatus;
    let id = this.dataCambiada.id;

    this.http.put('https://jwtauth-webapi.azurewebsites.net/api/reporte/' + id, 
    this.dataCambiada, { headers: this.reportesHeaders })
    .subscribe(data => { console.log(data); }
    );
      // AutoRefrescar la pagina
    setTimeout(() => {
      // window.location.reload();
      this.getReportes();
    }, 1000);    
  }

  // Automatizar el Refresh

  
}



interface ReportesActuales {
  id: number;
  estatus: string;
  
  evento_id: number;
  prioridad: string;
  
  verificacion: string;
}

