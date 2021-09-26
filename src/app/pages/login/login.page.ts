import { Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

 


loginUser={
  email:'sazo@gmail.com',
  password:'1234'
}

registerUser:Usuario={
  email:'test',
  password:'1234',
  nombre:"Test",
};





  constructor( private usuarioService:UsuarioService,
              private navCtrl:NavController,
              private  uiService:UiServiceService
    ) { }

  ngOnInit() {
    

  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }
  async login(fLogin:NgForm){
   const valido= await this.usuarioService.login(this.loginUser.email,this.loginUser.password);
     console.log(valido);
     
    if(valido){
      //Navegar al tab 
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      //mostrar alerta de usuario incorrecto
      this.uiService.alertaInfo("Usario y contraseña son incorrectos.")
      
    }

  }

  async registr(fRegistro:NgForm){
    if(fRegistro.invalid){return;}

    const valido= await this.usuarioService.registro(this.registerUser);

    if(valido){
      //Navegar al tab 
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      //mostrar alerta de usuario incorrecto
      this.uiService.alertaInfo("Error en los datos.")
      
    }
  }



  irRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);


  }

  irLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);


  }
}
