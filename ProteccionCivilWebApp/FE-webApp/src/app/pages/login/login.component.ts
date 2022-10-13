import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/components/navbar/navbar.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//IMPORTAR FORMBUILDER Y FORMGROUP
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
    private fb: FormBuilder, 
    public nav: NavbarService) {

      this.form = this.fb.group({
        email: [''],
        passsword: ['']
    });
  }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
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
        console.log(this.hideNavbar());


      }

      else {
        
        console.log("Error");
      }

    });
        
  }

  hideNavbar() {
    return "off";
  }


}