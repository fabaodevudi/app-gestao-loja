import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit(): void {
    const perfil = localStorage.getItem('perfil') != null ?  localStorage.getItem('perfil') : null;
    
    if(perfil == 'ROLE_USUARIO'){
      this.routes.navigate(['/app-home']);    
    } else if(perfil == 'ROLE_ADMIN'){
      this.routes.navigate(['/app-admin']);    
    }
  }

}
