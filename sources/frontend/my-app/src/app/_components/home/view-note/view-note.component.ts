import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteDto } from 'src/app/_models';
import { PublicService } from 'src/app/_services/public.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {
  note?: NoteDto | null = null;
  id?: number | null = null;

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.publicService.getPublicNote(this.id!).subscribe({
      next: result => {
        this.note = <NoteDto>result;
      }
    })
  }
}
