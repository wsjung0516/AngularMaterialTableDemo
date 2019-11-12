import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule, MatDialogModule
} from '@angular/material';
import { MainComponentComponent } from './main-component/main-component.component';
import { TableMaterialComponent } from './table-material/table-material.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDlgComponent} from './confirm-dlg/confirm-dlg.component';
import { PatientListDlgComponent } from './patient-list-dlg/patient-list-dlg.component';
import {ConsultListDlgComponent} from './consult-list-dlg/consult-list-dlg.component';
import {HelpMessageComponent} from './components/help-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    MainComponentComponent,
    TableMaterialComponent,
    ConfirmDlgComponent,
    PatientListDlgComponent,
    ConsultListDlgComponent,
    HelpMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PatientListDlgComponent, ConsultListDlgComponent, HelpMessageComponent]
})
export class AppModule { }
