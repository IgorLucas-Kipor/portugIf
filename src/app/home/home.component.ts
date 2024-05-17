import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
  }



  toggleSidenav() {
    this.sidenavService.toggle();
  }

}
