import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableMaterialItem {
  name: string;
  id: number;
  status:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableMaterialItem[] = [
  {id: 1, name: 'Hydrogen',status:'completed'},
  {id: 2, name: 'Helium',status:'rejected'},
  {id: 3, name: 'Lithium',status:'completed'},
  {id: 4, name: 'Beryllium',status:'completed'},
  {id: 5, name: 'Boron',status:'completed'},
  {id: 6, name: 'Carbon',status:'completed'},
  {id: 7, name: 'Nitrogen',status:'completed'},
  {id: 8, name: 'Oxygen',status:'completed'},
  {id: 9, name: 'Fluorine',status:'completed'},
  {id: 10, name: 'Neon',status:'completed'},
  {id: 11, name: 'Sodium',status:'completed'},
  {id: 12, name: 'Magnesium',status:'completed'},
  {id: 13, name: 'Aluminum',status:'completed'},
  {id: 14, name: 'Silicon',status:'completed'},
  {id: 15, name: 'Phosphorus',status:'completed'},
  {id: 16, name: 'Sulfur',status:'completed'},
  {id: 17, name: 'Chlorine',status:'completed'},
  {id: 18, name: 'Argon',status:'completed'},
  {id: 19, name: 'Potassium',status:'completed'},
  {id: 20, name: 'Calcium',status:'completed'},
];

/**
 * Data source for the TableMaterial view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableMaterialDataSource extends DataSource<TableMaterialItem> {
  data: TableMaterialItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableMaterialItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableMaterialItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableMaterialItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'status':return compare(a.status,b.status,isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
