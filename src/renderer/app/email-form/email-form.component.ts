import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Report } from '../../../common/types'

@Component({
  selector: 'email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})

export class EmailFormComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();
  @Input() public reporterName: string;
  @Input() public reporterEmail: string;
  @Input() public receiverName: string;
  @Input() public receiverEmail: string;

  public subject: string = "";
  public description: string = "";
  public reportStatusArea: string = "";
  public abc: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g',]

  public status: Array<object> = [];
  public report: Report = new Report();


  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // feo feo feo
    this.initReport();
    //
  }

  initReport() {
    this.report = new Report(this.formatDate(new Date()), this.buildUserData(), this.buildStatus());
  }

  addStatus() {
    this.initReport();
    this.buildStatus()
    this.buildReport();

    const userData = this.buildUserData();
    // Save localStorage
    this.childEvent.emit({key:'userData', data:userData});
    this.description = '';
  }

  sendData() {
    /*
    if ( this.repEmail.hasError('required') || this.emailFrom.hasError('required')){
      this.openSnackBar("Please enter valid emails.");
      return;
    }
    */
    this.initReport();
    this.postData();
  }


  postData() {
    /* **** Body message
      NameFrom
      EmailFrom

      EmailTo
      Subject
      Message
    */
    console.log("POSTING DATA");
    const payload = {
      "nameFrom": this.report.userData.reporterName,
      "emailFrom": this.report.userData.reporterEmail,
      "emailTo": this.report.userData.receiverEmail,
      "nameTo": this.report.userData.receiverName,
      "subject": 'Reporte Semanal - ' + this.formatDate(new Date()),
      "date": this.formatDate(new Date()),
      "report": this.htmlStatusTemplate(this.report)
    };
    console.log('TCL: EmailFormComponent -> postData -> payload', payload);


    this.http.post("https://rocky-brook-22398.herokuapp.com/send", payload)
    //this.http.post("http://localhost:5000/send", payload) // bajar https://github.com/Frazko/node-email-server
      .subscribe(
        res => {
          console.log("POST Request is successful ", res);
          this.openSnackBar("Report Sent Successfully");
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
          this.openSnackBar("Report NOT Sent, [Error: "+err.error.error+"]");
        }
      );
  }

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }


  ///  ------------------------------------------------------------- Formatters

  buildStatus() {
    if (this.status && this.status.hasOwnProperty(this.subject)) {
      const tempList = this.status[this.subject];
      const isInDescription = tempList.includes(this.description);
      if (!isInDescription && this.description) {
        tempList.push(this.description);
      }
    } else {
      if (!this.status[this.subject] && this.description) {
        this.status[this.subject] = [this.description];
      } else if (this.description) {
        this.status[this.subject].push(this.description);
      }
    }
    return this.status;
  }


  buildReport() {
    const date = this.formatDate(new Date());
    this.reportStatusArea = `Report - ${date}
${this.reporterName}

${this.formatStatus()}
    `;
  }

  capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }


  htmlStatusTemplate(data) {
    const status = data.status;
    let formatted: string = `<h1 style="font-family: 'Montserrat', sans-serif; margin-bottom: 0;">Reporte Semanal</h1> <h5 style="font-family: 'Montserrat', sans-serif; margin-top: 0;"> ${data.userData.reporterName} - ${this.formatDate(new Date())}</h5>`;
    for (let i = 0; i < Object.keys(status).length; i++) {
      formatted = formatted.concat(`<h2 style="margin-bottom: 0; margin-top: 30px;">${i + 1} - ${this.capitalize(Object.keys(status)[i])}  </h2>`);
      formatted = formatted.concat(`<ul style='list-style: none; margin-top: 0;'>`);
      const descriptions = (Object.values(status)[i] as Array<string>).map((item, index) => `<li><b>   ${this.abc[index]}</b> - ${this.capitalize(item)} </li>`);
      for (let j = 0; j < descriptions.length; j++) {
        formatted = formatted.concat(descriptions[j]);
      }
      formatted = formatted.concat(`</ul>`);
    }
    return formatted;
  }

  buildUserData() {
    return {
      reporterName: this.reporterName,
      reporterEmail: this.reporterEmail,
      receiverName: this.receiverName,
      receiverEmail: this.receiverEmail,
    }
  }

  formatStatus() {
    const status = this.report.status;
    let formatted: string = '';
    for (let i = 0; i < Object.keys(status).length; i++) {
      formatted = formatted.concat(`${i + 1} - ${this.capitalize(Object.keys(status)[i])}  \n`);
      const descriptions = Object.values(status)[i].map((item, index) => `   ${this.abc[index]} - ${this.capitalize(item)} \n`);
      for (let j = 0; j < descriptions.length; j++) {
        formatted = formatted.concat(descriptions[j]);
      }
      formatted = formatted.concat('\n');
    }
    return formatted;
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex] + ' ' + day + ' ' + year;
  }
}
