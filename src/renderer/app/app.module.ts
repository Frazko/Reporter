import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgxElectronModule } from "ngx-electron";
import { EmailFormComponent } from './email-form/email-form.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
} from '@angular/material/';

@NgModule({
  declarations: [
    AppComponent,
    EmailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
