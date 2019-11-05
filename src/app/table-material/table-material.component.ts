import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';
import {TableMaterialDataSource, TableMaterialItem} from './table-material-datasource';
import {BehaviorSubject, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {untilDestroyed} from 'ngx-take-until-destroy';

// TODO: replace this with real data from your application
export const EXAMPLE_DATA: TableMaterialItem[] = [
  {id: 40, name: 'Calcium',status:'completed'},
  {id: 39, name: 'Potassium',status:'completed'},
  {id: 38, name: 'Argon',status:'completed'},
  {id: 37, name: 'Chlorine',status:'completed'},
  {id: 36, name: 'Sulfur',status:'completed'},
  {id: 35, name: 'Phosphorus',status:'completed'},
  {id: 34, name: 'Silicon',status:'completed'},
  {id: 33, name: 'Aluminum',status:'completed'},
  {id: 32, name: 'Magnesium',status:'completed'},
  {id: 31, name: 'Sodium',status:'completed'},
  {id: 20, name: 'Neon',status:'completed'},
  {id: 29, name: 'Fluorine',status:'completed'},
  {id: 28, name: 'Oxygen',status:'completed'},
  {id: 27, name: 'Nitrogen',status:'completed'},
  {id: 26, name: 'Carbon',status:'completed'},
  {id: 25, name: 'Boron',status:'completed'},
  {id: 24, name: 'Beryllium',status:'completed'},
  {id: 23, name: 'Lithium',status:'completed'},
  {id: 22, name: 'Helium',status:'rejected'},
  {id: 21, name: 'Hydrogen',status:'completed'},
  {id: 20, name: 'Calcium',status:'completed'},
  {id: 19, name: 'Potassium',status:'completed'},
  {id: 18, name: 'Argon',status:'completed'},
  {id: 17, name: 'Chlorine',status:'completed'},
  {id: 16, name: 'Sulfur',status:'completed'},
  {id: 15, name: 'Phosphorus',status:'completed'},
  {id: 14, name: 'Silicon',status:'completed'},
  {id: 13, name: 'Aluminum',status:'completed'},
  {id: 12, name: 'Magnesium',status:'completed'},
  {id: 11, name: 'Sodium',status:'completed'},
  {id: 10, name: 'Neon',status:'completed'},
  {id: 9, name: 'Fluorine',status:'completed'},
  {id: 8, name: 'Oxygen',status:'completed'},
  {id: 7, name: 'Nitrogen',status:'completed'},
  {id: 6, name: 'Carbon',status:'completed'},
  {id: 5, name: 'Boron',status:'completed'},
  {id: 4, name: 'Beryllium',status:'completed'},
  {id: 3, name: 'Lithium',status:'completed'},
  {id: 2, name: 'Helium',status:'rejected'},
  {id: 1, name: 'Hydrogen',status:'completed'},
];

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css'],
  animations: [
    trigger( 'state', [
      transition('void => Processing',
        animate( '525ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({minHeight: '0px', overflow: 'hidden', height: '0px'}),
          style( {minHeight: '*', overflow: 'inherit', height: '*'})
        ])))
    ])
  ]
})
export class TableMaterialComponent implements OnInit, OnDestroy {
  // pageChanges = new BehaviorSubject<PageEvent>({pageIndex: 0, pageSize: 100});
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableMaterialDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'status'];

  ngOnInit() {
    const tdata = [...EXAMPLE_DATA];
    const timer1 = timer(0, 3000);
    timer1.pipe(
       map( val => tdata.slice(30-val, 30+10-val)),
      untilDestroyed(this)

    ).subscribe( dat => this.dataSource = new TableMaterialDataSource( dat, this.paginator, this.sort) )
    ;
  }
  ngOnDestroy(): void {
  }
}
