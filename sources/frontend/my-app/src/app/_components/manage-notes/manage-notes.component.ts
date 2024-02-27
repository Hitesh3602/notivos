import { Component, OnDestroy } from '@angular/core';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { NoteDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { AppDialogService } from 'src/app/_services/dialog.service';
import { NoteService } from 'src/app/_services/note.service';
import { PageableComponent } from '../pageable/pageable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedUsersDialogComponent } from './shared-users-dialog/shared-users-dialog.component';

@Component({
  selector: 'app-manage-notes',
  templateUrl: './manage-notes.component.html',
  styleUrls: ['./manage-notes.component.css'],
  providers: [DialogService]
})
export class ManageNotesComponent extends PageableComponent implements OnDestroy {
  notes: NoteDto[] = [];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private noteService: NoteService,
    private appDialogService: AppDialogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.service = noteService;
  }

  menuItems(note: NoteDto): MenuItem[] {
    return [
      {
        label: "Edit",
        icon: PrimeIcons.PENCIL,
        command: () => {
          this.router.navigate(['/edit-note', note.id]);
        }
      },
      {
        label: "Share",
        icon: PrimeIcons.SHARE_ALT,
        command: () => {
          this.updateSharedUsers(note);
        }
      },
      {
        separator: true
      },
      {
        label: "Delete",
        icon: PrimeIcons.TRASH,
        command: () => {
          this.deleteNote(Number(note.id!), note.caption!);
        }
      }
    ];
  }

  onLazyLoad($event: LazyLoadEvent) {
    this.noteService.setPageable($event, this.route);
    if($event.globalFilter) {
      this.noteService.search(this.noteService.pageable).subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.notes = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      })
    } else {
      this.loadNotes();
    }
  }

  loadNotes() {
    setTimeout(() => this.loading = true, 0);
    this.noteService.listNotes(this.noteService.pageable)
      .subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.notes = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }

  deleteNote(id: number, caption: string) {
    if (id) {
      this.appDialogService.confirm(`Are you sure to delete note <strong>${caption}</strong>`, () => {
        setTimeout(() => this.loading = true, 0);
        this.noteService.deleteNote(id!).subscribe({
          next: () => {
            setTimeout(() => this.loading = false, 0);
            this.toastService.success(`Note "${caption}" deleted`);
            this.loadNotes();
          },
          error: () => {
            setTimeout(() => this.loading = false, 0);
          }
        });
      });
    }
  }

  updateSharedUsers(note: NoteDto) {
    if (note) {
      this.ref = this.dialogService.open(SharedUsersDialogComponent, {
        header: `Share note: "${note.caption}"`,
        closeOnEscape: true,
        closable: false,
        // passing ref here is a workaround for the close bug in v15.x.x
        data: { ref: () => this.ref, note: note }
      });
      this.ref.onClose.subscribe((values: string) => {
        this.loadNotes();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
