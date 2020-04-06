import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';
import { AuthGuardService } from 'src/app/guards/auth.guard.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  constructor(private authGuardService : AuthGuardService, private routes: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authGuardService.isLoggedIn;

    
  }

  logout() {
    this.authGuardService.logout();
  }

  home() {
    this.authGuardService.home();  
  }

}
