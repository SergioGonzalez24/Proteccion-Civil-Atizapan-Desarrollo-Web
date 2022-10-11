import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'panel-info', redirectTo: 'panel-info' },
  { path: 'download', redirectTo: 'download' },
  { path: 'about', redirectTo: 'about' },
  { path: 'login', redirectTo: 'login' }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
