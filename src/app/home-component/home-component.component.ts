import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {PatientListDlgComponent} from '../patient-list-dlg/patient-list-dlg.component';
import {ConsultListDlgComponent} from '../consult-list-dlg/consult-list-dlg.component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog) {}
  dispPatientDlg() {
    // this.dialog.open(PatientListDlgComponent, {
    this.dialog.open(ConsultListDlgComponent, {
      height: ' 700px',
      width: '1230px'
    })
  }
}
