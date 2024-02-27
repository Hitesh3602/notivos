import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  isAddMode: boolean = false;
  id: string | undefined;
  loading = false;

  editForm = this.formBuilder.group({
    'name': ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.categoryService.getCategory(this.id!).subscribe({
        next: result => {
          var p = <CategoryDto>result;
          this.editForm.controls.name.setValue(p.name!);
        }
      })
    } else {
      this.editForm.controls.name.setValue('Category 1');
    }
  }

  onSubmit() {
    this.loading = true;
    const name = this.editForm.get('name')?.value;

    if (this.isAddMode) {
      this.categoryService.createCategory(name!)
        .subscribe({
          next: () => {
            this.toastService.success(`Category ${name} created`);
            this.router.navigate(['/manage-categories']);
          },
          error: _error => {
            this.loading = false;
          }
        });
    } else {
      this.categoryService.modifyCategory(this.id!, name!)
        .subscribe({
          next: () => {
            this.toastService.success(`Category ${name} updated`);
            this.router.navigate(['/manage-categories']);
          },
          error: _error => {
            this.loading = false;
          }
        });
    }
  }
}

