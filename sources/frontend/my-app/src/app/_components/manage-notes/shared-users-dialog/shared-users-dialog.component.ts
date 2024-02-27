import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageableDto, SharedNoteDto, SharedUserDto, UserDto } from 'src/app/_models';
import { ShareService } from 'src/app/_services/share.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-shared-users-dialog',
  templateUrl: './shared-users-dialog.component.html',
  styleUrls: ['./shared-users-dialog.component.css'],
  providers: [DynamicDialogRef]
})
export class SharedUsersDialogComponent implements OnInit, OnDestroy {
  shared: SharedUserDto[] = [];
  selectedUser: UserDto | undefined;
  suggestions: UserDto[] | undefined;
  loading: boolean = false;

  constructor(
    private shareService: ShareService,
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  menuItems(share: SharedUserDto): MenuItem[] {
    return [
      {
        label: "Read Only",
        icon: PrimeIcons.TIMES_CIRCLE,
        command: () => {
          this.setAccess(share.id, SharedNoteDto.RO);
        }
      },
      {
        label: "Read/Write",
        icon: PrimeIcons.PENCIL,
        command: () => {
          this.setAccess(share.id, SharedNoteDto.RW);
        }
      },
      {
        separator: true
      },
      {
        label: "Remove",
        icon: PrimeIcons.TRASH,
        command: () => {
          this.removeShare(share.id);
        }
      }
    ];
  }

  okButton() {
    this.config.data.ref().close();
  }

  search($event: any) {
    this.userService.searchUsers(new PageableDto({query: $event.query, size: 100, sort: { field: 'fullName', order: PageableDto.ASC } })).subscribe({
      next: result => {
        this.suggestions = (<UserDto[]>result.content);
      }
    });
  }

  setAccess(id: number, access: string) {
    if (!this.shared.find(p => p.id == id && p.access.toUpperCase() == access.toUpperCase())) {
      this.loading = true;
      this.shareService.modifyShareAccess(id, access).subscribe({
        next: () => {
          this.loadShares();
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
    }
  }

  addShare() {
    if (this.selectedUser) {
      this.loading = true;
      this.shareService.createShare(this.config.data.note.id, this.selectedUser?.email!, SharedNoteDto.RO).subscribe({
        next: () => {
          this.selectedUser = undefined;
          this.loadShares();
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
    }
  }

  removeShare(id: number) {
    if (id) {
      this.loading = true;
      this.shareService.deleteShare(id).subscribe({
        next: () => {
          this.loadShares();
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadShares();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  loadShares() {
    this.loading = true;
    this.shareService.getSharedUsers(this.config.data.note.id, new PageableDto({ size: 1000 })).subscribe({
      next: result => {
        this.shared = <SharedUserDto[]>result.content;
        setTimeout(() => this.loading = false, 0);
      },
      error: () => {
        setTimeout(() => this.loading = false, 0);
      }
    });
  }
}
