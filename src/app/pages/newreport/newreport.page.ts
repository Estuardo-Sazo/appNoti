import { Component, OnInit } from '@angular/core';
import { TypeReportService } from 'src/app/services/type-report.service';
import { TypeReport } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ReportsService } from 'src/app/services/reports.service';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';

declare let window: any;


@Component({
  selector: 'app-newreport',
  templateUrl: './newreport.page.html',
  styleUrls: ['./newreport.page.scss'],
})
export class NewreportPage implements OnInit {

  tempImages: string[] = [];
  typeReports: TypeReport[]= [];
  cargandoGeo=false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  report = {
    message: '',
    coords: null,
    type:'',
    posicion: false
  };

  constructor(
            private reportsService: ReportsService,
            private typeReportService:TypeReportService,
            private geolocation: Geolocation,
            private camera: Camera,
            private router: Router,
            private navCtrl:NavController,
            private  uiService:UiServiceService

  ) { }

  ngOnInit() {
    this.typeReport();
  }

  typeReport(){
    this.typeReportService.getTypeReport().subscribe((resp) => {
      this.typeReports.push(...resp.typeReports);
      console.log(this.typeReports);   

    });
  }

  getGeo(){
    if(!this.report.posicion){
      this.report.coords=null;
      return;
    }

    this.cargandoGeo=true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo=false;
      const coords=`${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.report.coords=coords;
     }).catch((error) => {
       console.log('Error getting location', error);
      this.cargandoGeo=false;

     });
  }

  async createReport() {
    const creado=await this.reportsService.createReport(this.report);
    
    if(creado){
      this.report = {
        message: '',
        coords: null,
        type:'',
        posicion: false
      };
  
      this.tempImages=[];
      //Navegar al tab 
        this.navCtrl.navigateRoot('/main/tabs/tab4',{animated:true});
    }else{
      //mostrar alerta de usuario incorrecto
      this.uiService.alertaInfo("Verifica todos los campos.")
      
    }
  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.procesarImagen(options);

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

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);

      this.reportsService.subirImagen(imageData);
       console.log(img);
       this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  

}
