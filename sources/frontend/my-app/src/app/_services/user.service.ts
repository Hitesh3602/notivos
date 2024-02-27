import { Injectable } from '@angular/core';
import { FnRestCallback, RestService } from './rest.service';
import { PageableDto } from '../_models';
import { PageableService } from './pageable.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends PageableService {

  constructor(
    private restService: RestService
  ) { super(); }

  listUsers(pageable: PageableDto) {
    return this.restService.listUsers(pageable);
  }

  listUsersDetailed(pageable: PageableDto) {
    return this.restService.listUsersDetailed(pageable);
  }

  searchUsers(pageable: PageableDto) {
    return this.restService.searchUsers(pageable);
  }

  getUser(id: string, fn: FnRestCallback) {
    return this.restService.getUser(id).subscribe(result => {
      fn(result);
    });
  }

  modifyUser(id: string, fullName: string, email: string, locked: boolean, roles: string[]) {
    return this.restService.modifyUser(id, fullName, email, locked, roles);
  }

  deleteUser(id: Number) {
    return this.restService.deleteUser(id);
  }

  createUser(fullName: string, email: string, locked: boolean, password: string, roles: string[]) {
    return this.restService.createUser(fullName, email, locked, password, roles);
  }
}
