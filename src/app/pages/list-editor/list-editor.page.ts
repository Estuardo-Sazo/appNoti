import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
const URL = environment.url;

@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.page.html',
  styleUrls: ['./list-editor.page.scss'],
})
export class ListEditorPage implements OnInit {
  users:Usuario[]=[];
  url: string=URL;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.getListUsers('CHARGED').subscribe((resp)=>{
      this.users.push(...resp.users);
    });
    console.log(this.users);
  }

}
