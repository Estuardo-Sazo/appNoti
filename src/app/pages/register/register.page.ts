import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register:Usuario={
    email:'',
    password:'',
    names:"",
    surnames:"",
    cui:"",
    phone:"",
  
  };
  focused: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {}



  ngOnInit() {
  }
  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async registr(fRegistro:NgForm){
    if(fRegistro.invalid){
      //Completar los campos
      this.uiService.alertaInfo("Campos incompletos.") 
      return;}

    const valido= await this.usuarioService.registro(this.register);

    if(valido){
      //Navegar al tab 
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      //mostrar alerta de usuario incorrecto
      this.uiService.alertaInfo("Error en los datos.")
      
    }
  }



}
