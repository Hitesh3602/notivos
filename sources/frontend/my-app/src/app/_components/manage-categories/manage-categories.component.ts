import { Component } from '@angular/core';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { CategoryDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { CategoryService } from 'src/app/_services/category.service';
import { AppDialogService } from 'src/app/_services/dialog.service';
import { PageableComponent } from '../pageable/pageable.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent extends PageableComponent {
  categories: CategoryDto[] = [];
  loading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private appDialogService: AppDialogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    super();
    this.service = categoryService;
  }

  menuItems(category: CategoryDto): MenuItem[] {
    return [
      {
        label: "Edit",
        icon: PrimeIcons.PENCIL,
        command: () => {
          this.router.navigate(['/edit-category', category.id]);
        }
      },
      {
        label: "Delete",
        icon: PrimeIcons.TRASH,
        command: () => {
          this.deleteCategory(Number(category.id!), category.name!);
        }
      }
    ];
  }

  onLazyLoad($event: LazyLoadEvent) {
    this.categoryService.setPageable($event, this.route);
    if($event.globalFilter) {
      this.categoryService.search(this.categoryService.pageable).subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.categories = result.content;
          this.totalRecords = result.totalElements;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      })
    } else {
      this.loadCategories();
    }
  }

  loadCategories() {
    setTimeout(() => this.loading = true, 0);
    this.categoryService.listCategories(this.categoryService.pageable)
      .subscribe({
        next: result => {
          setTimeout(() => this.loading = false, 0);
          this.totalRecords = result.totalElements;
          this.categories = result.content;
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }

  deleteCategory(id: number, name: string) {
    if (id) {
      this.appDialogService.confirm(`Are you sure to delete category <strong>${name}</strong>`, () => {
        setTimeout(() => this.loading = true, 0);
        this.categoryService.deleteCategory(id!).subscribe({
          next: () => {
            setTimeout(() => this.loading = false, 0);
            this.toastService.success(`Category "${name}" deleted`);
            this.loadCategories();
          },
          error: () => {
            setTimeout(() => this.loading = false, 0);
          }
        });
      });
    }
  }
}
