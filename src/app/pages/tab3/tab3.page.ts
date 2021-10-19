import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit{

  user: Usuario = {
    image:''
  };

  imageProfile:String;
  constructor(private usuarioService: UsuarioService,
  private uiService: UiServiceService,
  private postsService: PostsService,
  private camera: Camera,
  ) { }

  ngOnInit() {
    this.user = this.usuarioService.getUsuario();
    this.imageProfile=this.usuarioService.getURL(this.user._id,this.user.image);

    console.log(this.user);
    
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }
   const actulizado= await this.usuarioService.actualizarUsuario(this.user);

    if (actulizado) {
      this.uiService.presentToast('Registro Actalizado!');
    } else {
      this.uiService.presentToast('No se pudo actualizar');

    }
  }
  logout() {
    this.postsService.paginaPosts=0;
    this.usuarioService.logout();

   }

   libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

   this.procesarImagen(options);
  }

  async procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //const img = window.Ionic.WebView.convertFileSrc(imageData);
      const resp=this.usuarioService.subirImagen(imageData);
      if(resp){
        this.uiService.presentToast('Actualizanndo Foto de perfil');
        this.user.image=this.usuarioService.img;
        console.log('new: ',this.user.image);       
        this.usuarioService.actualizarUsuario(this.user);

      }else{
        this.uiService.presentToast('Error al acualizar Foto de perfil');

      }
    

       
     }, (err) => {
      // Handle error
      console.log(err);

     });
  }


}
