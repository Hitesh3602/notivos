import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteDto, SharedNoteDto } from 'src/app/_models';
import { PageableComponent } from '../pageable/pageable.component';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { ShareService } from 'src/app/_services/share.service';

@Component({
  selector: 'app-manage-shared-with-me',
  templateUrl: './manage-shared-with-me.component.html',
  styleUrls: ['./manage-shared-with-me.component.css']
})
export class ManageSharedWithMeComponent extends PageableComponent  {
  shares: NoteDto[] = [];
  loading: boolean = false;

  constructor(
    private shareService: ShareService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.service = shareService;
  }

  menuItems(share: SharedNoteDto): MenuItem[] {
    return [
      {
        label: "Edit",
        icon: PrimeIcons.PENCIL,
        command: () => {
          this.router.navigate(['/edit-shared-note', share.id]);
        },
        disabled: share.access === 'RO'
      }
    ];
  }

  onLazyLoad($event: LazyLoadEvent) {
    this.shareService.setPageable($event, this.route);
    if($event.globalFilter) {
      this.shareService.search(this.shareService.pageable).subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.shares = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      })
    } else {
      this.loadShares();
    }
  }

  loadShares() {
    setTimeout(() => this.loading = true, 0);
    this.shareService.listShares(this.shareService.pageable)
      .subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.shares = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }
}
