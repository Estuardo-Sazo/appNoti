import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/interfaces/interfaces';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  reports: Report[] = [];
  habilitado = true;
  constructor(
              private reportsService: ReportsService,
              private router: Router
  ) { }

  ngOnInit() {
    this.siguientes();
    this.reportsService.newReport.subscribe(report=>{
      this.reports.unshift(report);
    })

  }

  addReport() {
    this.router.navigate(['/newreport/']);
  }

  recargar(event) {
    this.siguientes(event, true);
    this.habilitado = true;
    this.reports = [];
  }

  siguientes(event?, pull: boolean = false) {
    this.reportsService.getReports().subscribe((resp) => {
      console.log(resp);
      this.reports.push(...resp.reports);

      if (event) {
        event.target.complete();
        console.log(this.reports);
        
        if (resp.reports.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }
}
