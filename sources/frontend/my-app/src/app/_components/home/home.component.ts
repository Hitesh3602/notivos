import { Component } from '@angular/core';
import { NoteDto } from 'src/app/_models';
import { PublicService } from 'src/app/_services/public.service';
import { PageableComponent } from '../pageable/pageable.component';
import { ActivatedRoute } from '@angular/router';
import { UserSubjectService } from 'src/app/_services/user-subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends PageableComponent {
  notes!: NoteDto[];

  constructor(
    private publicService: PublicService,
    private userSubject: UserSubjectService,
    private route: ActivatedRoute
  ) {
    super();
    this.service = this.publicService;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadPublicNotes();
    this.userSubject.userSubject.subscribe(() => {
      // Reload notes if user subject has changed (e.g.: user logged-in or logged-out)
      this.loadPublicNotes();
    });
  }

  onPageChange($event: any) {
    this.publicService.setPageable($event, this.route);
    this.loadPublicNotes();
  }

  loadPublicNotes() {
    this.publicService.loadPublicNotes(this.publicService.pageable).subscribe({
      next: result => {
        this.notes = result.content;
        this.totalRecords = result.totalElements;
      }
    });
  }

}
