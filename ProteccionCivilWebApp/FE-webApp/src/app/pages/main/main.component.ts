import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/components/navbar/navbar.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(public nav: NavbarService) {}
  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }
}