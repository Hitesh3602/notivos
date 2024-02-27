import { Component, OnInit } from '@angular/core';
import { IPageable } from 'src/app/_services/pageable.service';

@Component({
  selector: 'app-pageable',
  templateUrl: './pageable.component.html',
  styleUrls: ['./pageable.component.css']
})
export class PageableComponent implements OnInit {

  totalRecords: number = 0;
  service!: IPageable;

  constructor() { }

  get sortField(): string {
    return this.service.pageable.sort.field;
  }

  get sortOrder(): number {
    return this.service.pageable.sort.order;
  }

  get pageFirst(): number {
    return this.service.pageable.first;
  }

  get pageSize(): number {
    return this.service.pageable.size;
  }

  ngOnInit(): void {
    this.service.initPageableFromQuery();
  }
}
