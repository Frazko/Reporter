import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { StoreService } from '../services/store.service';
import { EmailFormComponent } from './email-form/email-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public userData: object;

  constructor(private _electronService: ElectronService, private persister: StoreService) { }

  ngOnInit() {
    console.log("--loading userData");
    const userData = this.loadData("userData");
    if (userData) {
      this.userData = userData;
      console.log("si userData", this.userData);
    }
  }

  onSave(data) {
    console.log("onSave", data);
    this.saveData(data);
    //this.loadData(event.key);
  }

  saveData(data) {
    console.log("saving data:: ",data);
    this.persister.set(data.key, data.data);
  }

  loadData(key) {
    const data = this.persister.get(key);
    console.log("loaded data:: ", data);
    return data;
  }
}
