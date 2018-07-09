import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as papa from 'papaparse';
import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(public navCtrl: NavController, private http: Http) {
    this.readCsvData();
  }

  private readCsvData() {
    this.http.get('assets/dummyData.csv')
      .subscribe(
        data => {console.log(data);this.extractData(data);},
        err => this.handleError(err)
      )
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parseData = papa.parse(csvData).data;

    this.headerRow = parseData[0];

    parseData.splice(0,1);
    this.csvData = parseData;
  }

  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });

    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  handleError(err) {

  }
}
