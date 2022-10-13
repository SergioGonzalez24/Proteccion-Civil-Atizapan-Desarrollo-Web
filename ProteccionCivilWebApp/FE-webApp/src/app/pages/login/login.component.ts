import { Component, OnInit } from '@angular/core';
//IMPORTAR FORMBUILDER

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  loginHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "POST"
  });


  form: FormGroup;
  LoginData: any;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder ) {

      this.form = this.fb.group({
        email: [''],
        passsword: ['']
    });
  }

  ngOnInit(): void {
  }

  getLogin() {
    let data = this.form.value;
    console.log(data);
    this.setLoginData(data);

  }

  setLoginData(data: any) {
    this.http.post('https://jwtauth-webapi.azurewebsites.net/api/admin/login', data,
    { headers: this.loginHeaders }).subscribe(data => {
      this.LoginData = data;
      console.log(data);

      if (this.LoginData.estatus == "Usuario no existe" || this.LoginData.estatus == "Contraseña incorrecta") {
        console.log("Login incorrecto");
      }

      else if (this.LoginData.estatus == 'Credenciales exitosas') {
        alert("Login Successful");
        console.log("Login correcto");
        window.location.href='/panel-admin';


      }

      else {
        
        console.log("Error");
      }

    });
        
  }


}