import { Component, OnInit } from '@angular/core';
import { TypeReport } from 'src/app/interfaces/interfaces';
import { TypeReportService } from 'src/app/services/type-report.service';

@Component({
  selector: 'app-type-reports',
  templateUrl: './type-reports.page.html',
  styleUrls: ['./type-reports.page.scss'],
})
export class TypeReportsPage implements OnInit {
  typesReport: TypeReport[] = [];
  constructor(private typeReportService: TypeReportService) { }

  ngOnInit() {
    this.typeReportService.getTypeReport().subscribe((resp) => {
      console.log(resp);
      this.typesReport.push(...resp.typeReports);
    });
  }

}
