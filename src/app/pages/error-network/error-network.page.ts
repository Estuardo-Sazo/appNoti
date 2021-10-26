import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-error-network',
  templateUrl: './error-network.page.html',
  styleUrls: ['./error-network.page.scss'],
})
export class ErrorNetworkPage implements OnInit {
cargar=false;
  constructor(private router: Router,
    private usuarioService: UsuarioService,
    ) { }

  ngOnInit() {
  }

  reconnect(){
    console.log('reconnet');
    this.cargar=true;
    this.router.navigateByUrl('/main/tabs/tab1');

  }
  logout() {
    this.usuarioService.logout();

   }
}
