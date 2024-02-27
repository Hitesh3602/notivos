import { inject } from '@angular/core';
import { PageableDto } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

export interface IPageable {
  pageable: PageableDto;
  initPageableFromQuery(): void;
}

export abstract class PageableService implements IPageable {
  route: ActivatedRoute;
  router: Router;

  constructor() { 
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
  }

  pageRefresh: boolean = true;
  pageable: PageableDto = new PageableDto;

  initPageableFromQuery() {
    if (this.pageRefresh) {
      this.pageable.first = Number(this.route.snapshot.queryParams['first']) || this.pageable.first;
      this.pageable.size = Number(this.route.snapshot.queryParams['size']) || this.pageable.size;
      this.pageable.sort.field = this.route.snapshot.queryParams['s_field'] || this.pageable.sort.field;
      this.pageable.sort.order = Number(this.route.snapshot.queryParams['s_order']) || this.pageable.sort.order;
      this.pageable.query = this.route.snapshot.queryParams['q'] || this.pageable.query;
      this.pageRefresh = false;
    }
  }

  setPageable($event: LazyLoadEvent, thatRoute: ActivatedRoute) {
    this.pageable.first = $event.first!;
    this.pageable.size = $event.rows!;
    this.pageable.query = $event.globalFilter;

    if ($event.sortField) {
      this.pageable.sort = { field: $event.sortField, order: $event.sortOrder ?? PageableDto.ASC };
    }

    this.router.navigate(['.'], { relativeTo: thatRoute, queryParams: this.pageable.toQueryParams() });   
  }
}
