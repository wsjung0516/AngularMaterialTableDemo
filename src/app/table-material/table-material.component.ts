import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fadeInContent, fadeInItems, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {TableMaterialDataSource, TableMaterialItem} from './table-material-datasource';
import {BehaviorSubject, fromEvent, interval, merge, never, Observable, of, range, Subject, timer} from 'rxjs';
import {
  concatMap,
  delay,
  delayWhen,
  map,
  mapTo,
  repeat,
  repeatWhen,
  sampleTime,
  scan,
  switchMap,
  switchMapTo, take,
  takeUntil,
  tap, timeInterval
} from 'rxjs/operators';
import {animate, keyframes, sequence, state, style, transition, trigger} from '@angular/animations';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DataService} from '../services/data.service';
import {IPhoto} from '../models/issue';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '@angular/cdk/collections';
import {tableAnimation} from '../components/tableAnimation';
import {HelpMessageComponent} from '../components/help-message.component';
import {HelpMessageService, Message} from '../components/helpMessage';


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
      transition('void => *',
        animate( '525ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
          style({minHeight: '0px', overflow: 'hidden', height: '0px'}),
          style( {minHeight: '*', overflow: 'inherit', height: '*'}),

        ])))
    ])
  ]
})
export class TableMaterialComponent implements OnInit, OnDestroy {
  // pageChanges = new BehaviorSubject<PageEvent>({pageIndex: 0, pageSize: 100});
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: PhotoDataSource;
  tDataSource: any[] = [];
  mouseEnter$ = new Subject<any>();
  mouseLeave$ = new Subject<any>();
  photoData$ = new Subject<IPhoto[]>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['albumId', 'id', 'title', 'url', 'thumbnailUrl'];
  photoDatabase: DataService | null;
  pauser$ = new Subject();
  tval: number = 0;
  kval: number = 0;
  isHelpMessage = true;
  constructor( private http: HttpClient,
               private dataService: DataService,
               private helpService: HelpMessageService) {}
  ngOnInit() {
    /**/
    this.loadData();
    /** To send to DOM, make DataSource data format*/
    this.photoData$.pipe().subscribe( photos => {
      this.dataSource = new PhotoDataSource(photos, this.paginator, this.sort);
    });

    this.mouseEnter$.pipe(
      switchMap(() => interval(200 /* ms */)),
      takeUntil(this.mouseLeave$),
      repeat(),
      untilDestroyed(this),
      mapTo(true));
  }

  tdata: IPhoto[] = new Array<IPhoto>(10);
  /**  Animation Module */
  private tableAnimation(photos: IPhoto[]) {
    let iPhotos : IPhoto[] = [];
    this.tdata = photos.reverse();
    const pageLength = 30;
    const pageSize = 10;

    this.pauser$.pipe(
      switchMap(paused => {
        if (paused) {
          this.tval = this.kval + 1;
          return never();
        } else {
          return this.source();
        }
      }),
      untilDestroyed(this)
    )
      .subscribe(x => {
        // console.log('table Animation-->', photos, tdata);
        if( x >= pageLength ) {
          this.tval = 0;
          x = 0;
        }
        this.kval = x;
        iPhotos = this.tdata.slice( pageLength -  x, pageLength + pageSize - x);
        /** Finished extracting and rearrange and try to send to DOM*/
        this.photoData$.next(iPhotos);
        //
        console.log('xxxxx--tval, kval -->>',  x, this.tval, this.kval )
      });
  }

  private source(): Observable<any> {
    return new Observable(observer => {
      timer(0, 1000).pipe(
        map((val) => observer.next(  this.tval + val)))
        .subscribe();
    });
  }
  public loadData() {
    this.photoDatabase = new DataService(this.http, 0);
    // this.dataSource = new PhotoDataSource(this.photoDatabase, this.paginator, this.sort);
    this.photoDatabase.getAllPhotos();
    this.photoDatabase.dataChange.pipe(
    ).subscribe((photos) => {
      this.tableAnimation(photos);
      this.pauser$.next(false);  /** Just after sending parameter, need to activate switchMap to processing data*/

      // this.dataSource = new PhotoDataSource(photos, this.paginator, this.sort);
      // console.log('loadData thisDataSource-->',this.dataSource)
    })


  }
  onMouseEnter() {
    console.log('maouse enter');
    this.mouseEnter$.next();
    this.pauser$.next(true);
  }
  onMouseLeave() {
    console.log('maouse leave');
    this.mouseLeave$.next();
    this.pauser$.next(false);
  }

  ngOnDestroy(): void {
  }
  pageEvent(pageEvent: PageEvent) {
    // console.log('pageEvent --> ',pageEvent); // Look at the props
    //Call the web service passing params.
    let tdata: PhotoDataSource;
    let take = pageEvent.pageSize;
    let skip = pageEvent.pageSize * pageEvent.pageIndex;
    this.photoDatabase = new DataService(this.http, pageEvent.pageIndex + 1);
    this.photoDatabase.getAllPhotos();
    this.photoDatabase.dataChange.subscribe((photos) => {
      this.tableAnimation(photos);
      this.paginator.pageIndex = pageEvent.pageIndex;
      // console.log('thisDataSource-->',photos)

    })


  }
  message: Message = new Message('Hello world');

  openHelpMessage(origin)  {
    if( this.isHelpMessage) {
      this.isHelpMessage = false;
      this.helpService.openHelpMessage(origin, this.message)

    } else {
      this.helpService.closeHelpMessage();
      this.isHelpMessage = true;
    }
  }

}
export class PhotoDataSource extends DataSource<IPhoto> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: IPhoto[] = [];
  renderedData: IPhoto[] = [];

  constructor(// public _photoDatabase: DataService,
              public _photoDatabase: IPhoto[],
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    // this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IPhoto[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      of(this._photoDatabase),
      // this._photoDatabase.dataChange,
      this._sort.sortChange,
      // this._filterChange,
      // this._paginator.page
    ];

    // this._photoDatabase.getAllPhotos();
    // console.log('this._exampleDatabase-->', this._exampleDatabase.dataChange.subscribe((value => console.log('value-->', value))))

    return merge(...displayDataChanges).pipe(
    // return merge(...displayDataChanges).pipe(
      tap(val => console.log('merge-->',val)),
      map( (photos) => {
          // Filter data
          this.filteredData = photos.slice().filter((photo: IPhoto) => {
          // this.filteredData = this._photoDatabase.slice().filter((photo: IPhoto) => {
          // this.filteredData = this._photoDatabase.data.slice().filter((photo: IPhoto) => {
            const searchStr = (photo.albumId + photo.id + photo.title + photo.url ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());

          // Grab the page's slice of the filtered sorted data.
          // const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          // this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          // return this.renderedData;
          // return this.filteredData;
           return sortedData;
        }
      ),
      // tap( val => console.log('val', val)),
      );
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: IPhoto[]): IPhoto[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'albumId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
