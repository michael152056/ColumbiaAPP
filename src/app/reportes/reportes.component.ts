import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt } from "pdfmake-wrapper";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatePDF(){
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('Chinga tu masdasd').bold().italics().end
    );

    pdf.create().open();
  }

}
