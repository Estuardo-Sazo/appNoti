import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{ 
  usuario: Usuario = {};
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

}
