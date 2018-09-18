import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { StoreService } from '../services/store.service';
import { UserData } from '../../common/types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public userData: UserData;

  constructor(private _electronService: ElectronService, private persister: StoreService) { }

  ngOnInit() {
    console.log("--loading userData");
    this.userData = this.loadData("userData");
    if (!this.userData) {
      let userData: UserData = {} as UserData;
      userData.reporterName = '';
      userData.reporterEmail = '';
      userData.receiverName = '';
      userData.receiverEmail = '';
      this.userData = userData;
    }
  }

  onSave(data) {
    console.log("onSave", data);
    this.saveData(data);
    this.loadData(data.key);
  }

  saveData(data) {
    console.log('TCL: AppComponent -> saveData -> data', data);
    this.persister.set(data.key, data.data);
    //
  }

  loadData(key) {
    const data = this.persister.get(key);
    console.log('TCL: AppComponent -> loadData -> data', key, data);
    return data;
  }
}
