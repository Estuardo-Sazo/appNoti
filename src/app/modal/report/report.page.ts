import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report, Usuario } from 'src/app/interfaces/interfaces';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
const URL = environment.url;
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  user:Usuario={};
  report:Report={
    imgs:[],
    user:this.user,
    type:{}
  };
  imgsR:String[]=[];
  reportId;
  slideSoloOpts={
    allowSlideNext:false,
    allowSlidePrev:false
  }
  url:string=URL;
  constructor( private reportsService: ReportsService,
    private router: ActivatedRoute,) {

    this.reportId = this.router.snapshot.paramMap.get('idReport');
    
  }
  async ngOnInit() {
    
    try{
      this.reportsService.getReport(this.reportId).subscribe((data)=>{      
      this.report=data.report[0];
      this.user=this.report.user;
      this.imgsR.push(...this.report.imgs);
      console.log(this.report);
      console.log(this.imgsR);


    });
    }catch(error){
      console.log(error)
    }
  }
 
}
