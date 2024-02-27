import { Injectable } from '@angular/core';
import { PageableService } from './pageable.service';
import { RestService } from './rest.service';
import { PageableDto } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ShareService extends PageableService  {

  constructor(
    private restService: RestService
  ) { super(); }

  listShares(pageable: PageableDto) {
    return this.restService.listShares(pageable);
  }

  getShare(id: number) {
    return this.restService.getShare(id);
  }

  modifySharedNote(id: number, body: string) {
    return this.restService.modifySharedNote(id, body);
  }

  search(pageable: PageableDto) {
    return this.restService.searchShared(pageable);
  }

  listSharedByMe(pageable: PageableDto) {
    return this.restService.listSharedByMe(pageable);
  }

  getSharedUsers(id: number, pageable: PageableDto) {
    return this.restService.getSharedUsers(id, pageable);
  }

  createShare(id: number, email: string, access: string) {
    return this.restService.createShare(id, email, access);
  }

  deleteShare(id: number) {
    return this.restService.deleteShare(id);
  }

  modifyShareAccess(id: number, access: string) {
    return this.restService.modifyShareAccess(id, access);
  }
}

