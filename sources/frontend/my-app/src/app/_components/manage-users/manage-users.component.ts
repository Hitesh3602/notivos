import { Component } from '@angular/core';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { UserDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { AppDialogService } from 'src/app/_services/dialog.service';
import { UserService } from 'src/app/_services/user.service';
import { PageableComponent } from '../pageable/pageable.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent extends PageableComponent {
  users: UserDto[] = [];
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private appDialogService: AppDialogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    super();
    this.service = userService;
  }

  menuItems(user: UserDto): MenuItem[] {
    return [
      {
        label: "Edit",
        icon: PrimeIcons.USER_EDIT,
        command: () => {
          this.router.navigate(['/edit-user', user.id]);
        }
      },
      {
        label: "Delete",
        icon: PrimeIcons.TRASH,
        command: () => {
          this.deleteUser(Number(user.id!), user.email);
        }
      }
    ];
  }

  onLazyLoad($event: LazyLoadEvent) {
    this.userService.setPageable($event, this.route);
    if($event.globalFilter) {
      setTimeout(() => this.loading = true, 0);
      this.userService.searchUsers(this.userService.pageable).subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.users = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      })
    }
    else {
      this.loadUsers();
    }
  }

  loadUsers() {
    setTimeout(() => this.loading = true, 0);
    this.userService.listUsersDetailed(this.userService.pageable)
      .subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.users = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }

  deleteUser(id: number | undefined, user: string | undefined) {
    if (id) {
      this.appDialogService.confirm(`Are you sure to delete user <strong>${user}</strong>`, () => {
        setTimeout(() => this.loading = true, 0);
        this.userService.deleteUser(id!).subscribe({
          next: () => {
            setTimeout(() => this.loading = false, 0);
            this.toastService.success(`User "${user}" deleted`);
            this.loadUsers();
          },
          error: () => {
            setTimeout(() => this.loading = false, 0);
          }
        });
      });
    }
  }
}
