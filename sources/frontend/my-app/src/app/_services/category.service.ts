import { Injectable } from '@angular/core';
import { PageableDto } from '../_models';
import { RestService } from './rest.service';
import { PageableService } from './pageable.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends PageableService {

  constructor(
    private restService: RestService
  ) { super(); }

  listCategories(pageable: PageableDto) {
    return this.restService.listCategories(pageable);
  }

  search(pageable: PageableDto) {
    return this.restService.searchCategories(pageable);
  }

  getCategory(id: string) {
    return this.restService.getCategory(id);
  }

  modifyCategory(id: string, name: string) {
    return this.restService.modifyCategory(id, name);
  }

  deleteCategory(id: number) {
    return this.restService.deleteCategory(id);
  }

  createCategory(name: string) {
    return this.restService.createCategory(name);
  }

}
