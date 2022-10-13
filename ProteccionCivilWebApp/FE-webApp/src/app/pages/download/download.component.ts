import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/components/navbar/navbar.service';
 
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }

}
