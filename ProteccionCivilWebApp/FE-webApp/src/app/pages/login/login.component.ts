import { Component, OnInit } from '@angular/core';
//IMPORTAR FORMBUILDER
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authHeader = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI0ZWE4NDMyMy1mMmIzLTQ3YzktOTI5NS1jYjhlMjNmZjMyMjMiLCJpYXQiOiIxMC82LzIwMjIgMTI6NDc6NTYgQU0iLCJJZCI6IjIiLCJEaXNwbGF5TmFtZSI6IkZlcm5hbmRvIE9ydGl6IFNhbGRhw7FhIiwiRW1haWwiOiJmZXJuYW5kb29ydGlzc2FsZGFuYUBpY2xvdWQuY29tIiwiZXhwIjoxNjY5MzM3Mjc2LCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.tuuDNLhqVMZM_E0Q4N7fNiME8_fuReUTnmpTpOwr_IU'
  });



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  // //CREAR FORMULARIO
  // loginForm = new FormGroup({
  //   user: new FormControl('',[Validators.required,Validators.email]),
  //   password: new FormControl('',[Validators.required,Validators.minLength(8)])
  // });

  // //CREAR METODO PARA ENVIAR FORMULARIO
  // onSubmit(){
  //   console.log(this.loginForm.value);
  //   this.http.post('https://apimunicipioatizapan.azurewebsites.net/api/admin/login', 
  //   this.loginForm.value, {headers: this.authHeader}).subscribe((res:any) => {
  //     console.log(res);
  //   });
  // }

  login() {
    this.http.post('https://apimunicipioatizapan.azurewebsites.net/api/admin/login', 
    {headers: this.authHeader}).subscribe((res:any) => {
      console.log(res);
    });
  }




}
