import { Injectable } from '@angular/core';
import { PageableDto } from '../_models';
import { RestService } from './rest.service';
import { PageableService } from './pageable.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends PageableService {
  constructor(
    private restService: RestService
  ) { super(); }

  listNotes(pageable: PageableDto) {
    return this.restService.listNotes(pageable);
  }

  search(pageable: PageableDto) {
    return this.restService.searchNotes(pageable);
  }

  getNote(id: number) {
    return this.restService.getNote(id);
  }

  modifyNote(id: number, caption: string, body: string, state: string, category: string) {
    return this.restService.modifyNote(id, caption, body, state, category);
  }

  deleteNote(id: number) {
    return this.restService.deleteNote(id);
  }

  createNote(caption: string, body: string, state: string, category: string) {
    return this.restService.createNote(caption, body, state, category);
  }
}
