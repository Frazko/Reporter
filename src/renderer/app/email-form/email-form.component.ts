import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();

  @Input() public reporterName:string;
  @Input() public reporterEmail:string;
  @Input() public receiverName:string;
  @Input() public receiverEmail:string;

  constructor() {
  }

  sendData() {
    const emails = {key: "userData", data:{
      reporterName: this.reporterName,
      reporterEmail: this.reporterEmail,
      receiverName: this.receiverName,
      receiverEmail: this.receiverEmail,
    }}
    console.log("emails::: ", emails);
    this.childEvent.emit(emails);
  }

  ngOnInit() {
  }

}
