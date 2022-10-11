import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DownloadComponent } from './pages/download/download.component';
import { MainComponent } from './pages/main/main.component';
import { PanelInfoComponent } from './pages/panel-info/panel-info.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportesAdminComponent } from './pages/reportes-admin/reportes-admin.component';




const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'panel-info', component: PanelInfoComponent, pathMatch: 'full' },
  { path: 'download', component: DownloadComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: ' login', component: LoginComponent, pathMatch: 'full' },
  {path: 'admin-panel', component: ReportesAdminComponent, pathMatch: 'full'}

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
