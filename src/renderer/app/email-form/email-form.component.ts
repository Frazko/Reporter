import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


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
  public report: string = "";
  public abc:Array<string> = ['a','b','c','d','e','f','g',]

  public status: object = {};

  constructor() {
  }

  ngOnInit() {
  }

  sendData() {
    const emails = {
      key: "userData", data: {
        reporterName: this.reporterName,
        reporterEmail: this.reporterEmail,
        receiverName: this.receiverName,
        receiverEmail: this.receiverEmail,
      }
    }
    console.log("emails::: ", emails);
    this.childEvent.emit(emails);
  }
  buildData() {
    debugger
    if (this.status.hasOwnProperty(this.subject)) {
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
    console.log('Status', this.status);
    this.description = '';

    this.buildReport();
  }

  buildReport() {
    const date = this.formatDate(new Date());
    this.report = `Report - ${date}
${this.reporterName}

${this.formatStatus()}

    `;
  }

  formatStatus() {
    console.log('formatStatus');
    let formatted:string = '';
    for (let i = 0; i < Object.keys(this.status).length; i++) {
      formatted = formatted.concat(`${i+1} - ${this.capitalize(Object.keys(this.status)[i])}  \n`);
      const descriptions = Object.values(this.status)[i].map((item, index) => `   ${this.abc[index]} - ${this.capitalize(item)} \n` );
      for (let j = 0; j < descriptions.length; j++) {
        formatted = formatted.concat(descriptions[j]);
      }

      formatted = formatted.concat('\n');
    }
    return formatted;
  }

  capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
    return monthNames[monthIndex] + ' ' +  day +  ' ' + year;
  }



}
