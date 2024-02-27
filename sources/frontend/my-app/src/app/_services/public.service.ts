import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { PageableService } from './pageable.service';
import { PageableDto } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PublicService extends PageableService {

  constructor(
    private restService: RestService
  ) {
    super();

    // setup new defaults for the pageable
    this.pageable.size = 9;
    this.pageable.sort = { field: 'modifiedAt', order: PageableDto.DESC };
  }

  loadPublicNotes(pageable: PageableDto) {
    return this.restService.loadPublicNotes(pageable);
  }

  getPublicNote(id: number) {
    return this.restService.getPublicNote(id);
  }
}
