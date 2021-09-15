import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit{

  usuario: Usuario = {};
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getusuario();
    console.log(this.usuario);
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }
   const actulizado= await this.usuarioService.actualizarUsuario(this.usuario);
    console.log(actulizado);

    if (actulizado) {
      //toas mensaje de actualizado
    } else {
      //toas mensaje de error
    }
  }
  logout() { }

}
