import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';


// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { PanelInfoComponent } from './pages/panel-info/panel-info.component';
import { DownloadComponent } from './pages/download/download.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelAdminComponent } from './consola_admin/panel-admin/panel-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    PanelInfoComponent,
    DownloadComponent,
    AboutComponent,
    LoginComponent,
    PanelAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'main', component: MainComponent },
      { path: 'panel-info', component: PanelInfoComponent },
      { path: 'download', component: DownloadComponent },
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'panel-admin', component: PanelAdminComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
